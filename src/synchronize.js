import { Subject } from "rxjs/rx";

export class Synchronizer {
    
    subject = new Subject( );
    
    constructor( options, destination, sources ){
                
        this.subject
            .debounce( ( ) => Promise.delay( 750 ) )
            .subscribe( ( ) => {
                
                console.log( "File change" );
                
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