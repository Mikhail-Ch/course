const path = require("path");

globalThis.App = {};
globalThis.App.GetConfig = function localThis( pathToJSON ) {
	const callerRelativePath  = GetRelativePath();
	const requireRelativePath = path.resolve( callerRelativePath, `../${pathToJSON}` );

	const { caller } 		= localThis;
	const callerArguments 	= caller.arguments ?? [ { } ];
	const jsonData 			= require( requireRelativePath ) ?? {};

	return { ...jsonData, ...callerArguments[0] };
}

function GetRelativePath() {
	const currentCallsite 	= callsites()[2];
	const evalOriginPath 	= currentCallsite.getEvalOrigin();
	const parsedPath 		= evalOriginPath.slice(11, -1);

	return parsedPath;
}

function callsites() {
	const _prepareStackTrace 	= Error.prepareStackTrace;
	Error.prepareStackTrace 	= ( _, stack ) => stack;

	const stack 				= new Error().stack.slice( 1 );
	Error.prepareStackTrace 	= _prepareStackTrace;

	return stack;
}