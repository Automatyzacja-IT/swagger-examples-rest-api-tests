import { getAllApis } from './api/api.js';

export async function getApiIdByName(apiTitle, workspaceId, apiUrl) {
    let apiId;
    const apis = await getAllApis(workspaceId, apiUrl);
    for (var i = 0; i < apis.apis.length; i++) {
        if (apis.apis[i].name == apiTitle) {
            apiId = apis.apis[i].id;
        }
    }
    return apiId;
}
export function getFormattedCollection(collection, testScript, apiEndpoint, swaggerUrl) {
    const addedTestScript = Object.assign(collection, testScript);

    let baseURL = apiEndpoint;

    let collectionVariables = {
        "variable": [
            {
                "key": "baseUrl",
                "value": baseURL
            },
            {
                "key": "openAPISchemaUrl",
                "value": swaggerUrl
            }
        ]
    };

    const addedTestScriptAndVariables = Object.assign(addedTestScript, collectionVariables);
    const finalCollection = {
        "collection": addedTestScriptAndVariables,
    };

    return finalCollection;
}