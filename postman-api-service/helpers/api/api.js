import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.API_KEY

export async function getAllApis(workspaceId, apiUrl) {
    const apiRes = await axios.get(apiUrl + '/apis?workspace=' + workspaceId, {
        headers: {
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}

export async function deleteApi(apiId, apiUrl) {
    const apiRes = await axios.delete(apiUrl + '/apis/' + apiId, {
        headers: {
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}

export async function createApi(apiTitle, workspaceId, apiUrl) {
    let data = {
        "name": apiTitle,
        "summary": "",
        "description": "",
        "workspaceId": workspaceId
    };

    const apiRes = await axios.post(apiUrl + '/apis?workspace=' + workspaceId, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.api.v10+json',
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}