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
                
                log.debug( "file changes" );
                
            });
            
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