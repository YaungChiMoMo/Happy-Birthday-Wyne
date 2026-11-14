# Happy Birthday Wyne ♥

A little pixel-art birthday website, built block by block.

## Pages
- **Login**: username `Wyne`
- **Home**: welcome and a short guide
- **Songs**: "Our Songs" playlist (plays with Spotify) and "Songs You Might Love"
- **Countdown**: counts down to 9 January (Japan time). Wyne can rename it and add notes.
- **Birthday Wishes**: a letter that stays locked until 00:00, 9 January 2027 (Japan time)

## Files
- `index.html`: the pages and text
- `style.css`: colours and design
- `script.js`: animations, login, countdown, music player and lock
- `Images/`: photos for the memory frames (names are case-sensitive)

## Easy changes (top of `script.js`)
- `CONFIG`: name, birthday, Japan time zone, unlock date
- `PHOTOS`: add `src: "Images/photo1.jpg"` to show a photo to everyone
- `LOGIN`: username, password and wrong-password message
- `OUR_PLAYLIST` and `SONGS`: songs and Spotify links

## Publish with GitHub Pages
1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
