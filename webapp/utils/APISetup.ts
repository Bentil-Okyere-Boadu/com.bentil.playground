import config from "./config";

export const fetchAPI = (sEndpoint: string, sMethod: string, oBody?: {}) : Promise<Response> => {
    const Config = new config();
    return fetch(`${Config.getBaseUrl()}${sEndpoint}`, {
        method: sMethod,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${Config.getAccessToken()}`
        },
        body: JSON.stringify(oBody)
    })
}