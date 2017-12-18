import "bluebird";
import log4js from "log4js";

log4js.configure({

    levels: { 

        //
        // Syslog levels and values taken from wikipedia: https://en.wikipedia.org/wiki/Syslog
        // Due to the way how log4js is implemented the value for a panic condition can't be 0 as it is falsy.
        //
        emerg     : { value: 7, colour: "red" },
        emergency : { value: 7, colour: "red" },
        panic     : { value: 7, colour: "red" },
        
        alert : { value: 6, colour: "yellow" },
        
        crit     : { value: 5, colour: "red" },
        critical : { value: 5, colour: "red" },
        
        error : { value: 4, colour: "red" },
        
        warning : { value: 3, colour: "red" },
        warn    : { value: 3, colour: "red" },
        
        notice : { value: 2, colour: "yellow" },
        info   : { value: 1, colour: "green" },
        debug  : { value: -1, colour: "blue" },
        
    
    },
    
    appenders: { 
        
        stderr  : { type : "stderr" },
        console : { type : "console" },
        stdout  : { type : "stdout" } 
    
    },
    
    categories: { 
    
        default: { appenders: [ "stderr" ], level: "debug" }
    
    }
    
});

Promise.config({

    cancellation:    true,
    monitoring:      true,
    
    warnings:        true,
    longStackTraces: true,
    
});