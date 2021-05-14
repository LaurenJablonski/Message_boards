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

var button = document.getElementById("add_new_board");
var myDiv = document.getElementById("myDiv");

function show() {
    myDiv.style.visibility = "visible";
}

function hide() {
    myDiv.style.visibility = "hidden";
}

function toggle() {
    if (myDiv.style.visibility === "hidden") {
        show();
    } else {
        hide();
    }
}

hide();

button.addEventListener("click", toggle, false);


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

function postMessageboard() {

    var recipient = document.getElementById("nameTextboxID").value;//gets the data entered by the user
    var title = document.getElementById("titleTextboxID").value;
    var eventDate = document.getElementById("dateID").value;
    var body = {'recipient': recipient, 'title': title, 'eventDate': eventDate};

    if (recipient == "" || recipient == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter the recipients name!");
    }
    if (title == "" || title == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a title for the messageboard!");
    }
    if (eventDate == "" || eventDate == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter the recipients birthday date ");
    }
    if (eventDate == "" && recipient == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter the recipients name and birthday date ");
    }else {

        makeRequest('POST', '/api/newboard', body, function (data) {

            console.log("is making the post request");


        }, function () {


        });
    }
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
        element += '<a href="messageboard_index.html?id='+ data[i]['id'] + '">';
        element += '<div id="Modal">';
        element += '<div id="formTitle">' + data[i]['title'] + '</div>';
        // element += '<img id ="profile_pic" src="images/ellie_and_paola.png" width="275" height="250">'
        element += '<div id="birthdayDate">' + data[i]['eventDate'] + '</div>';
        element += '    </div></a>'
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

function postMessageboard(idFromUrl){

    var recipient = document.getElementById("nameTextboxID").value;//gets the data entered by the user
    var birthday =  document.getElementById("dateID").value;
    var title =  document.getElementById("titleTextboxID").value;

    var body = {'recipient': recipient, 'birthday': birthday, 'title': title};

    console.log("in postmessageboard");
    makeRequest('POST', '/api/newboard?id=' + idFromUrl, body, function (data) {

        $().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
            getBoards();
        });


    }, function () {


    });

    $().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
        getBoards();
    });
}



$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
    getBoards();
});