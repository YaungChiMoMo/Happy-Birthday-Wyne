/* ===================== Photobooth =====================
   Live camera + decorated pixel frames, drawn on one canvas.
   Photos never leave the device: they are only drawn and saved locally.
   Uses helpers from script.js: $, SPR, PAL, CONFIG, pad, toast, burst. */
(() => {
  const W = 900,
    H = 1125;
  const HOLE = { x: 56, y: 56, w: 788, h: 832 };
  const NAME = CONFIG.friendName.replace(/^dearest\s*/i, "") || "You";
  const AGE = Number(CONFIG.wishesOpen.slice(0, 4)) - CONFIG.bornYear;
  const COUNT_FROM = 3;
  const COUNT_MS = 800;
  const MAX_UPLOAD = 1600;
  const FONT_PIXEL = "'Pixelify Sans', monospace";
  const FONT_TINY = "Silkscreen, monospace";
  const FONT_HAND = "Caveat, cursive";

  /* Permanent words printed on the frames (change them here) */
  const WORDS = {
    love: "love you",
    nick: "Thel Thel",
    always: "forever & always",
    fav: "my favourite person",
  };
  /* The big caption is editable on the page; the date is always today */
  const CAPTION_KEY = "booth-caption-v1";
  const CAPTION_MAX = 28;
  const DEFAULT_CAPTION = `Happy Birthday, ${NAME}`;
  const cleanCaption = (v) =>
    (typeof v === "string" ? v : "")
      .replace(/[\u0000-\u001f]/g, "")
      .trim()
      .slice(0, CAPTION_MAX);

  const canvas = $("#boothCanvas"),
    ctx = canvas.getContext("2d"),
    video = $("#boothVideo");

  let frameId = "sky";
  let stream = null;
  let raf = 0;
  let busy = false;
  let still = null; // { img, mirror }
  let overlays = {};
  let caption = cleanCaption(store.get(CAPTION_KEY)) || DEFAULT_CAPTION;

  /* ---------- drawing helpers ---------- */
  function drawSprite(c, name, x, y, px) {
    SPR[name].forEach((row, ry) =>
      [...row].forEach((ch, rx) => {
        if (ch === ".") return;
        c.fillStyle = PAL[ch];
        c.fillRect(x + rx * px, y + ry * px, px, px);
      }),
    );
  }
  function ring(c, x, y, w, h, t, color) {
    c.fillStyle = color;
    c.fillRect(x - t, y - t, w + 2 * t, t);
    c.fillRect(x - t, y + h, w + 2 * t, t);
    c.fillRect(x - t, y, t, h);
    c.fillRect(x + w, y, t, h);
  }
  function text(c, str, x, y, font, fill, shadow) {
    c.font = font;
    c.textAlign = "center";
    c.textBaseline = "middle";
    if (shadow) {
      c.fillStyle = shadow;
      c.fillText(str, x + 5, y + 5);
    }
    c.fillStyle = fill;
    c.fillText(str, x, y);
  }
  /* shrink a font until the text fits maxW */
  function fitFont(c, str, maxW, weight, size, family) {
    let px = size;
    c.font = `${weight} ${px}px ${family}`;
    while (px > 28 && c.measureText(str).width > maxW) {
      px -= 2;
      c.font = `${weight} ${px}px ${family}`;
    }
    return c.font;
  }
  /* Caption: shrink until it fits the width AND height of its space, then
     centre it by where the letters are really drawn. Burmese (and other
     scripts) are taller than the pixel font, and some Burmese fonts report a
     width that differs from what they draw, so normal centring puts the text
     too low or off to one side. */
  function captionText(c, str, cy, maxW, maxH, weight, size, family, fill, shadow) {
    c.textAlign = "left";
    c.textBaseline = "alphabetic";
    let px = size + 2,
      m,
      inkW,
      inkH;
    do {
      px -= 2;
      c.font = `${weight} ${px}px ${family}`;
      m = c.measureText(str);
      inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    } while (px > 20 && (Math.max(inkW, m.width) > maxW || inkH > maxH));
    const x = W / 2 - (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2,
      y = cy + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
    if (shadow) {
      c.fillStyle = shadow;
      c.fillText(str, x + 5, y + 5);
    }
    c.fillStyle = fill;
    c.fillText(str, x, y);
  }
  /* a tilted pixel label, like a sticker stuck on the photo */
  function tag(c, str, x, y, deg, font, bg, fg) {
    c.save();
    c.translate(x, y);
    c.rotate((deg * Math.PI) / 180);
    c.font = font;
    const w = Math.ceil(c.measureText(str).width) + 36,
      h = 56;
    c.fillStyle = "rgba(29, 79, 128, 0.25)";
    c.fillRect(-w / 2 + 6, -h / 2 + 8, w, h);
    c.fillStyle = PAL.X;
    c.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8);
    c.fillStyle = bg;
    c.fillRect(-w / 2, -h / 2, w, h);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = fg;
    c.fillText(str, 0, 2);
    c.restore();
  }
  function today() {
    const d = new Date();
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  /* ---------- frames: base (behind the hole) + deco (on top) ---------- */
  const FRAMES = [
    {
      id: "sky",
      name: "Sky",
      base(c) {
        ["#f4fbff", "#e3f4ff", "#c7e9ff", "#9fd6fb"].forEach((col, i) => {
          c.fillStyle = col;
          c.fillRect(0, (i * H) / 4, W, H / 4 + 1);
        });
      },
      deco(c) {
        ring(c, HOLE.x, HOLE.y, HOLE.w, HOLE.h, 8, PAL.X);
        drawSprite(c, "cloud", 20, 14, 10);
        drawSprite(c, "sun", W - 130, 10, 14);
        drawSprite(c, "heart", 24, HOLE.y + HOLE.h - 60, 12);
        drawSprite(c, "star", W - 110, HOLE.y + HOLE.h - 52, 12);
        drawSprite(c, "star", 8, 420, 6);
        drawSprite(c, "heart", W - 50, 520, 6);
        tag(c, WORDS.nick, W - 240, 190, 6, `26px ${FONT_TINY}`, "#fff", PAL.R);
        tag(c, WORDS.love, 240, HOLE.y + HOLE.h - 64, -5, `26px ${FONT_TINY}`, PAL.r, "#fff");
        const cap = caption.toUpperCase();
        captionText(c, cap, 947, 760, 80, 700, 74, FONT_PIXEL, PAL.X, "#fff");
        text(c, WORDS.always, W / 2, 1020, `600 44px ${FONT_PIXEL}`, PAL.R, "#fff");
        const half = c.measureText(WORDS.always).width / 2;
        drawSprite(c, "heart", W / 2 - half - 70, 998, 6);
        drawSprite(c, "heart", W / 2 + half + 28, 998, 6);
        text(c, today(), W / 2, 1088, `22px ${FONT_TINY}`, "#41709c");
      },
    },
    {
      id: "carat",
      name: "Carat",
      base(c) {
        c.fillStyle = PAL.P;
        c.fillRect(0, 0, W, H);
        c.fillStyle = "#ffc2d4";
        for (let y = 0; y < H; y += 32)
          for (let x = (y / 32) % 2 ? 32 : 0; x < W; x += 64)
            c.fillRect(x, y, 32, 32);
      },
      deco(c) {
        ring(c, HOLE.x, HOLE.y, HOLE.w, HOLE.h, 6, "#fff");
        ring(c, HOLE.x - 6, HOLE.y - 6, HOLE.w + 12, HOLE.h + 12, 6, PAL.R);
        drawSprite(c, "gem", 14, 14, 10);
        drawSprite(c, "gem", W - 104, 14, 10);
        drawSprite(c, "star", 18, HOLE.y + HOLE.h - 50, 11);
        drawSprite(c, "heart", W - 96, HOLE.y + HOLE.h - 60, 12);
        drawSprite(c, "note", 4, 400, 6);
        drawSprite(c, "star", W - 50, 560, 6);
        tag(c, WORDS.nick, W / 2, 110, -3, `26px ${FONT_TINY}`, "#fff", PAL.R);
        tag(c, WORDS.love, W - 230, HOLE.y + HOLE.h - 70, 5, `26px ${FONT_TINY}`, PAL.R, "#fff");
        const cap = caption.toUpperCase();
        captionText(c, cap, 954, 760, 80, 700, 60, FONT_PIXEL, "#fff", PAL.R);
        const line2 = `13 + 3 + 1 = 17 + YOU  ·  ${WORDS.always.toUpperCase()}`;
        text(c, line2, W / 2, 1025, fitFont(c, line2, 780, 400, 26, FONT_TINY), PAL.R);
        text(c, today(), W / 2, 1082, `20px ${FONT_TINY}`, PAL.R);
      },
    },
    {
      id: "polaroid",
      name: "Polaroid",
      base(c) {
        c.fillStyle = PAL.p;
        c.fillRect(0, 0, W, H);
      },
      deco(c) {
        ring(c, 6, 6, W - 12, H - 12, 6, PAL.X);
        ring(c, HOLE.x, HOLE.y, HOLE.w, HOLE.h, 4, PAL.X);
        tag(c, WORDS.nick, W - 200, 110, 7, `700 40px ${FONT_HAND}`, PAL.y, "#2a4a6e");
        tag(c, WORDS.fav, 270, HOLE.y + HOLE.h - 60, -4, `700 40px ${FONT_HAND}`, PAL.P, "#2a4a6e");
        drawSprite(c, "heart", 90, 80, 8);
        drawSprite(c, "star", HOLE.x + HOLE.w - 90, HOLE.y + HOLE.h - 80, 8);
        captionText(c, caption, 950, 740, 88, 700, 80, FONT_HAND, "#2a4a6e");
        text(c, `${WORDS.love}, ${WORDS.always}`, W / 2, 1030, `600 42px ${FONT_HAND}`, PAL.R);
        const sub = AGE > 0 && AGE < 120 ? `turning ${AGE}  ·  ${today()}` : today();
        text(c, sub, W / 2, 1082, `600 36px ${FONT_HAND}`, "#41709c");
        drawSprite(c, "flower", 40, 1010, 10);
        drawSprite(c, "heart", W - 110, 1010, 10);
      },
    },
  ];
  const frameById = (id) => FRAMES.find((f) => f.id === id) || FRAMES[0];

  function overlay(id) {
    const key = `${id}|${today()}`;
    if (overlays[key]) return overlays[key];
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d");
    const f = frameById(id);
    f.base(g);
    g.clearRect(HOLE.x, HOLE.y, HOLE.w, HOLE.h);
    f.deco(g);
    overlays = { ...overlays, [key]: c };
    return c;
  }

  /* ---------- compose photo + frame ---------- */
  function drawCover(c, src, mirror) {
    const sw = src.videoWidth || src.width,
      sh = src.videoHeight || src.height;
    if (!sw || !sh) return;
    const k = Math.max(HOLE.w / sw, HOLE.h / sh),
      cw = HOLE.w / k,
      ch = HOLE.h / k;
    c.save();
    if (mirror) {
      c.translate(2 * HOLE.x + HOLE.w, 0);
      c.scale(-1, 1);
    }
    c.drawImage(src, (sw - cw) / 2, (sh - ch) / 2, cw, ch, HOLE.x, HOLE.y, HOLE.w, HOLE.h);
    c.restore();
  }
  function drawPlaceholder(c) {
    c.fillStyle = "#c7e9ff";
    c.fillRect(HOLE.x, HOLE.y, HOLE.w, HOLE.h);
    drawSprite(c, "camera", W / 2 - 96, HOLE.y + HOLE.h / 2 - 130, 24);
    text(c, "YOUR PHOTO HERE", W / 2, HOLE.y + HOLE.h / 2 + 90, `30px ${FONT_TINY}`, PAL.X);
  }
  function render(src, mirror) {
    ctx.clearRect(0, 0, W, H);
    if (src) drawCover(ctx, src, mirror);
    else drawPlaceholder(ctx);
    ctx.drawImage(overlay(frameId), 0, 0);
  }
  let shotBlob = null,
    blobToken = 0;
  function prepareBlob() {
    const t = ++blobToken;
    shotBlob = null;
    canvas.toBlob((b) => {
      if (t === blobToken) shotBlob = b;
    }, "image/png");
  }
  function refresh() {
    if (raf) return; // live loop redraws by itself
    render(still && still.img, still && still.mirror);
    if (still) prepareBlob();
  }

  /* ---------- UI state ---------- */
  function setMode(m) {
    $("#camBtn").hidden = m !== "idle";
    $("#snapBtn").hidden = m !== "live";
    $("#camOff").hidden = m !== "live";
    $("#retake").textContent = still && !still.mirror ? "↺ Choose another" : "↺ Retake";
    $("#ctrlLive").hidden = m === "shot";
    $("#ctrlShot").hidden = m !== "shot";
  }
  const START_TIP = $("#boothTip").innerHTML;
  function tip(msg) {
    $("#boothTip").textContent = msg;
  }

  /* ---------- frame picker ---------- */
  function renderPicker() {
    $("#frames").innerHTML = FRAMES.map(
      (f) =>
        `<button class="frame-opt" role="radio" aria-checked="${f.id === frameId}" data-f="${f.id}"><canvas width="${W / 5}" height="${H / 5}"></canvas>${f.name}</button>`,
    ).join("");
    $("#frames")
      .querySelectorAll(".frame-opt")
      .forEach((b) => {
        const g = b.querySelector("canvas").getContext("2d");
        g.scale(0.2, 0.2);
        drawPlaceholder(g);
        g.drawImage(overlay(b.dataset.f), 0, 0);
      });
  }
  $("#frames").addEventListener("click", (e) => {
    const b = e.target.closest(".frame-opt");
    if (!b) return;
    frameId = b.dataset.f;
    $("#frames")
      .querySelectorAll(".frame-opt")
      .forEach((x) => x.setAttribute("aria-checked", String(x === b)));
    refresh();
  });

  /* ---------- camera ---------- */
  function cameraError(err) {
    const n = err && err.name;
    if (n === "NotAllowedError")
      return "Camera access was blocked. Allow it in your browser settings, or upload a photo instead.";
    if (n === "NotFoundError" || n === "OverconstrainedError")
      return "No camera was found. You can upload a photo instead.";
    return "The camera could not start. You can upload a photo instead.";
  }
  function loop() {
    render(video, true);
    raf = requestAnimationFrame(loop);
  }
  function stopCamera() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    stream = null;
    video.srcObject = null;
  }
  let starting = false;
  async function startCamera() {
    if (starting || stream) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      tip("This browser can't open the camera here. You can upload a photo instead.");
      return;
    }
    starting = true;
    $("#camBtn").disabled = true;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      video.srcObject = stream;
      await video.play();
      if (current !== "photobooth" || document.hidden) {
        stopCamera();
        return;
      }
      still = null;
      setMode("live");
      tip("Smile! Tap Take photo and hold still for 3 seconds.");
      cancelAnimationFrame(raf);
      loop();
    } catch (err) {
      stopCamera();
      setMode("idle");
      tip(cameraError(err));
      toast("The camera could not start");
    } finally {
      starting = false;
      $("#camBtn").disabled = false;
    }
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function snap() {
    if (busy || !stream) return;
    busy = true;
    $("#snapBtn").disabled = true;
    for (let n = COUNT_FROM; n > 0 && stream; n--) {
      $("#boothCount").innerHTML = `<span>${n}</span>`;
      await sleep(COUNT_MS);
    }
    $("#boothCount").innerHTML = "";
    $("#snapBtn").disabled = false;
    busy = false;
    if (!stream || !video.videoWidth) return; // left the page mid-countdown
    const shot = document.createElement("canvas");
    shot.width = video.videoWidth;
    shot.height = video.videoHeight;
    shot.getContext("2d").drawImage(video, 0, 0);
    stopCamera();
    still = { img: shot, mirror: true };
    refresh();
    setMode("shot");
    tip("Love it? Tap Save photo. Not quite? Retake, try another frame, or Cancel to start over.");
    const fl = $("#boothFlash");
    fl.classList.remove("go");
    void fl.offsetWidth;
    fl.classList.add("go");
    const r = canvas.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 24);
  }

  /* ---------- upload ---------- */
  function loadImage(file) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, MAX_UPLOAD / Math.max(img.width, img.height)),
          c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        res(c);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        rej(new Error("image load failed"));
      };
      img.src = URL.createObjectURL(file);
    });
  }
  $("#boothFile").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please choose a photo");
      return;
    }
    try {
      const img = await loadImage(file);
      stopCamera();
      still = { img, mirror: false };
      refresh();
      setMode("shot");
      tip("Love it? Tap Save photo. Not quite? Choose another, try another frame, or Cancel to start over.");
    } catch (err) {
      toast("Sorry, that photo could not be opened");
    }
  });

  /* ---------- save ---------- */
  function download(blob, name) {
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  async function savePhoto() {
    const blob = shotBlob || (await new Promise((r) => canvas.toBlob(r, "image/png")));
    if (!blob) {
      toast("Sorry, the photo could not be saved");
      return;
    }
    const name = `birthday-${NAME.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}.png`;
    const file = new File([blob], name, { type: "image/png" });
    const touch = matchMedia("(pointer: coarse)").matches;
    if (touch && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Happy Birthday" });
        toast("Photo ready ♥");
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return; // she closed the share sheet
      }
    }
    download(blob, name);
    toast("Photo saved ♥");
  }

  /* ---------- wiring ---------- */
  $("#camBtn").onclick = startCamera;
  $("#snapBtn").onclick = snap;
  $("#saveShot").onclick = savePhoto;
  /* Retake: camera photo -> reopen the camera; uploaded photo -> pick another file */
  $("#retake").onclick = () => {
    if (still && !still.mirror) {
      $("#boothFile").click();
      return;
    }
    still = null;
    setMode("idle");
    refresh();
    startCamera();
  };
  /* Cancel: throw the photo away (or close the camera) and go back to the start */
  function cancel() {
    stopCamera();
    still = null;
    blobToken++;
    shotBlob = null;
    setMode("idle");
    refresh();
    $("#boothTip").innerHTML = START_TIP;
  }
  $("#cancelShot").onclick = cancel;
  $("#camOff").onclick = cancel;
  function pause() {
    if (!stream) return;
    stopCamera();
    setMode(still ? "shot" : "idle");
    refresh();
  }
  document.addEventListener("pagechange", (e) => {
    if (e.detail !== "photobooth") pause();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
  });

  $("#boothCaption").value = caption;
  $("#boothCaption").placeholder = DEFAULT_CAPTION;
  $("#boothCaption").maxLength = CAPTION_MAX;
  $("#boothCaption").addEventListener("input", (e) => {
    caption = cleanCaption(e.target.value) || DEFAULT_CAPTION;
    store.set(CAPTION_KEY, caption);
    overlays = {};
    renderPicker();
    refresh();
  });

  setMode("idle");
  renderPicker();
  refresh();
  /* redraw once the pixel/handwriting fonts have loaded */
  Promise.all(
    [`700 78px ${FONT_PIXEL}`, `22px ${FONT_TINY}`, `700 92px ${FONT_HAND}`].map((f) =>
      document.fonts.load(f),
    ),
  )
    .then(() => {
      overlays = {};
      renderPicker();
      refresh();
    })
    .catch(() => {}); // fonts are optional: fallback fonts still draw fine
})();
