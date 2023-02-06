import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  layers: [
    '${cf:adaderana-serverless-layers-dev.UtilitiesLayerExport}'
  ],
  events: [
    {
      schedule: "rate(2 hours)"
    }
  ]
}
