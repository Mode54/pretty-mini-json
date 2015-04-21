#!/usr/bin/env node

var
    fs = require("fs"),
    program = require("commander"),
    pkgJSON = require("./package.json"),
    stdin = process.stdin,
    stdinData = "",
    prettify = false,
    verbose = false;

program
    .version(pkgJSON.version)
    .usage("[options] [file ...]")
    .description("A simple CLI tool to shrink/minify or prettify JSON data.")
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

message("Check for file paths...");

if(stdin.isTTY){
    if(program.args){

        message("Found file paths: " + program.args);

        program.args.forEach(function(arg){

            message("Reading file: " + arg);

            fs.readFile( arg, function (err, data) {

                if(err){
                    console.error("Can't read file: " + arg);
                    process.exit(1);
                }

                prettyMiniIt(data.toString());

            });

        });

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

function prettyMiniIt(data){
    var jsonData, output;

    try{
        jsonData = JSON.parse(data);
    }
    catch(e){
        console.error("Can't parse JSON data");
        console.error(e);
        process.exit(1);
    }

    output = prettify
        ? JSON.stringify(jsonData, null, 4)
        : JSON.stringify(jsonData);

    if(program.outputFile){
        message("Writing output file...");

        fs.writeFile(program.outputFile, output, function(err2){
            if(err2){
                console.error(err2);
                process.exit(1);
            }
            else{
                console.log("File saved as " + program.outputFile);
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
