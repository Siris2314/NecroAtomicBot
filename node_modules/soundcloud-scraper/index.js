const fetch = require('node-fetch');
const JSDOM = require('jsdom').JSDOM;

const parseTime = (duration) => {
    const hours = duration.substr(2, 2);
    const minutes = duration.substr(5, 2);
    const seconds = duration.substr(8, 2);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
};

module.exports.validateURL = (link) => /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(link);

module.exports.getSongInfo = async (link) => {
    const res = await fetch(link);
    const sourceHTML = await res.text();
    const dom = new JSDOM(sourceHTML);
    const document = dom.window.document;
    const headerH1 = document.querySelector('header').children[0];
    const time = document.querySelector('header').children[1];
    const scripts = document.getElementsByTagName("script");
    const parsed = scripts[scripts.length - 1].textContent;
    const findFollowers = parsed.split('"followers_count":');

    return {
        title: headerH1.children[0].textContent,
        author: {
            name: headerH1.children[1].textContent,
            followers: parseInt(findFollowers[findFollowers.length - 1].split(',')[0]),
            verified: sourceHTML.match(/"verified":false/gi)[1] && sourceHTML.match(/"verified":false/gi)[1].includes("true"),
            createdAt: new Date(sourceHTML.split('"created_at":"')[sourceHTML.split('"created_at":"').length - 1].split('","')[0]),
            avatarURL: sourceHTML.split('"avatar_url":"')[sourceHTML.split('"avatar_url":"').length - 1].split('"')[0],
            profile: sourceHTML.split('"permalink_url":"')[sourceHTML.split('"permalink_url":"').length - 1].split('"')[0]
        },
        duration: parseTime(document.querySelector('meta[itemprop="duration"]').attributes.item(1).value),
        genre: document.querySelector('meta[itemprop="genre"]').attributes.item(1).value,
        playCount: parseInt(document.querySelectorAll('meta[property="soundcloud:play_count"]')[0].attributes.item(1).value),
        commentsCount: parseInt(document.querySelectorAll('meta[property="soundcloud:comments_count"]')[0].attributes.item(1).value),
        likeCount: parseInt(document.querySelectorAll('meta[property="soundcloud:like_count"]')[0].attributes.item(1).value),
        thumbnail: document.querySelectorAll('meta[property="og:image"]')[0].attributes.item(1).value,
        publishedAt: new Date(time.textContent)
    }
};
