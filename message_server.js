const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do
var static = require('node-static');
var file = new(static.Server)('.');
const sqlite3 = require('sqlite3').verbose()
const DB_PATH = './sqlite.db'
const fetch = require("node-fetch");

const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')


    DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
        if (error){
            console.error("Pragma statement didn't work.")
        } else {
            console.log("Foreign Key Enforcement is on.")
        }
    });
});

//here we create the table to store hte messages - note changed name to newMessages as added a new column for the name
dbSchema = `CREATE TABLE IF NOT EXISTS newMessages(
            id INTEGER NOT NULL PRIMARY KEY,
            message TEXT NOT NULL,
            username TEXT NOT NULL
        );`

DB.exec(dbSchema, function(err){
        if (err) {
            console.log("the error is" + err)
        }
});

http.createServer(function(request,response){//create a server using the http library you just imported and call the create server function on this object. The create server function takes a function that has 2 parameters, request and response which is going to handle all the activity on our server. SO everytime someone requests a page on our server, it is going to call this function.
    if (request.method == 'GET' && !(request.url.includes('api'))){
            file.serve(request, response);
        }
    const {headers, method, url} = request; //this request object is an instant of an Incoming Message
    console.log(request.method);

    if (request.method === 'GET' && request.url === '/api/item' ) {

            var sql = 'SELECT *'
            sql += 'FROM newMessages '

            DB.all(sql, [], function (error, rows) {
                if (error) {
                    console.log("errrorrrrr");
                    console.log("the error is" + error)
                }

                var showRows = JSON.stringify(rows);
                //console.log("THE LENGTH IN GET REQUEST IS: " + JSON.parse(showRows).length);
                response.write(showRows);
                response.end();
                return showRows;


            });



    };

    if (request.method === 'POST' && request.url === '/api/item') {

        var sql = 'SELECT *'
        sql += 'FROM newMessages '

        DB.all(sql, [], function (error, rows) {
            if (error) {
                console.log("errrorrrrr");
                console.log("the error is" + error)
            }

            var showRows = JSON.stringify(rows);
            function calculateNewIndex(){

                var newItem = showRows;


                var length = JSON.parse(newItem).length; //finds the length of the items in the dictionary
                console.log("the length is" + length);
                var findLastItem = rows[length - 1]; //finds the index of hte last item in the dictionary
                console.log("the last item is" + JSON.stringify(findLastItem));
                newItem['ID'] = findLastItem['ID'] + 1; //adds one to the last index in the dictionary to give you the index of the new item being added to hte dictionary
                console.log("the id of the new item is" + newItem['ID']);
                return newItem

            }

            let data = []; //the new item that's being added

            request.on('data', chunk => { //request object is a stream => stream allows us to process data  by listening to the streams data and end events
                data += chunk;
            })

            request.on('end', () => {
                console.log("data coming in to POST request is: " + data);
                newItem = calculateNewIndex();



                // var sql= 'INSERT INTO newMessages (message, username)'
                // sql += 'VALUES (? ,?),', messageToAdd, nameToAdd
                //
                // DB.run(sql, [message, username], function(error,rows) {
                //     if (error) {
                //         console.log(error)
                //     }
                //     console.log("Last ID: " + this.lastID)
                //     console.log("# of Row Changes: " + this.changes)
                //     var showRows = JSON.stringify(rows);
                //     response.write(showRows);
                //     response.end();
                //     return showRows;
                //
                // });


            })


        });





    }
}).listen(8000, function(){
    console.log("server listening on port 8000");
});













