

var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user-inputs-new-message');

input.addEventListener('click', function () {
    textarea.value = '';
}, false);

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

function getItems(callback) {
    makeRequest('GET','/item',null, function (data) {// what I seem to put as the body here (null) is appended to the end of the http so it becomes http://localhost:8080/item?%22hello%22
        //var items = data.body['items'];//object['properties of the object']
        var jsonData = JSON.parse(data);
        //console.log(items);
        console.log(jsonData.body);
        //console.log(items)
        //console.log(data);
        //callback(jsonData.body.items);//if the request was successful then callback(items)
        callback(jsonData.body); //without this the html of your calendar doesn't load



    }, function () {
        console.log("An error occured in getItems");
        callback([]);// if the request ws unsuccessful then callback an empty array and state in the console that an error has occured
    });
}


function postItem(id, messageEntered){
    var body = {'ID':id, 'Message': messageEntered}; //maybe should get user to enter date message sent or name too?

    console.log([body]);

    makeRequest('POST', '/item', body, function (data) {
        console.log('success');

    }, function () {
        console.log("An error occured in postItem");

    });
}




function postMessage() {

    let messageEntered = document.getElementById("user-inputs-new-message").value;//gets the data entered by the user

    if (messageEntered == "" || messageEntered == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a message!");
    } else {
        console.log("thanks for submitting a message");
        document.getElementById("user-inputs-new-message").value = "";
        postItem(messageEntered)
        // addItem(todoItemname, todoItemDesc, todoItemDate);
        // clearAndRefresh();//if name, description and due date have been added then clear the form and refresh the page.

    }
}


