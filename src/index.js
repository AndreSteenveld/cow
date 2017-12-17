import shell from "shelljs";

import watch from "./watch";
import synchronize from "./synchronize";

export function overlay( options, destination, sources ){
    
    const 
        watcher      = watch( options, sources ),
        synchronizer = synchronize( options, destination, sources );
    
    watcher
        .on( "synchronize", synchronize.synchronize )
        .on( "error", synchronize.error );
    
    return { watcher, synchronizer };
    
}

export function cli( program, $arguments ){
    
    const { argv } = program
        .usage( "$0 <destination> <sources...>", "", ( yargs ) =>
        
            yargs
                .positional( "destination", {
        
                    type: "string",
                    demandOption : true,
                    nargs: 1
        
                })
                .positional( "sources", {
        
                    type: "array",
                    demandOption : true,
        
                })
        
        )
        .help( );
    
    return Promise
        .resolve( argv )
        .then( ( command_arguments ) => {
    
            if( 0 !== shell.which( "fswatch" ).code ) throw new Error( "fswatch couldn't be found in path" );
            if( 0 !== shell.which( "rsync" ).code ) throw new Error( "rsync couldn't be found in path" );
    
            const { destination, sources } = command_arguments;
            
            return overlay( null, destination, sources ).toPromise( );
    
        })
        .catch(
            
            ( error ) => {
                console.error( error );
                process.exit( 1 );
            }
    
        );
        
}