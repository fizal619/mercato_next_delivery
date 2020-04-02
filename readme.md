# Simple Chrome Extension Boilerplate

This is a simple webpack-powered chrome extension boilerplate. The dist folder was generated with [Extensionizr](http://extensionizr.com/) and the webpack configuration is the bare minimum you need to bundle JavaScript packages and have modular code.

## How to use

- clone this repo
- `npm i`
- `npm run dev` for developing.
- Edit `manifest.json` and replace `https://www.example.com/*` with the actual website you want to inject JavaScript into.
- `npm run build` to bundle all your JavaScript files in production mode. Then give the `dist` folder to chrome.

