import shell from "shelljs";
import log4js from "log4js";

import watch from "./watch";
import synchronize from "./synchronize";

const log = log4js.getLogger( "index" );

export function overlay( options, destination, sources ){
    
    const 
        watcher      = watch( options, sources ),
        synchronizer = synchronize( options, destination, sources );
    
    watcher
        .on( "synchronize", synchronizer :: synchronizer.synchronize )
        .on( "error", synchronizer :: synchronizer.error );
    
    return { watcher, synchronizer };
    
}

export function cli( program, $arguments ){
    
    const { argv } = program
        .usage( "$0 [options] <destination> <sources...>", "", ( yargs ) => {
        
            yargs
                .options({
                    
                    "v": {
                        alias: "verbose",
                        type: "count",    
                                            
                    }
                    
                })
                .positional( "destination", {
        
                    type: "string",
                    demandOption : true,
                    nargs: 1
        
                })
                .positional( "sources", {
        
                    type: "array",
                    demandOption : true,
        
                })
            
        })
        .help( );
    
    log.debug( argv );
    
    return Promise
        .resolve( argv )
        .then( ( command_arguments ) => {
    
            if( 0 !== shell.which( "fswatch" ).code ) throw new Error( "fswatch couldn't be found in path" );
            if( 0 !== shell.which( "rsync" ).code ) throw new Error( "rsync couldn't be found in path" );
    
            const { destination, sources } = command_arguments;
            
            return overlay( null, destination, sources );
    
        })
        .catch(
            
            ( error ) => {
                log.error( error );
                process.exit( 1 );
            }
    
        );
        
}