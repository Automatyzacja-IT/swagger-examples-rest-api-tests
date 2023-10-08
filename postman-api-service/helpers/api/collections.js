import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.API_KEY

export async function getCollection(collectionId, apiId, apiUrl) {
    const apiRes = await axios.get(apiUrl + '/apis/' + apiId + '/collections/' + collectionId, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.api.v10+json',
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}
export async function updateCollection(collectionId, data, apiUrl) {
    const apiRes = await axios.put(apiUrl + '/collections/' + collectionId, data, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}