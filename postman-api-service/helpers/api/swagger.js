import { Agent } from 'https';
import axios from 'axios';

export async function getSwaggerJsonFromUrl(url) {
    const agent = new Agent({
        rejectUnauthorized: false
    });
    const apiRes = await axios.get(url, { httpsAgent: agent });
    return apiRes.data;
}