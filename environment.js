import "bluebird";

Promise.config({

    cancellation:    true,
    monitoring:      true,
    
    warnings:        false,
    longStackTraces: true,
    
});