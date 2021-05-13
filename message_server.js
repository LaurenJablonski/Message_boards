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


dbSchema = `CREATE TABLE IF NOT EXISTS messagesForRecipient(
            id INTEGER NOT NULL PRIMARY KEY,
            recipientId NOT NULL,
            message TEXT NOT NULL,
            username TEXT NOT NULL
        );`

dbSchema = `CREATE TABLE IF NOT EXISTS user(
            id INTEGER NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );`

dbSchema = `CREATE TABLE IF NOT EXISTS messageboard(
            id INTEGER NOT NULL PRIMARY KEY,
            recipientId NOT NULL,
            title STRING NOT NULL,
            eventDate TEXT NOT NULL
        );`

DB.exec(dbSchema, function(err){
    if (err) {
        console.log("the error is" + err)
    }
});



http.createServer(function(request,response){
    if (request.method == 'GET' && !(request.url.includes('api'))){
        file.serve(request, response);
    }
    const {headers, method, url} = request;
    console.log(request.method);


    function getMessagesFromDB(id){
        var sql = 'SELECT *'
        sql += 'FROM messagesForRecipient WHERE recipientId = ' + id;

        DB.all(sql, [], function (error, rows) {
            if (error) {
                console.log("the error is" + error)
            }

            var showRows = JSON.stringify(rows);
            response.write(showRows);
            response.end();
            return showRows;


        });
    }




    if (request.method === 'GET' && request.url === '/api/newboard' ) {
        console.log("reaching GET request for newboard");
        var sql = 'SELECT *'
        sql += 'FROM user JOIN messageboard ON user.id = messageboard.recipientId'

        DB.all(sql, [], function (error, rows) {
            if (error) {
                console.log("errrorrrrr");
                console.log("the error is" + error)
            }

            var showRows = JSON.stringify(rows);
            response.write(showRows);
            response.end();
            return showRows;


        });

    };

    if (request.method === 'GET' && request.url.includes('/api/item?id=') ){

        var urlParams = new URLSearchParams(request.url);
        var idFromUrl = urlParams.get('/api/item?id');
        getMessagesFromDB(idFromUrl);

    };

    if (request.method === 'GET' && request.url.includes('/api/title?id=') ){

        var urlParams = new URLSearchParams(request.url);
        var idFromUrl = urlParams.get('/api/title?id');
        console.log("the id from the URL is:" + idFromUrl);


        var sql = 'SELECT * '
        sql += 'FROM messageboard WHERE recipientId = ' + idFromUrl

        DB.all(sql, [], function (error, rows) {
            if (error) {
                console.log("the error is" + error)
            }

            var showRows = JSON.stringify(rows);
            response.write(showRows);
            response.end();
            return showRows;


        });


    };





    if (request.method === 'POST' && request.url.includes('/api/item?id=')) {
        console.log("YOU ARE GETTING INTO THE POST REQUEST FOR /API/ITEM");

        var urlParams = new URLSearchParams(request.url);
        var idFromUrl = urlParams.get('/api/item?id');
        console.log("the id in the end of the url is: " + idFromUrl);

        let data = []; //the new item that's being added

        request.on('data', chunk => {
            data += chunk;
        })

        request.on('end', () => {

            var data1 = JSON.parse(data);
            var newMessage = data1.message;
            var newName = data1.username;
            // var recipientId = data1.recipientId

            var sql= 'INSERT INTO messagesForRecipient(recipientId,message, username)'
            sql += 'VALUES(?,?,?) '

            DB.run(sql, [idFromUrl,newMessage,newName], function(error,rows) {
                if (error) {
                    console.log(error)
                }
                console.log("# of Row Changes: " + this.changes)


            });

        })


    };

    if (request.method === 'POST' && request.url === '/api/newboard') {

        let data = []; //the new item that's being added

        request.on('data', chunk => {
            data += chunk;
        })

        request.on('end', () => {

            var data1 = JSON.parse(data);
            var birthday = data1.birthday;
            var recipient = data1.recipient;
            var title = data1.title;

            var sql= 'INSERT INTO user(recipient,title,birthday)'
            sql += 'VALUES(?,?,?)'

            DB.run(sql, [recipient,title,birthday], function(error,rows) {
                if (error) {
                    console.log(error)
                }
                console.log("Last ID: " + this.lastID)
                console.log("# of Row Changes: " + this.changes)

                var sql = 'SELECT *'
                sql += 'FROM user '

                DB.all(sql, [], function (error, rows) {
                    if (error) {
                        console.log("the error is" + error)
                    }

                    var showRows = JSON.stringify(rows);
                    response.write(showRows);
                    response.end();
                    return showRows;


                });
            });

        })


    };

    if (request.method === 'DELETE') {

        var sql= 'DELETE FROM messagesForRecipient WHERE recipientId = (?)'

        let id = 2;

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

//












