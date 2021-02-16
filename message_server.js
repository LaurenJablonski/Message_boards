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


    function getMessagesFromDB(){

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
    }

    if (request.method === 'GET' && request.url === '/api/item' ) {
        getMessagesFromDB();

    };

    if (request.method === 'POST' && request.url === '/api/item') {

        let data = []; //the new item that's being added

        request.on('data', chunk => {
            data += chunk;
        })

        request.on('end', () => {

            var data1 = JSON.parse(data);

            console.log("THE NEW ITEM IS: " + data1);
            console.log("THE MESSAGE OF THE NEW ITEM IS: " + data1.message);


            var newMessage = data1.message;
            var newName = data1.username;

            var sql= 'INSERT INTO newMessages(message, username)'
            sql += 'VALUES(?,?)'

            DB.run(sql, [newMessage,newName], function(error,rows) {
                if (error) {
                    console.log(error)
                }
                console.log("Last ID: " + this.lastID)
                console.log("# of Row Changes: " + this.changes)
                getMessagesFromDB();
            });




        })


    };

    if (request.method === 'DELETE') {

        var sql= 'DELETE FROM newMessages WHERE id = (?)'

        let id = 11;

        DB.run(sql, id, function(error,rows) { //where the id here will be teh id of the incoming message you want to delete in this delete request.
            if (error) {
                console.log(error)
            }
            console.log(`Row(s) deleted ${this.changes}`);

            getMessagesFromDB();
        });

};






}).listen(8000, function(){
    console.log("server listening on port 8000");
});













