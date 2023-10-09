import { createApi, deleteApi } from './helpers/api/api.js'
import { createSchema, createCollectionFromAPI } from './helpers/api/schema.js'
import { getSwaggerJsonFromUrl } from './helpers/api/swagger.js'
import { getCollection, updateCollection } from './helpers/api/collections.js'
import { getApiIdByName, getFormattedCollection } from './helpers/common.js'
import { testScript } from './helpers/testScript.js'
import { exec } from 'child_process'
import dotenv from 'dotenv'

(async () => {
    dotenv.config()

    const apiEndpoint = process.env.API_ENDPOINT;
    const apiSwaggerUrl = process.env.API_SWAGGER_URL;
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;
    const apiTitle = process.env.API_TITLE;
    const swaggerUrl = apiEndpoint + apiSwaggerUrl;
    const workspaceId = process.env.WORKSPACE_ID;

    await getApiIdByName(apiTitle, workspaceId, apiUrl).then(async (apiId) => {
        if (apiId != undefined) {
            await deleteApi(apiId, apiUrl)
            const createApiResponse = await createApi(apiTitle, workspaceId, apiUrl);
            apiId = createApiResponse.id;
        }
        if (apiId == undefined) {
            const createApiResponse = await createApi(apiTitle, workspaceId, apiUrl);
            apiId = createApiResponse.id;
        }

        await getSwaggerJsonFromUrl(apiEndpoint + apiSwaggerUrl).then(async (swaggerJson) => {
            await createSchema('openapi:3', swaggerJson, apiId, apiUrl).then(async () => {
                await createCollectionFromAPI(apiTitle, apiId, apiUrl).then(async (createdCollectionResponseData) => {
                    const collectionId = createdCollectionResponseData.id;
                    await getCollection(collectionId, apiId, apiUrl).then(async (collection) => {
                        const formattedCollection = getFormattedCollection(collection, testScript, apiEndpoint, swaggerUrl)
                        await updateCollection(collectionId, formattedCollection, apiUrl)

                        exec('newman run "https://api.getpostman.com/collections/' + collectionId + '?apikey=' + apiKey + '" -r "htmlextra,cli" --insecure --reporter-htmlextra-export ./results/report.html',
                            function (error, stdout, stderr) {
                                console.log('stdout: ' + stdout);
                                console.log('stderr: ' + stderr);
                                if (error !== null) {
                                    console.log('exec error: ' + error);
                                    process.exit(1);
                                }
                            });
                    })
                })
            })
        })
    })
})();