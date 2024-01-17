import { config } from "./config";

export const fetchAPI = (sEndpoint: string, sMethod: string, oBody?: BodyInit) : Promise<Response> => {
    return fetch(`https://gorest.co.in/public/v2/${sEndpoint}`, {
        method: sMethod,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${config()._accessToken}`
        },
        body: oBody
    })
}