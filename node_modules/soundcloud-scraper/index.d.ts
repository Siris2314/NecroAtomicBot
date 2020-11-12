declare module 'soundcloud-scraper' {

    namespace SouncloudScraper {
        interface SongData {
            title: string,
            author: {
                name: string,
                followers: number,
                verified: boolean,
                createdAt: Date,
                avatarURL: string,
                profile: string
            },
            duration: number,
            genre: string,
            playCount: number,
            commentsCount: number,
            likeCount: number,
            thumbnail: string,
            publishedAt: Date
        }

        function validateURL(link: string): boolean;
        function getSongInfo(link: string): Promise<SongData>;
    }

    export = SouncloudScraper;

}
