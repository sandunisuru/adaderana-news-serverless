import { handlerPath } from '@libs/handlerResolver';
export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            schedule: {
                rate: "rate(2 hours)"
            }
        }
    ]
};
//# sourceMappingURL=index.js.map