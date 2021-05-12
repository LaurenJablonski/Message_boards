var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user_inputs_new_message');

var arrayOfItemIDs = []

function getToken() {
    return 'lauren2';
}

function makeRequest(method, resource,body,successCb, errorCb) {
    var baseUrl = 'http://localhost:8000';
    $.ajax({
        method: method,
        url: baseUrl + resource,
        headers: {'token': getToken()},
        data: body ? JSON.stringify(body) : null,
        success: successCb,//on success then call successCb
        error: errorCb//on error then call errorCb
    });
}

function getItems(id) {
        console.log("you are getting to the getItems function")  ;
        makeRequest('GET','/api/item?id=' + id,null, function (data) {
        var jsonData = JSON.parse(data);
        console.log("the data is" + jsonData);
        showItems(jsonData);

        }, function (error) {
        console.log("An error occured in getItems");
        console.log("the error is" + error);
        callback([]);
    });
}

function getTitle(id) {
    console.log("you are getting to the getTitle function")  ;
    makeRequest('GET','/api/title?id=' + id,null, function (data) {
        // var jsonData = JSON.parse(data);
        // console.log(data);
        console.log("the data is(should be title)" + data['title']);
        showTitle(data)

    }, function (error) {
        console.log("An error occured in getItems");
        console.log("the error is" + error);
        callback([]);
    });
}

function postItem(messageEntered, nameOfUser){
    var body = {'message': messageEntered, 'username': nameOfUser};
    console.log("helloooo");
    console.log([body]);

    makeRequest('POST', '/api/item', body, function (data) {
        console.log('success');
        console.log([body]);

    }, function () {
        console.log("An error occured in postItem");

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

function myFunction(button) {
    var x = document.getElementsByClassName("display-4 font-weight-bold");
    if (x.contentEditable == "true") {
        x.contentEditable = "false";
        button.innerHTML = "Enable content of p to be editable!";
    } else {
        x.contentEditable = "true";
        button.innerHTML = "Disable content of p to be editable!";
    }
}


function myFunction(button) {
    var x = document.getElementsByClassName("birthday-date");
    if (x.contentEditable == "true") {
        x.contentEditable = "false";
        button.innerHTML = "Enable content of p to be editable!";
    } else {
        x.contentEditable = "true";
        button.innerHTML = "Disable content of p to be editable!";
    }
}

function deleteMessage(id){
    console.log(" this is deleteMessage");

    var body = {'ID': id};
    console.log("the body is:" + JSON.stringify(body));

    makeRequest('DELETE','/api/item' + id , body, function (data){ //appends the id to the item parameter
        console.log("sending delete request");
    }, function () {
        console.log("An error occured in deleteItem");// if unsuccessful then the console tells you that an error has occured
        getItems(body);
    });
}



function postMessage() {

    let messageEntered = document.getElementById("user_inputs_new_message").value;//gets the data entered by the user
    let nameOfUser =  document.getElementById("nameTextboxID").value;

    if (messageEntered == "" || messageEntered == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a message!");
    }
    if (nameOfUser == "" || nameOfUser == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a name!");
    }else {
        postItem(messageEntered, nameOfUser);
        console.log("the message inputted by the user is:" + messageEntered);
        console.log("the name of user is:" + nameOfUser);
        console.log("thanks for submitting a message");
        window.location.replace("/thank_you.html");


    }
}


function showItems(data) {
    var list = document.getElementById("whereToDisplayMessages"); //or just empty div

    console.log("you are reaching showItems");
    var lengthOfMessages = data.length;
    console.log("the lengths are :" + lengthOfMessages);
    for (var i = 0; i < lengthOfMessages; i++) {


        if (i%2 == 0) {
            element = '<div class="mail envelope"><div class="cover"></div><div class="letter"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['message'];
            element += "\n From - " + data[i]['username'];
            element += '</textarea></div>';
            list += element;
        }
        else{
            element = '<div class="mail3 envelope"><div class="cover3"></div><div class="letter3"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['message'];
            element += "\n From - " + data[i]['username'];
            element += '</textarea></div>';
            list += element;


        }

        $(this).element += '    </div>';
        $('.row g-4').append(element);
        //$('.col-6').append(element); with this the envelopes fill first column then when fill they move onto the second column but we want to fill in rows so the below
        $('.row').append(element);

    };
}

function showTitle(data,id) {

    document.getElementById("titleOfMessageBoard").innerHTML = data;
}

//########################################################HERE IS ALL THE CHANGE IN THEME STUFF ################################################//
// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();

$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    document.getElementById("addMessageButton").href = 'message_index.html?id=' + id;
    getItems(id);
    getTitle(id)
    // getBoards(id)

});

