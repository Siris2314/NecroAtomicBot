# SoundCloud Scraper

☁️ Get basic informations about a song from a Soundcloud URL.

## Installation

```sh
npm install soundcloud-scraper --save
```

## TO-DO

* Support for SoundCloud playlists.
* Support for SoundCloud albums.
* Support for SoundCloud search.
* Add library tests (with `jest` or `mocha`).

## Example

```js
const scraper = require('soundcloud-scraper');

console.log(scraper.validateURL('https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release'));
// true
console.log(scraper.validateURL('https://google.com'));
// false

scraper.getSongInfo('https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release').then(console.log);
/*
{
  title: 'Alan Walker - Fade [NCS Release]',
  author: {
    name: 'NCS',
    followers: 1299216,
    verified: false,
    createdAt: 2012-04-29T12:00:22.000Z,
    avatarURL: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-large.jpg',
    profile: 'https://soundcloud.com/nocopyrightsounds'
  },
  duration: 264000,
  genre: 'Electro House',
  playCount: 42973193,
  commentsCount: 16936,
  likeCount: 616538,
  thumbnail: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-t500x500.jpg',
  publishedAt: 2014-11-19T16:40:24.000Z
}
*/
```
