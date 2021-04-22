var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user_inputs_new_message');

var arrayOfItemIDs = []

function getToken() {
    return 'lauren2';
}

function makeRequest(method, resource, body, successCb, errorCb) {
    var baseUrl = 'http://localhost:8000';
    //console.log(JSON.stringify(body));
    $.ajax({ //ajax= techinique for accessing web servers from a webpage so this is where the connection is being made to the API. It sends teh http requests easily and quickly as you don't have to reload the page.
        method: method,
        url: baseUrl + resource,
        headers: {'token': getToken()},
        data: body ? JSON.stringify(body) : null,
        success: successCb,//on success then call successCb
        error: errorCb//on error then call errorCb
    });
}

function getBoards(data) {

    makeRequest('GET','/api/newboard',null, function (data) {// what I seem to put as the body here (null) is appended to the end of the http so it becomes http://localhost:8080/item?%22hello%22
        console.log("this is get boards");
        console.log("the data being received is: " + data);
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        displayBoards(jsonData);

    }, function (error) {
        console.log("An error occured in getItems");
        console.log("the error is" + error);
        callback([]);
    });
}

function postMessageboard(){

    var recipient = document.getElementById("nameTextboxID").value;//gets the data entered by the user
    var birthday =  document.getElementById("dateID").value;

    console.log("reaching postmessageboard function");
    var body = {'recipient': recipient, 'birthday': birthday};

    makeRequest('POST', '/api/newboard', body, function (data) {

        console.log("is making the post request");


    }, function () {


    });
}


function displayBoards(data) {
    console.log("you are reaching displayBoards");
    var list = document.getElementById("displayboards"); //this is where we want to show the dashboard white boxes

    console.log("you are reaching displayBoards");
    console.log("the data is" + data);

    var lengthOfMessages = data.length;
    console.log("the lengths are :" + lengthOfMessages);
    var element = "";
    for (var i = 0; i < lengthOfMessages; i++) {

        console.log("reaching for loop");

        element += '<div id="addNewBoards"> ';
        element += '<div id="Modal" onclick="location.href=\'messageboard_index\' + \'/id/\' + data[i][\'id\']">';
        element += '<div id="formTitle">' + data[i]['recipient'] + '</div>';
        // element += '<img id ="profile_pic" src="images/ellie_and_paola.png" width="275" height="250">'
        element += data[i]['birthday'];
        element += '    </div>'
        console.log(list);


    };
    list.innerHTML = element;
}

function getItems(data,uid) {

    makeRequest('GET','/api/item',null, function (data,uid) {// what I seem to put as the body here (null) is appended to the end of the http so it becomes http://localhost:8080/item?%22hello%22
        console.log("this is get items");
        console.log("the data being received is: " + data);
        console.log("the UID of the recipient is: " + uid);
        var jsonData = JSON.parse(data);
        console.log("the data1 is: " + jsonData[1].message);
        showItems(jsonData);

    }, function (error) {
        console.log("An error occured in getItems");
        console.log("the error is" + error);
        callback([]);
    });
}



$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
    getBoards();
});