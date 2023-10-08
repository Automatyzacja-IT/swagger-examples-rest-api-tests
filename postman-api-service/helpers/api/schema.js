import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.API_KEY

export async function createSchema(type, schema, apiId, apiUrl) {
    let data = {
        "type": type,
        "files": [
            {
                "path": "swagger.json",
                "content": JSON.stringify(schema, null, 4)
            }
        ]
    };
    const apiRes = await axios.post(apiUrl + '/apis/' + apiId + '/schemas', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.api.v10+json',
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}
export async function createCollectionFromAPI(collectionTitle, apiId, apiUrl) {
    let data = {
        "operationType": "GENERATE_FROM_SCHEMA",
        "name": collectionTitle,
        "options": {
            "requestParametersResolution": "Example",
            "exampleParametersResolution": "Example",
            "parametersResolution": "Example",
        }
    };

    const apiRes = await axios.post(apiUrl + '/apis/' + apiId + '/collections', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.api.v10+json',
            'X-API-Key': apiKey,
        }
    });
    return apiRes.data;
}