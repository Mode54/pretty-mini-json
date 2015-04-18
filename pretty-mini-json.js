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
    .option("-p, --pretty", "prettify compressed JSON", "true")
    .option("-o, --outputFile <outputFile>", "output file name")
    .option("-v, --verbose", "", "true")
    .parse(process.argv);

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
