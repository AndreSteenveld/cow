import { Subject } from "rxjs/rx";
import log4js from "log4js";

const log = log4js.getLogger( "synchronizer" );


export class Synchronizer {
    
    subject = new Subject( );
    
    constructor( options, destination, sources ){
                
        this.subject
            .catch( ( error ) => {
                
                log.debug( error );
                
            })
            .debounce( ( ) => Promise.delay( 750 ) )
            .subscribe( ( ) => {
                
                log.debug( "file changes" );
                
            });
            
    }
    
    synchronize( ){
        debugger;
        this.subject.next( );
        
    }
    
    error( ){
        
        this.subject.error( );
        
    }
    
}


export default function synchronize( options, destination, sources ){
    
    return new Synchronizer( options, destination, sources );
    
}