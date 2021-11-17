const axios = require("axios").default;

const BASE_URL = "https://graphql.anilist.co";

/**
 * Searches Anilist for the specified anime
 * @param {String} title Anime title
 * @param {Number} count Number of results to return
 */
async function searchAnime(title, count) {
	return searchMedia("ANIME", title, count);
}

/**
 * Searches Anilist for the specified manga
 * @param {String} title Manga title
 * @param {Number} count Number of results to return
 */
async function searchManga(title, count) {
	return searchMedia("MANGA", title, count);
}

/**
 *
 * @param {string} media ANIME or MANGA
 * @param {string} title Media title
 * @param {Number} count Number of results to return
 */
async function searchMedia(media, title, count) {
	const query = `
	query{
		Page(page: 1, perPage: ${count}) {
			media(sort: SEARCH_MATCH, type: ${media}, search:"${title}") {
				title {
					romaji
				}
				coverImage{
					extraLarge
				}
				description(asHtml:false)
        genres
        meanScore
        siteUrl
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        episodes
        duration
        isAdult
        trailer {
          id
          site
        }
			}
		}
	}
  `;

	try {
		const response = await axios.post(BASE_URL, { query });
		return response.data.data.Page.media;
	}
	catch (e) {
		const message = e.response ? e.response.data.errors[0].message : e.message;
		throw new Error(message);
	}
}

module.exports = {
	searchAnime,
	searchManga,
};
