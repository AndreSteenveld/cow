import child_process from "child_process";
import EventEmitter from "eventemitter3";
import log4js from "log4js";

const log = log4js.getLogger( "watch" ); 

export class Watcher extends EventEmitter {
    
    constructor( options, sources ){

        super( );
        
        const watcher = child_process.spawn( "fswatch", [ "--directories", "--event-flags", "--one-per-batch", "--event=IsFile", ...sources ] );
        
        process.once( "exit", ( ) => watcher.kill( ) );
        
        watcher.once( "error", ( error ) => {

            log.error( error );
            process.exit( 1 );

        });
        
        watcher.stdout.on( "data", ( data ) => {

            this.emit( "synchronize" );

        });
        
    }
    
}

export default function watch( options, sources ){
    
    return new Watcher( options, sources );
    
}