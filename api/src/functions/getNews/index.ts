import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    layers: [
        '${cf:adaderana-serverless-layers-dev.UtilitiesLayerExport}'
    ],
    events: [
        {
            http: {
                method: 'get',
                path: 'adaderana/get',
                cors: {
                    origin: 'google.com',
                    headers: ["Content-Type"],
                    allowCredentials: false
                }
            }
        }
    ]
}
