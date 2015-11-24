#!/usr/bin/env node

var
    fs = require("fs"),
    program = require("commander"),
    request = require("request"),
    pkgJSON = require("./package.json"),
    stdin = process.stdin,
    stdinData = "",
    prettify = false,
    verbose = false;

program
    .version(pkgJSON.version)
    .usage("[options] [file | url ...]")
    .description(pkgJSON.description)
    .option("-p, --pretty", "prettify JSON data", "true")
    .option(
        "-o, --outputFile <file>",
        "write output to <file> instead of stdout"
    )
    .option(
        "-v, --verbose",
        "makes stdout more verbose/talkative. Mostly useful for debugging.",
        "true"
    )
    .parse(process.argv);

// extra checks to avoid version & verbose conflict bug
if(!program.verbose && program.version && typeof program.version!="function"){
    console.log(program.version);
    process.exit(1);
}

if(program.pretty){ prettify = true; }
if(program.verbose){ verbose = true; }

message("Check for data source(s)...");

if(stdin.isTTY){
    if(program.args.length>0){

        message("Found data source(s): " + program.args);

        program.args.forEach(function(arg, indx){
            var readCallback;

            if(isValidURL(arg)){
                message("Requesting file: " + arg);

                request(
                    arg,
                    function(error, response, body){
                        if(!error && response.statusCode == 200){
                            prettyMiniIt(body);
                        }
                        else{
                            console.error("Can't retrieve file from: " + arg);
                            process.exit(1);
                        }
                    }
                );
            }
            else{
                message("Reading file ("+indx+"): " + arg);

                readCallback = function (err, data) {
                    if(err){
                        console.error("Can't read file: " + arg);
                    }
                    else if(indx>0){
                        prettyMiniIt(data.toString(), indx);
                    }
                    else{
                        prettyMiniIt(data.toString());
                    }
                }

                fs.readFile(arg, readCallback);
            }
        });
    }
    else{
        console.error("Missing source data.");
    }
}
else{

    message("Found standard input...");

    stdin.on(
        "data",
        function(chunk){
            stdinData += chunk;
        }
    );

    stdin.on(
        "end",
        function(){
            prettyMiniIt(stdinData);
        }
    );

}

function prettyMiniIt(data, suffix){
    var jsonData, output, outputFile;

    try{
        jsonData = JSON.parse(data);
    }
    catch(e){
        console.error("Can't parse JSON data");
        console.error(e);
        return;
    }

    output = prettify
        ? JSON.stringify(jsonData, null, 4)
        : JSON.stringify(jsonData);

    if(program.outputFile){
        message("Writing output file...");
        outputFile = program.outputFile;

        if(suffix){
            outputFile = outputFile.split(".");

            outputFile.splice(
                outputFile.length-1,
                0,
                suffix
            );

            outputFile = outputFile.join(".");
        }

        fs.writeFile(outputFile, output, function(err2){
            if(err2){
                console.error(err2);
                process.exit(1);
            }
            else{
                console.log("File saved as " + outputFile);
            }
        });
    }
    else{
        console.log(output);
    }
}

function message(msg){
    if(verbose){
        console.log(msg);
    }
}

function isValidURL(str){
	if(typeof str!=="string") return false;

	return (/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/).test(str);
}
