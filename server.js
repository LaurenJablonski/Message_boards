const http = require('http'); // you get the http library in node.js. Note you have to use require in node.js in order to get a library. This includes the http library into our code inside the http variable
const fs = require('fs');// this allows us to read another file in our code. this variable fs allows us to do all the file handling that we need to do


var dictionary = {
    "items": [

        {
            "ID": 1,
            "Message": "Message 1",

        },
        {
            "ID": 2,
            "Message": "message 2",


        }

    ]
};
const server = http.createServer((request,response) => {//create a server using the http library you just imported and call the create server function on this object. The create server function takes a function that has 2 parameters, request and response which is going to handle all the activity on our server. SO everytime someone requests a page on our server, it is going to call this function.

    const {headers, method, url} = request; //this request object is an instant of an Incoming Message
    console.log(request.method); //having this here tells you what the original request is and it is OPTIONS
    const items = require("./message_dictionary"); //this reads the json file


    if (request.method === 'OPTIONS') {

        var handleCors = function (request, response) {
            console.log("its a preflight request");
            response.setHeader('Access-Control-Allow-Origin', '*'); // allows any origin to access the server
            response.setHeader('Access-Control-Allow-Headers', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
            response.setHeader('Content-Type', 'text/html');
            response.statuscode = 404;
            response.end();
            return response; //doing return response shows you the server response
        }
        handleCors(request, response); //Without this the initial request is OPTIONS, but with it the initial request is GET
    }


    if (request.method === 'GET' && request.url === '/item') {
        console.log("hello world");
        response.setHeader('Access-Control-Allow-Origin', '*');


        const responseBody = {
            //headers,
            //method,
            //url,
            body: items
        }

        response.write(JSON.stringify(responseBody))
        console.log(responseBody);

        response.end(); //end the response
        return responseBody;


    }

    if (request.method === 'POST') {
        response.setHeader('Access-Control-Allow-Origin', '*');

        let data = []; //the new item that's being added

        // let data = [
        //         {
        //             ID:3,
        //             Message: "happppyyyyyy birthdayyyyy"
        //         }
        //     ];

        request.on('data', chunk => { //request object is a stream => stream allows us to process data  by listening to the streams data and end events
            data += chunk;
            //console.log(data); the data here is the new item that needs to be added to the dictionary
        })
        request.on('end', () => {


            var newMessage = JSON.parse(data);
            var length = Object.keys(dictionary['items']).length;
            console.log(length);
            var findLastItem = dictionary['items'][length - 1];
            console.log(findLastItem);
            newMessage['ID'] = findLastItem['ID'] + 1;
            console.log(newMessage['ID']);

            console.log(dictionary);
            dictionary['items'].push(newMessage);
            console.log(dictionary);


            // var length = Object.keys(items).length; //finds the length of the items in the dictionary

            fs.writeFile("message_dictionary.json", JSON.stringify(items), err => {
                console.log("success writing to the dictionary")

            })


            response.statuscode = 200;

            response.end();


        })
    }
})


        // let data = [
        //     {
        //         ID:3,
        //         Message: "happppyyyyyy birthdayyyyy"
        //     }
        // ]; //the new item that's being added
        //
        // console.log(data);
        //
        //
        // //var newMessage = JSON.parse(data);
        //
        // items.push(data);
        //
        // fs.writeFile("message_dictionary.json", JSON.stringify(items), err => {
        //     console.log("success writing to the dictionary")
        //
        // })
        //
        //
        // response.statuscode = 200;
        //
        // response.end();


server.listen(8000,function(error) {//tells the server to listen on port 8000
    if (error) {
        console.log('something went wrong', error)
    } else {
        console.log('server is listening on port 8000')
    }
});









































