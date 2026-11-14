/* ===================== EASY CUSTOMIZATION ===================== */
const CONFIG = {
  friendName: "Dearest Wyne", // shown on Home + letter
  birthday: { month: 1, day: 9 }, // Wyne's birthday: 9 January (she can change it)
  bornYear: 2002, // used to show her new age
  timeZone: "Asia/Tokyo", // Wyne lives in Japan: all times use Japan time (UTC+9)
  wishesOpen: "2027-01-09", // Birthday Wishes page is locked until 00:00 on this day (Japan time)
};

/* PHOTOS: leave src empty ("") for a "coming soon" frame.
   Later: put a photo in the Images folder and write its name, e.g. src: "Images/photo1.jpg"
   (Capital I matters on GitHub!) */
const PHOTOS = [
  { src: "", caption: "our first photo" },
  { src: "", caption: "our first concert" },
  { src: "", caption: "silly us" },
  { src: "", caption: "golden hour" },
  { src: "", caption: "your next birthday" },
  { src: "", caption: "forever friends" },
];
/* ============================================================== */
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const store = {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    } catch (e) {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  },
};

/* ---------------- Pixel sprites (original designs) ---------------- */
const PAL = {
  X: "#1d4f80",
  w: "#ffffff",
  h: "#d9f2ff",
  c: "#7cc8f0",
  d: "#3b8fd1",
  b: "#5bb5ec",
  r: "#ff8fb1",
  R: "#d9577f",
  P: "#ffd1df",
  o: "#a9cde8",
  y: "#ffe08a",
  Y: "#f5b942",
  g: "#8fd694",
  G: "#4fa65a",
  k: "#2a3b55",
  p: "#fffdf7",
  e: "#e9e2cf",
  H: "#5a3d2b",
  J: "#8a6448",
  N: "#2e2633",
  M: "#4d4257",
  S: "#ffdcc6",
  T: "#f3bfa3",
  K: "#3a2a2a",
};
const SPR = {
  lock: [
    "..XXXXX..",
    ".XX...XX.",
    ".X.....X.",
    ".X.....X.",
    "XXXXXXXXX",
    "XyyyyyyyX",
    "XyyyXyyyX",
    "XyyyXyyyX",
    "XyyyyyyyX",
    "XYYYYYYYX",
    "XXXXXXXXX",
  ],
  hug1: [
    "................................",
    ".........................X......",
    ".....XXXXXXXX......XXXXXXrX.....",
    "....XcccHHHHHX....XNNNNNrRrX....",
    "....XcwcJJHHHHX..XNMMNNNNrX.....",
    "....XcccHHHHHHHXXNMNNNNNNNX.....",
    "....XHHHHHHHHHHHXNNNNNNNNNNX....",
    "....XHHHHHHHHHHHXNNNNNNNNNNX....",
    "....XHHSHSSHSSHHXNSNSSNSSNNX....",
    "....XHHSKSSSKSHHXNSKSSSKSNNX....",
    "....XHHKSKSKSKHHXNKSKSKSKNNX....",
    "....XHHrSSSSSrHHXNrSSSSSrNNX....",
    "....XHHHSSRSSHHHXNNSSRSSNNNX....",
    ".....XXXHHHHHXXXXXXNNNNNXXX.....",
    ".......XXXTXXX....XXXTXXX.......",
    "......XdcwwwcdX..XRrwwwrRX......",
    "......XdccccXXXXXXXXXXXXXX......",
    ".....XdccccXSSSSSSSSSSSSSSX.....",
    ".....XdccccXTTTTTTTTTTTTTSX.....",
    "....XdcXXXXXXXXXXXXXXXXXXXRX....",
    "....XdXSSSSSSSSSSSSSXrrrrrRX....",
    "...XdcXSTTTTTTTTTTTTXrrrrrrRX...",
    "...XdccXXXXXXXXXXXXXrrrrrrrRX...",
    "..XdcccccccccccccdXrrrrrrrrrRX..",
    "..XdcccccccccccccdXrrrrrrrrrRX..",
    "...XXXXXXXXXXXXXXXXXXXXXXXXXX...",
  ],
  hug2: [
    "................................",
    "........................X.......",
    "......XXXXXXXX....XXXXXXrX......",
    ".....XcccHHHHHX..XNNNNNrRrX.....",
    ".....XcwcJJHHHHXXNMMNNNNrX......",
    ".....XcccHHHHHHHXMNNNNNNNX......",
    ".....XHHHHHHHHHHHXNNNNNNNNX.....",
    ".....XHHHHHHHHHHHXNNNNNNNNX.....",
    ".....XHHHSHSSHSSHXSSNSSNNNX.....",
    ".....XHHHSKSSSKSHXSSSKSNNNX.....",
    ".....XHHHKSKSKSKHXKSKSKNNNX.....",
    ".....XHHHrSSSSSrHXSSSSrNNNX.....",
    ".....XHHHHSSRSSHHXSRSSNNNNX.....",
    "......XXXHHHHHXXXXNNNNNXXX......",
    ".......XXXXTXX....XXTXXXX.......",
    "......XdcwwwcdX..XRrwwwrRX......",
    "......XdccccXXXXXXXXXXXXXX......",
    ".....XdccccXSSSSSSSSSSSSSSX.....",
    ".....XdccccXTTTTTTTTTTTTTSX.....",
    "....XdcXXXXXXXXXXXXXXXXXXXRX....",
    "....XdXSSSSSSSSSSSSSXrrrrrRX....",
    "...XdcXSTTTTTTTTTTTTXrrrrrrRX...",
    "...XdccXXXXXXXXXXXXXrrrrrrrRX...",
    "..XdcccccccccccccdXrrrrrrrrrRX..",
    "..XdcccccccccccccdXrrrrrrrrrRX..",
    "...XXXXXXXXXXXXXXXXXXXXXXXXXX...",
  ],
  heart: [
    ".RR.RR.",
    "RhrRrrR",
    "RrrrrrR",
    "RrrrrrR",
    ".RrrrR.",
    "..RrR..",
    "...R...",
  ],
  gem: [
    "..XXXXX..",
    ".XwhccdX.",
    "XwhhcccdX",
    ".XhcccdX.",
    "..XccdX..",
    "...XdX...",
    "....X....",
  ],
  note: [
    "...XX...",
    "...XcX..",
    "...X.cX.",
    "...X..X.",
    "...X....",
    ".XXX....",
    "XcccX...",
    "XcccX...",
    ".XXX....",
  ],
  star: ["...w...", "..wyw..", "wwyYyww", ".wyYyw.", "..wyw..", ".w...w."],
  cloud: [
    "....oooo........",
    "..oowwwwoo.ooo..",
    ".owwwwwwwwowwwo.",
    "owwwwwwwwwwwwwwo",
    "owwwwhwwwwwwhwwo",
    ".oooooooooooooo.",
  ],
  sun: [
    "..YYYY..",
    ".YyyyyY.",
    "YyywyyyY",
    "YyyyyyyY",
    "YyyyyyyY",
    "YyyyyyyY",
    ".YyyyyY.",
    "..YYYY..",
  ],
  clock: [
    "..XXXX..",
    ".XwwwwX.",
    "XwwXwwwX",
    "XwwXwwwX",
    "XwwXXXwX",
    "XwwwwwwX",
    ".XwwwwX.",
    "..XXXX..",
  ],
  letter: [
    "XXXXXXXXXX",
    "XwXhhhhXwX",
    "XwwXhhXwwX",
    "XwwwXXwwwX",
    "XwwwwrwwwX",
    "XwwwwwwwwX",
    "XXXXXXXXXX",
  ],
  flower: [
    "..r.r..",
    ".rPrPr.",
    "rPPyPPr",
    ".rPrPr.",
    "..rGr..",
    "...G.G.",
    "..GG...",
  ],
  disc: [
    "....XXXX....",
    "..XXkkkkXX..",
    ".XkkkdkkkkX.",
    ".XkkdkkkkkX.",
    "XkkdkbbbkkkX",
    "XkkkbwwbkkkX",
    "XkkkbwwbkkkX",
    "XkkkkbbbkdkX",
    ".XkkkkkkdkX.",
    ".XkkkkkdkkX.",
    "..XXkkkkXX..",
    "....XXXX....",
  ],
  camera: [
    "..XXX...",
    "XXXXXXXX",
    "XhhhhhhX",
    "XhhXXhhX",
    "XhXccXhX",
    "XhhXXhhX",
    "XXXXXXXX",
  ],
};
function sprite(name) {
  const g = SPR[name];
  let r = "";
  g.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".")
        r += `<rect x="${x}" y="${y}" width="1.04" height="1.04" fill="${PAL[ch]}"/>`;
    }),
  );
  return `<svg class="px" viewBox="0 0 ${g[0].length} ${g.length}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">${r}</svg>`;
}
function paintSprites(root = document) {
  root.querySelectorAll("[data-spr]").forEach((el) => {
    if (!el.dataset.done) {
      el.innerHTML = sprite(el.dataset.spr);
      el.dataset.done = 1;
    }
  });
}
paintSprites();

/* sky: sun + clouds + bands */
(function () {
  const s = $("#sky");
  let h = `<div class="sun">${sprite("sun")}</div>`;
  for (let i = 0; i < 7; i++)
    h += `<div class="band" style="top:${8 + i * 6}%;opacity:${0.5 - i * 0.06}"></div>`;
  const cl = [
    [8, 140, 70],
    [22, 90, 95],
    [36, 170, 120],
    [14, 110, 150],
    [48, 80, 85],
  ];
  cl.forEach(
    ([top, w, dur], i) =>
      (h += `<div class="cloud" style="top:${top}%;width:${w}px;animation-duration:${dur}s;animation-delay:${(-i * dur) / 2.3}s">${sprite("cloud")}</div>`),
  );
  s.innerHTML = h;
})();

$("#heroName").textContent = CONFIG.friendName;
//$('#letterTo').textContent=`My ${CONFIG.friendName.replace(/^dearest\s*/i,'dearest ')},`.replace('My dearest dearest','My dearest');
$("#mailTo").textContent =
  "to my " + CONFIG.friendName.replace(/^Dearest/, "dearest");

/* ---------------- FX: pixel rain, sparkles, water, ripples ---------------- */
const cv = $("#fx"),
  cx = cv.getContext("2d");
let W,
  H,
  DPR = Math.min(devicePixelRatio || 1, 2);
function resize() {
  W = innerWidth;
  H = innerHeight;
  cv.width = W * DPR;
  cv.height = H * DPR;
  cv.style.width = W + "px";
  cv.style.height = H + "px";
  cx.setTransform(DPR, 0, 0, DPR, 0, 0);
  cx.imageSmoothingEnabled = false;
}
resize();
addEventListener("resize", resize);
const G = 4,
  snap = (v) => Math.round(v / G) * G,
  mobile = innerWidth < 640;
const drops = [],
  bits = [],
  ripples = [],
  sparks = [];
const intensity = {
  login: 1,
  home: 0.75,
  songs: 0.35,
  photobooth: 0.3,
  wishes: 0.45,
};
let rain = 1,
  tRain = 1;
function newDrop(init) {
  const z = Math.random();
  return {
    x: Math.random() * W,
    y: init ? Math.random() * H : -20 - Math.random() * 200,
    z,
    len: z > 0.6 ? 12 : 8,
    v: 5 + z * 7,
    on: Math.random(),
  };
}
for (let i = 0; i < (mobile ? 70 : 140); i++) drops.push(newDrop(true));
for (let i = 0; i < (mobile ? 18 : 34); i++)
  sparks.push({
    x: Math.random() * W,
    y: Math.random() * H * 0.85,
    ph: Math.random() * 6,
    sp: 0.02 + Math.random() * 0.04,
    c: Math.random() < 0.3 ? "#ffd1df" : "#ffffff",
  });
let t = 0;
function waterY(x) {
  return (
    H -
    64 +
    snap(Math.sin(x * 0.012 + t * 1.4) * 6 + Math.sin(x * 0.031 - t) * 4)
  );
}
function frame() {
  t += 0.016;
  cx.clearRect(0, 0, W, H);
  rain += (tRain - rain) * 0.03;
  // sparkles
  for (const s of sparks) {
    s.ph += s.sp;
    const a = (Math.sin(s.ph) + 1) / 2;
    if (a < 0.15) {
      continue;
    }
    cx.globalAlpha = a * 0.9;
    cx.fillStyle = s.c;
    const x = snap(s.x),
      y = snap(s.y);
    cx.fillRect(x, y - G, G, G * 3);
    cx.fillRect(x - G, y, G * 3, G);
    if (s.ph > Math.PI * 2 * 3) {
      s.ph = 0;
      s.x = Math.random() * W;
      s.y = Math.random() * H * 0.85;
    }
  }
  cx.globalAlpha = 1;
  // rain
  for (const d of drops) {
    d.y += d.v;
    if (d.on > rain) {
      if (d.y > H) Object.assign(d, newDrop());
      continue;
    }
    cx.fillStyle = d.z > 0.6 ? "rgba(47,127,192,.55)" : "rgba(91,181,236,.4)";
    cx.fillRect(snap(d.x), snap(d.y), d.z > 0.6 ? 3 : 2, d.len);
    const wy = waterY(d.x);
    if (d.y > wy - 8) {
      if (Math.random() < 0.5) {
        for (let k = 0; k < 2; k++)
          bits.push({
            x: d.x,
            y: wy - 4,
            vx: (Math.random() - 0.5) * 2.4,
            vy: -1.5 - Math.random() * 2,
            l: 24,
          });
      }
      Object.assign(d, newDrop());
    }
  }
  // splash bits
  cx.fillStyle = "rgba(255,255,255,.95)";
  for (let i = bits.length - 1; i >= 0; i--) {
    const b = bits[i];
    b.x += b.vx;
    b.y += b.vy;
    b.vy += 0.18;
    if (--b.l <= 0) {
      bits.splice(i, 1);
      continue;
    }
    cx.fillRect(snap(b.x), snap(b.y), G, G);
  }
  // pixel water
  const col = 8;
  for (let x = 0; x < W + col; x += col) {
    const y = waterY(x);
    cx.fillStyle = "rgba(91,181,236,.5)";
    cx.fillRect(x, y, col, H - y);
    cx.fillStyle = "rgba(47,127,192,.35)";
    cx.fillRect(x, y + 24, col, H - y);
    cx.fillStyle = "rgba(255,255,255,.8)";
    cx.fillRect(x, y, col, G);
    if ((x / col + Math.floor(t * 3)) % 7 === 0) {
      cx.fillStyle = "rgba(255,255,255,.55)";
      cx.fillRect(x, y + 12, col, G);
    }
  }
  // click ripples (square pixel rings)
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    r.r += 2.2;
    const k = 1 - r.r / r.max;
    if (k <= 0) {
      ripples.splice(i, 1);
      continue;
    }
    for (let j = 0; j < 3; j++) {
      const rr = snap(r.r - j * 18);
      if (rr <= 0) continue;
      cx.strokeStyle =
        j % 2 ? `rgba(255,255,255,${k})` : `rgba(91,181,236,${k * 0.9})`;
      cx.lineWidth = G;
      cx.strokeRect(snap(r.x) - rr, snap(r.y) - rr * 0.6, rr * 2, rr * 1.2);
    }
  }
  requestAnimationFrame(frame);
}
frame();
addEventListener("pointerdown", (e) => {
  if (e.target.closest("input,textarea,[contenteditable]")) return;
  ripples.push({ x: e.clientX, y: e.clientY, r: 0, max: 110 });
});

/* ---------------- Router with block transition ---------------- */
const tr = $("#tr");
tr.innerHTML = Array.from(
  { length: 96 },
  () => `<i style="--d:${(Math.random() * 0.28).toFixed(2)}s"></i>`,
).join("");
const pages = ["login", "home", "songs", "photobooth", "wishes"];
let loggedIn = false;
try {
  loggedIn = sessionStorage.getItem("carat-in") === "1";
} catch (e) {}
let current = null,
  busy = false;
function target() {
  let p = (location.hash || "").slice(1);
  if (!pages.includes(p)) p = loggedIn ? "home" : "login";
  if (!loggedIn) p = "login";
  if (loggedIn && p === "login") p = "home";
  return p;
}
function show(p) {
  $$(".page").forEach((x) => x.classList.toggle("on", x.id === p));
  scrollTo(0, 0);
  current = p;
  tRain = intensity[p];
  $("#nav").classList.toggle("show", p !== "login");
  $$("#links a").forEach((a) =>
    a.classList.toggle("active", a.dataset.p === p),
  );
  movePill();
  observeReveals($("#" + p));
  if (p === "home") maybeGuide();
  if (p === "wishes") updateLock();
  if (p === "wishes") resetLetter();
  document.dispatchEvent(new CustomEvent("pagechange", { detail: p }));
}
function go() {
  const p = target();
  if (p === current || busy) return;
  if (location.hash.slice(1) !== p) history.replaceState(null, "", "#" + p);
  if (!current) {
    show(p);
    return;
  }
  busy = true;
  tr.classList.add("cover");
  setTimeout(() => {
    show(p);
    tr.classList.remove("cover");
    setTimeout(() => {
      busy = false;
      if (target() !== current) go();
    }, 550);
  }, 560);
}
function movePill() {
  const a = $("#links a.active"),
    pill = $("#pill");
  if (!a) {
    pill.style.width = 0;
    return;
  }
  pill.style.left = a.offsetLeft + "px";
  pill.style.width = a.offsetWidth + "px";
  a.scrollIntoView({ block: "nearest", inline: "center" });
}
addEventListener("hashchange", go);
addEventListener("resize", movePill);
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
function observeReveals(s) {
  s.querySelectorAll(".reveal").forEach((r) => {
    r.classList.remove("in");
    io.observe(r);
  });
}

/* parallax */
let mx = 0,
  my = 0;
addEventListener("pointermove", (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
  par();
});
addEventListener("scroll", par, { passive: true });
function par() {
  if (current !== "home") return;
  $$("#hero [data-depth]").forEach((el) => {
    const d = +el.dataset.depth;
    el.style.transform = `translate(${snap(mx * d)}px,${snap(my * d + scrollY * d * 0.015)}px)`;
  });
}

/* ---------------- Login ---------------- */
/* LOGIN: change the username, password and wrong-password message here */
const LOGIN = {
  username: "Wyne",
  password: "lovesmomo",
  wrongMessage: "Oops! Try again! You don't love me. 💔",
};
$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = $("#user").value.trim().toLowerCase(),
    p = $("#pass").value.trim().toLowerCase();
  if (
    u !== LOGIN.username.toLowerCase() ||
    p !== LOGIN.password.toLowerCase()
  ) {
    const c = $("#loginForm");
    c.classList.remove("shake");
    void c.offsetWidth;
    c.classList.add("shake");
    $("#loginErr").textContent = LOGIN.wrongMessage;
    $("#pass").value = "";
    return;
  }
  $("#loginErr").textContent = "";
  const b = $("#enterBtn");
  b.textContent = "Loading…";
  b.disabled = true;
  setTimeout(() => {
    loggedIn = true;
    try {
      sessionStorage.setItem("carat-in", "1");
    } catch (e) {}
    location.hash = "home";
    b.textContent = "▶ Press Start";
    b.disabled = false;
  }, 700);
});

/* ================= SONGS PAGE =================
   Each song can have its own spotify link (Spotify app: song > Share > Copy Song Link)
   PART 1 · OUR SONGS (your playlist)
   - spotify: your playlist link (Spotify app: playlist > Share > Copy link)
   - tracks: write each song as { title: "...", artist: "...", length: "3:30" }  */
const OUR_PLAYLIST = {
  title: "Our Songs",
  note: "Made by me, for us",
  spotify: "https://open.spotify.com/playlist/5jHtuiQyeotkUNFC2dL8kv",
  tracks: [
    {
      title: "Long Live",
      artist: "Taylor Swift",
      length: "5:17",
      spotify: "https://open.spotify.com/track/4hqJ4bSlYJOXb6Z4SRmzxs",
    },
    {
      title: "You're My Best Friend",
      artist: "Queen",
      length: "2:52",
      spotify: "https://open.spotify.com/track/46gybz6M2g4oiVvt1aWOV4",
    },
    {
      title: "You've Got a Friend",
      artist: "Carole King",
      length: "5:09",
      spotify: "https://open.spotify.com/track/1qhp5owrFGeZ5Jgin28nwR",
    },
    {
      title: "It's Nice to Have a Friend",
      artist: "Taylor Swift",
      length: "2:31",
      spotify:
        "https://open.spotify.com/search/It's%20Nice%20to%20Have%20a%20Friend%20Taylor%20Swift",
    },
    {
      title: "In My Life",
      artist: "The Beatles",
      length: "2:27",
      spotify: "https://open.spotify.com/track/3KfbEIOC7YIv90FIfNSZpo",
    },
    {
      title: "Have It All",
      artist: "Jason Mraz",
      length: "4:20",
      spotify: "https://open.spotify.com/track/7BXW1QCg56yzEBV8pW8pah",
    },
  ],
};

/* PART 2 · SONGS SHE MIGHT LOVE = the SONGS list below (one card each). Each has its own spotify link.
   ----------------
   Replace each spotify:"...REPLACE_ME" with the real link (Spotify app: Share > Copy Song Link) */
const SONGS = [
  {
    t: "God of Music",
    y: 2023,
    bg: ["#e3dcff", "#cfc4ff", "#bfe6ff"],
    s: "note",
    spotify: "https://open.spotify.com/track/4MTNimMDRyFZv37Thcktwa",
    d: "A happy, funky song about how music can turn strangers into best friends — just like us.",
  },
  {
    t: "Super",
    y: 2023,
    bg: ["#fff4c9", "#ffe08a", "#bfe6ff"],
    s: "star",
    spotify: "https://open.spotify.com/track/3AOf6YEpxQ894FmrwI9k96",
    d: "Their biggest hit — bold and powerful, made for feeling unstoppable.",
  },
  {
    t: "HOT",
    y: 2022,
    bg: ["#ffe9d6", "#ffd1b0", "#ffb98a"],
    s: "sun",
    spotify: "https://open.spotify.com/track/6I2tqFhk8tq69iursYxuxd",
    d: "A blazing summer anthem with western guitar vibes. Pure confidence.",
  },
  {
    t: "Very Nice",
    y: 2016,
    bg: ["#d9f2ff", "#bfe6ff", "#9fd6fb"],
    s: "heart",
    spotify: "https://open.spotify.com/track/1Rrj7KyS2R6SP9CQMDJW1w",
    d: "The concert song that never ends — pure joy, made for jumping.",
  },
  {
    t: "Rock with you",
    y: 2021,
    bg: ["#ffe2ec", "#ffd1df", "#bfe6ff"],
    s: "heart",
    spotify: "https://open.spotify.com/track/6LnEoRQKMcaFTR5UvaKuBy",
    d: "A sweet promise to stay by someone's side, with rock-pop energy.",
  },
  {
    t: "MAESTRO",
    y: 2024,
    bg: ["#c7d9f5", "#a9c4ee", "#8fb2e6"],
    s: "gem",
    spotify: "https://open.spotify.com/track/2UE9XGbAzicJIyo4bB6sqM",
    d: "Dramatic and orchestral — SEVENTEEN at their most powerful.",
  },
  {
    t: "Left & Right",
    y: 2020,
    bg: ["#d9f2ff", "#ffe2ec", "#bfe6ff"],
    s: "star",
    spotify: "https://open.spotify.com/track/66orj0qtDgnU6DlmllAxbq",
    d: "A cheerful push to keep going forward, your own way.",
  },
  {
    t: "HOME;RUN",
    y: 2020,
    bg: ["#e9f9e6", "#c9efc6", "#9fd6fb"],
    s: "note",
    spotify: "https://open.spotify.com/track/2iW0q5jJJT5HKlIs25AAgv",
    d: "A swinging, brassy retro groove that makes you smile.",
  },
  {
    t: "_WORLD",
    y: 2022,
    bg: ["#e3f4ff", "#c7e9ff", "#9fd6fb"],
    s: "flower",
    spotify: "https://open.spotify.com/track/3QwiidVHfeE9y5jl4n2MTC",
    d: "A bright, breezy song about wanting to show someone a better world.",
  },
];
function art(s, seed) {
  const N = 16,
    grid = Array.from({ length: N }, () => Array(N).fill(null));
  let rnd = seed * 9301 + 49297;
  const R = () => (rnd = (rnd * 9301 + 49297) % 233280) / 233280;
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++)
      grid[y][x] = y < 4 ? s.bg[0] : y < 8 ? s.bg[1] : s.bg[2];
  for (let x = 0; x < N; x++) {
    const top = 12 + (R() < 0.3 ? -1 : 0);
    for (let y = top; y < N; y++)
      grid[y][x] =
        y === top ? "#ffffff" : (x + y) % 3 === 0 ? "#3b8fd1" : "#5bb5ec";
  }
  // little cloud
  const cy = 1 + Math.floor(R() * 3),
    cxx = Math.floor(R() * 8);
  for (let x = cxx; x < cxx + 5; x++) grid[cy][x] = "#ffffff";
  for (let x = cxx + 1; x < cxx + 3; x++)
    grid[cy - 1 < 0 ? 0 : cy - 1][x] = "#ffffff";
  const sp = SPR[s.s],
    ox = Math.floor((N - sp[0].length) / 2),
    oy = Math.max(1, 11 - sp.length);
  sp.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".") grid[oy + y][ox + x] = PAL[ch];
    }),
  );
  let r = "";
  grid.forEach((row, y) =>
    row.forEach(
      (c, x) =>
        (r += `<rect x="${x}" y="${y}" width="1.04" height="1.04" fill="${c}"/>`),
    ),
  );
  return `<svg class="px" viewBox="0 0 16 16">${r}</svg>`;
}
$("#songGrid").innerHTML = SONGS.map(
  (s, i) => `<article class="song box reveal">
 <div class="art">${art(s, i + 3)}<span class="yr">${s.y}</span></div>
 <div class="meta">SEVENTEEN · ${s.y}</div><h3>${s.t}</h3><p>${s.d}</p>
 <a class="btn sm spot" href="${s.spotify}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#spotico"/></svg>Listen on Spotify</a></article>`,
).join("");
/* ---------------- Her favourite songs (added by her, saved on this device) ---------------- */
const FAV_KEY = "fav-songs-v1";
const FAV_STYLES = [
  { bg: ["#ffe2ec", "#ffd1df", "#bfe6ff"], s: "heart" },
  { bg: ["#e3dcff", "#cfc4ff", "#bfe6ff"], s: "note" },
  { bg: ["#fff4c9", "#ffe08a", "#bfe6ff"], s: "star" },
  { bg: ["#e9f9e6", "#c9efc6", "#9fd6fb"], s: "flower" },
];
const esc = (v) =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const isSpotify = (u) => {
  try {
    const x = new URL(u);
    return x.protocol === "https:" && x.hostname === "open.spotify.com";
  } catch (e) {
    return false;
  }
};
const favLink = (f) =>
  isSpotify(f.link)
    ? f.link
    : "https://open.spotify.com/search/" +
      encodeURIComponent(`${f.title} ${f.artist}`.trim());
let favs = (store.get(FAV_KEY) || []).filter(
  (f) => f && typeof f.title === "string",
);
function renderFavs() {
  $("#favGrid").innerHTML = favs
    .map((f, i) => {
      const st = FAV_STYLES[i % FAV_STYLES.length];
      return `<article class="song box fav">
 <button class="del" data-i="${i}" aria-label="Remove song">x</button>
 <div class="art">${art(st, i + 11)}</div>
 <div class="meta">Your pick${f.artist ? " · " + esc(f.artist) : ""}</div><h3>${esc(f.title)}</h3>
 <a class="btn sm spot" href="${esc(favLink(f))}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#spotico"/></svg>Listen on Spotify</a></article>`;
    })
    .join("");
}
function saveFavs(msg) {
  const ok = store.set(FAV_KEY, favs);
  toast(ok ? msg : "Could not save in this browser");
}
function addFav() {
  const title = $("#favTitle").value.trim(),
    artist = $("#favArtist").value.trim(),
    link = $("#favLink").value.trim();
  if (!title) {
    $("#favTitle").focus();
    return;
  }
  if (link && !isSpotify(link)) {
    toast("Please paste a Spotify link (open.spotify.com)");
    $("#favLink").focus();
    return;
  }
  favs = [...favs, { title, artist, link }];
  ["#favTitle", "#favArtist", "#favLink"].forEach((s) => ($(s).value = ""));
  renderFavs();
  saveFavs("Song added ♥");
}
$("#addFav").onclick = addFav;
["#favTitle", "#favArtist", "#favLink"].forEach((s) =>
  $(s).addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFav();
    }
  }),
);
$("#favGrid").addEventListener("click", (e) => {
  const d = e.target.closest(".del");
  if (d) {
    favs = favs.filter((_, i) => i !== +d.dataset.i);
    renderFavs();
    saveFavs("Song removed");
  }
});
renderFavs();
const PL = OUR_PLAYLIST.tracks.map((t) => {
  const [m, sec] = (t.length || "3:30").split(":").map(Number);
  return [
    t.title,
    t.length || "3:30",
    m * 60 + (sec || 0) || 210,
    t.artist || "",
    t.spotify || "",
  ];
});
$("#plTitle").textContent = OUR_PLAYLIST.title;
$("#plSub").textContent = `${OUR_PLAYLIST.note} · ${PL.length} tracks`;
$("#plLink").href = OUR_PLAYLIST.spotify;
$("#plLink").target = "_blank";
$("#plLink").rel = "noopener";
let cur = 0,
  playing = false,
  pos = 0;
function renderPL() {
  $("#tracklist").innerHTML = PL.map(
    (t, i) =>
      `<li data-i="${i}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${t[0]}${t[3] ? `<small style="display:block;font-weight:400;font-size:12px;color:var(--ink2)">${t[3]}</small>` : ""}</span><span class="d">${t[1]}</span>${t[4] ? `<a class="trk-spot" href="${t[4]}" target="_blank" rel="noopener" title="Open in Spotify" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24"><use href="#spotico"/></svg></a>` : ""}</li>`,
  ).join("");
}
renderPL();
const fmt = (s) =>
  Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
/* Real music: uses Spotify's official player (full songs if logged in to Spotify in this browser, 30-sec previews if not) */
const trackId = (u) => {
  const m = (u || "").match(/track\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
};
let ctrl = null,
  endGuard = -1;
function setTrack(i, play) {
  cur = (i + PL.length) % PL.length;
  pos = 0;
  endGuard = -1;
  $("#nowTitle").textContent = PL[cur][0];
  $("#tDur").textContent = PL[cur][1];
  $$("#tracklist li").forEach((l, k) => l.classList.toggle("cur", k === cur));
  upd();
  const id = trackId(PL[cur][4]);
  if (ctrl) {
    if (id) {
      ctrl.loadUri("spotify:track:" + id);
      if (play) ctrl.play();
    } else if (play) {
      setPlay(false);
      window.open(PL[cur][4], "_blank");
    }
  }
}
function setPlay(v) {
  playing = v;
  $("#playBtn").textContent = v ? "❚❚" : "▶";
  $("#disc").classList.toggle("playing", v);
  $("#eqb").classList.toggle("playing", v);
}
function upd() {
  $("#prog").style.width = Math.min(100, (pos / PL[cur][2]) * 100) + "%";
  $("#tCur").textContent = fmt(pos);
}
setInterval(() => {
  if (ctrl || !playing) return;
  pos++;
  if (pos >= PL[cur][2]) setTrack(cur + 1);
  upd();
}, 1000);
$("#playBtn").onclick = () => {
  if (ctrl) ctrl.togglePlay();
  else setPlay(!playing);
};
$("#next").onclick = () => {
  setTrack(cur + 1, true);
  if (!ctrl) setPlay(true);
};
$("#prev").onclick = () => {
  setTrack(cur - 1, true);
  if (!ctrl) setPlay(true);
};
$("#tracklist").onclick = (e) => {
  const li = e.target.closest("li");
  if (li) {
    setTrack(+li.dataset.i, true);
    if (!ctrl) setPlay(true);
  }
};
setTrack(0);
window.onSpotifyIframeApiReady = (API) => {
  const first = PL.findIndex((t) => trackId(t[4]));
  if (first < 0) return;
  API.createController(
    $("#spotifyEmbed"),
    {
      uri: "spotify:track:" + trackId(PL[first][4]),
      width: "100%",
      height: 80,
    },
    (c) => {
      ctrl = c;
      setTrack(first);
      c.addListener("playback_update", (e) => {
        const d = e.data || {};
        setPlay(!d.isPaused);
        if (d.duration) {
          PL[cur][2] = d.duration / 1000;
          $("#tDur").textContent = fmt(d.duration / 1000);
          pos = d.position / 1000;
          upd();
          if (
            !d.isPaused &&
            d.position >= d.duration - 800 &&
            endGuard !== cur
          ) {
            endGuard = cur;
            setTimeout(() => setTrack(cur + 1, true), 900);
          }
        }
      });
    },
  );
};
(() => {
  const sc = document.createElement("script");
  sc.src = "https://open.spotify.com/embed/iframe-api/v1";
  sc.async = true;
  document.body.appendChild(sc);
})();

/* ---------------- Japan time helpers ---------------- */
const TZ_OFFSET_H = 9; // Japan has no daylight saving
const jstDate = (y, m, d) =>
  new Date(Date.UTC(y, m - 1, d) - TZ_OFFSET_H * 3600e3);
const fromISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return jstDate(y, m, d);
};
const fmtJST = (dt) =>
  dt.toLocaleDateString("en-US", {
    timeZone: CONFIG.timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/* ---------------- Shared helpers ---------------- */
const pad = (v) => String(v).padStart(2, "0");
let tt;
function toast(m) {
  $("#toastTxt").textContent = m;
  $("#toast").classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(() => $("#toast").classList.remove("show"), 2400);
}

/* ---------------- Love letter ---------------- */
/* split letter into words once, for the soft writing animation */
$$(".letter p.w").forEach((p) => {
  p.innerHTML = p.textContent
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="wd">${w}</span>`)
    .join(" ");
});
function resetLetter() {
  $("#env").classList.remove("open", "gone");
  $("#letterWrap").classList.remove("open", "done");
  $("#tapHint").style.visibility = "visible";
  $$(".letter .wd").forEach((w) => {
    w.classList.remove("in");
    w.style.transitionDelay = "";
  });
}
function openLetter() {
  const env = $("#env");
  if (env.classList.contains("open")) return;
  env.classList.add("open");
  $("#tapHint").style.visibility = "hidden";
  const r = env.getBoundingClientRect();
  setTimeout(
    () => burst(r.left + r.width / 2, r.top + r.height * 0.4, 18),
    300,
  );
  setTimeout(() => {
    env.classList.add("gone");
    $("#letterWrap").classList.add("open");
    setTimeout(() => $("#letterWrap").classList.add("done"), 1700);
    setTimeout(
      () =>
        scrollTo({
          top: $(".letter").getBoundingClientRect().top + scrollY - 110,
          behavior: "smooth",
        }),
      950,
    );
    let t = 0;
    $$(".letter p.w").forEach((p) => {
      p.querySelectorAll(".wd").forEach((w) => {
        w.style.transitionDelay = t + "ms";
        t += 70;
      });
      t += 500;
    });
    setTimeout(
      () => $$(".letter .wd").forEach((w) => w.classList.add("in")),
      1500,
    );
    observeReveals($("#letterWrap"));
  }, 1500);
}
$("#env").onclick = openLetter;
$("#env").onkeydown = (e) => {
  if (e.key === "Enter") openLetter();
};
function burst(x, y, n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "bit";
    s.innerHTML = sprite(Math.random() < 0.65 ? "heart" : "star");
    s.style.width = 14 + Math.random() * 16 + "px";
    s.style.left = x + "px";
    s.style.top = y + "px";
    document.body.appendChild(s);
    const an = Math.random() * Math.PI * 2,
      d = 60 + Math.random() * 160;
    s.animate(
      [
        { transform: "translate(-50%,-50%)", opacity: 1 },
        {
          transform: `translate(${Math.cos(an) * d}px,${Math.sin(an) * d - 40}px)`,
          opacity: 1,
          offset: 0.6,
        },
        {
          transform: `translate(${Math.cos(an) * d}px,${Math.sin(an) * d + 60}px)`,
          opacity: 0,
        },
      ],
      { duration: 1400 + Math.random() * 700, easing: "steps(14)" },
    ).onfinish = () => s.remove();
  }
}
function openSecret() {
  const r = $("#heartBtn").getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 40);
  setTimeout(() => $("#modal").classList.add("open"), 400);
}
$("#surpriseBtn").onclick = openSecret;
$("#heartBtn").onclick = openSecret;
$("#closeModal").onclick = () => $("#modal").classList.remove("open");
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") $("#modal").classList.remove("open");
};
/* Photos: tap a frame to add a photo. It is saved in THAT browser only.
   For photos everyone sees: put the file in the Images folder and set src in PHOTOS at the top. */
let added = store.get("bday-photos-v1") || {};
let caps = store.get("bday-captions-v1") || {};
function renderGallery() {
  $("#gallery").innerHTML = PHOTOS.map((p, i) => {
    const src = p.src || added[i];
    return `<div class="ph"><label class="slot">${p.src ? "" : '<input type="file" accept="image/*" data-i="' + i + '">'}${src ? `<img src="${src}" alt="">` : `<span><span style="display:block;width:40px;margin:0 auto 10px">${sprite("camera")}</span>TAP TO ADD<br>A PHOTO</span>`}</label>${!p.src && added[i] ? `<button class="ph-del" data-i="${i}" aria-label="Remove photo">x</button>` : ""}<div class="cap" contenteditable="true" spellcheck="false" data-i="${i}" title="Tap to write your memory"></div></div>`;
  }).join("");
  $$("#gallery .cap").forEach(
    (c) => (c.textContent = caps[c.dataset.i] ?? PHOTOS[c.dataset.i].caption),
  );
}
$("#gallery").addEventListener("input", (e) => {
  const c = e.target.closest(".cap");
  if (c) {
    caps[c.dataset.i] = c.textContent.trim();
    store.set("bday-captions-v1", caps);
  }
});
$("#gallery").addEventListener("keydown", (e) => {
  if (e.target.closest(".cap") && e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
});
$("#gallery").addEventListener("focusout", (e) => {
  if (e.target.closest(".cap")) toast("Memory saved ♥");
});
function shrink(file) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const m = 900,
        k = Math.min(1, m / Math.max(img.width, img.height)),
        c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      res(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}
$("#gallery").addEventListener("change", async (e) => {
  const inp = e.target.closest("input[type=file]");
  if (!inp || !inp.files[0]) return;
  try {
    const d = await shrink(inp.files[0]);
    added[inp.dataset.i] = d;
    if (!store.set("bday-photos-v1", added))
      toast("Photo shown, but this browser could not save it");
    else toast("Photo added ♥");
    renderGallery();
  } catch (err) {
    toast("Sorry, that photo could not be opened");
  }
});
$("#gallery").addEventListener("click", (e) => {
  const d = e.target.closest(".ph-del");
  if (!d) return;
  e.preventDefault();
  delete added[d.dataset.i];
  store.set("bday-photos-v1", added);
  renderGallery();
});
renderGallery();
setInterval(() => {
  if (
    current === "wishes" &&
    !document.hidden &&
    $("#env").classList.contains("open")
  )
    burst(Math.random() * innerWidth, Math.random() * innerHeight * 0.6, 2);
}, 2200);

go();

/* ---------------- Guide for Wyne ---------------- */
function openGuide() {
  $("#guide").classList.add("open");
}
function maybeGuide() {
  let seen = false;
  try {
    seen = localStorage.getItem("guide-seen") === "1";
  } catch (e) {}
  if (!seen)
    setTimeout(() => {
      if (current === "home") openGuide();
    }, 2200);
}
$("#guideGo").onclick = () => {
  $("#guide").classList.remove("open");
  try {
    localStorage.setItem("guide-seen", "1");
  } catch (e) {}
};
$("#guide").onclick = (e) => {
  if (e.target.id === "guide") $("#guideGo").click();
};
$("#helpBtn").onclick = openGuide;

/* ---------------- Lock Birthday Wishes until her birthday (Japan time) ---------------- */
const unlockAt = fromISO(CONFIG.wishesOpen);
const isLocalPreview = ["localhost", "127.0.0.1", ""].includes(
  location.hostname,
);
let previewing = false;
const wishesLocked = () => Date.now() < unlockAt && !previewing;
$("#lockDate").textContent = fmtJST(unlockAt);
if (isLocalPreview) $("#previewBtn").hidden = false;
$("#previewBtn").onclick = () => {
  previewing = true;
  updateLock();
};
function updateLock() {
  const L = wishesLocked();
  $("#wishes").classList.toggle("locked", L);
  const tab = $('#links a[data-p="wishes"]');
  tab.textContent = L ? "Birthday Wishes 🔒" : "Birthday Wishes";
  movePill();
  if (L) {
    const s = Math.max(0, Math.floor((unlockAt - Date.now()) / 1000));
    $("#lockcd").innerHTML = [
      [Math.floor(s / 86400), "DAYS"],
      [Math.floor((s % 86400) / 3600), "HRS"],
      [Math.floor((s % 3600) / 60), "MIN"],
      [s % 60, "SEC"],
    ]
      .map(([v, l]) => `<div><b>${pad(v)}</b><small>${l}</small></div>`)
      .join("");
  }
}
let wasLocked = wishesLocked();
setInterval(() => {
  const L = wishesLocked();
  if (current === "wishes" || L !== wasLocked) {
    updateLock();
    if (wasLocked && !L && current === "wishes") {
      resetLetter();
      observeReveals($("#wishes"));
      toast("Your letter is open! Happy Birthday ♥");
    }
  }
  wasLocked = L;
}, 1000);
updateLock();
