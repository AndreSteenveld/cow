#!/bin/sh
":" //# ; [ "./node_modules/.bin/babel-node" ] && exec /usr/bin/env ./node_modules/.bin/babel-node "$0" "$@" || exec /usr/bin/env node "$0" "$@" ;

require( "./environment" );
require( "./src" ).cli( require( "yargs" ), process.argv );
