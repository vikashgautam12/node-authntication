const {
    createLogger,format,transports

} = require("winston");
const  loglevels = {
    fatal : 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
}
const logger = createLogger({
    levels: loglevels,
    format: format.combine(format.timestamp(),format.json(),format.prettyPrint()) ,
    transports: [
        new transports.Console({}),
    ]
})
module.exports = logger;