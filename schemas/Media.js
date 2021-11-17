const striptags = require("striptags");

class Media {
	/**
   *
   * @param {String} title Medial title
   * @param {String} image Url of cover image. Medium size
   * @param {String} description Description
   * @param {String[]} genres A list of genres
   * @param {Number} meanScore Mean score on Anilist
   * @param {String} anilistUrl Url on Anilist
   * @param {String} status Current releasing status
   * @param {String} startDate First official release date of the media
   * @param {String} endDate Last official release date of the media
   * @param {Number} episodes The number of episode the media had when it was completed.
   * @param {Number} duration The length of each episode
   * @param {Boolean} isAdult If the media is intended for 18+ audiences
   * @param {String} trailerId The ID of the trailer
   * @param {String} trailerSite The site hosting the trailer
   */
	constructor(
		title,
		image,
		description,
		genres,
		meanScore,
		anilistUrl,
		status,
		startDate,
		endDate,
		episodes,
		duration,
		isAdult,
		trailerId,
		trailerSite,
	) {
		this.title = title;
		this.image = image;
		this.description = striptags(description);
		this.genres = genres.join().replaceAll(",", " | ");
		this.meanScore = meanScore;
		this.anilistUrl = anilistUrl;
		this.status = status;
		this.startDate = startDate;
		this.endDate = endDate;
		this.episodes = episodes;
		this.duration = duration;
		this.isAdult = isAdult;
		if (trailerSite == "youtube") {
			this.trailerUrl = `https://www.youtube.com/watch?v=${trailerId}`;
		}
		else if (trailerSite == "dailymotion") {
			this.trailerUrl = `https://www.dailymotion.com/video/${trailerId}`;
		}
	}
}

module.exports = Media;
