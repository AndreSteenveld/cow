import { execSync as exec } from "child_process";

import { Subject } from "rxjs/rx";
import log4js from "log4js";

const log = log4js.getLogger( "synchronizer" );


export class Synchronizer {
    
    subject = new Subject( );
    
    constructor( options, destination, sources ){
        
        const cp = exec( `cp -lR --verbose --preserve=all -t ${ destination } ${ sources.join( " " ) }` )
                
        for( const line of cp.toString( "utf8" ).split( "\n" ) )
            log.info( line );
            
        this.subject
            .catch( ( error ) => {
                
                log.error( error );
                
            })
            .debounce( ( ) => Promise.delay( 750 ) )
            .subscribe( ( ) => {
                
                const 
                    link_destinations = sources.map( ( source ) => `--link-dest="${ source }"` ).join( " " ),
                    rsync_sources     = sources.join( " " ),
                    rsync_command     = `rsync --itemize-changes --delete --recursive --hard-links ${ link_destinations } ${ rsync_sources } ${ destination }`;
            
                log.debug( rsync_command );
                
                const rsync = exec( rsync_command );
                
                for( const line of rsync.toString( "utf8" ).split( "\n" ) )
                    log.info( line );
                
            });
            
    
        log.info( "Synchronizer has been setup" );
            
    }
    
    synchronize( ){
    
        this.subject.next( );
        
    }
    
    error( ){
        
        this.subject.error( );
        
    }
    
}


export default function synchronize( options, destination, sources ){
    
    return new Synchronizer( options, destination, sources );
    
}