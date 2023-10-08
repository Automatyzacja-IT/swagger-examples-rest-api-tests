export var testScript = testScript = {
    "event": [
        {
            "listen": "prerequest",
            "script": {
                "type": "text/javascript",
                "exec": [
                    "let apiKey = pm.globals.get('Api-Key')",
                    "require('postman-collection').Header",
                    "pm.request.headers.add({ key: 'Api-Key', value: apiKey })",
                ]
            }
        },
        {
            "listen": "test",
            "script": {
                "type": "text/javascript",
                "exec": [
                    "pm.test(\"Status code is 2xx\", function() {",
                    "    pm.response.to.be.success;",
                    "});"
                ]
            }
        }
    ]
};