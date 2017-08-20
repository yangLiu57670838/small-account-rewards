"use strict";
const winston = require('winston');

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta'
    }
};

const log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: function() {
                return new Date().toISOString();
            },
            formatter: function(options) {
                // Return string will be passed to logger.
                return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ],
    levels: config.levels,
    colors: config.colors
});

exports.Log = (() => {
    const Log = this
    Log.create = () => {
        return log
    }
})();

