# Happy Birthday Wyne ♥

A little pixel-art birthday website, built block by block.

## Pages
- **Login**: username `Wyne`
- **Home**: welcome and a short guide
- **Songs**: "Our Songs" playlist (plays with Spotify) and "Songs You Might Love"
- **Photobooth**: take a photo with the camera (or upload one) inside a decorated pixel frame, then save it. Photos stay on the device.
- **Birthday Wishes**: a letter that stays locked until 00:00, 9 January 2027 (Japan time)

## Files
- `index.html`: the pages and text
- `style.css`: colours and design
- `script.js`: animations, login, music player and letter lock
- `photobooth.js`: camera, photo frames and saving
- `Images/`: photos for the memory frames (names are case-sensitive)

## Easy changes (top of `script.js`)
- `CONFIG`: name, birth year, Japan time zone, unlock date
- Photobooth frames: `FRAMES` in `photobooth.js`; sticker words (love you, Thel Thel...): `WORDS` in `photobooth.js`
- `PHOTOS`: add `src: "Images/photo1.jpg"` to show a photo to everyone
- `LOGIN`: username, password and wrong-password message
- `OUR_PLAYLIST` and `SONGS`: songs and Spotify links

## Publish with GitHub Pages
1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
