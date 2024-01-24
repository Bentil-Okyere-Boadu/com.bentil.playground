/**
 * @namespace com.bentil.playground.utils
 */
export default class config {
    private baseURL: string;
    private accessToken: string;
        constructor() {
            this.baseURL = "https://hosanna-methodist-api.vercel.app/api/";
            this.accessToken = JSON.parse(localStorage.getItem('HAT'));
        }

        public getBaseUrl () : string {
            return this.baseURL;
        }
        public getAccessToken () : string {
            return this.accessToken;
        }

        public setAccessToken (sToken: string) {
            localStorage.setItem('HAT', JSON.stringify(sToken));
            this.accessToken = sToken
        }
    
}