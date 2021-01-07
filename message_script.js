

var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user_inputs_new_message');

// input.addEventListener('click', function () {
//     textarea.value = '';
// }, false);

function getToken() {
    return 'lauren2';
}

function makeRequest(method, resource, body, successCb, errorCb) {
    var baseUrl = 'http://localhost:8080';
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

function getItems(items) {
    makeRequest('GET','/item',null, function (data) {// what I seem to put as the body here (null) is appended to the end of the http so it becomes http://localhost:8080/item?%22hello%22
        //var items = data.body['items'];//object['properties of the object']
        var jsonData = JSON.parse(data);
        //console.log(items);
        console.log("this is the jsonData.body" + JSON.stringify(jsonData.body));
        //console.log("this is the jsonData" + JSON.stringify(jsonData));
        //console.log(items)
        //console.log(data);
        //callback(jsonData.body.items);//if the request was successful then callback(items)
        //callback(JSON.stringify(jsonData.body)); //without this the html of your calendar doesn't load
        //createItemTable(items)
        document.getElementById("json").textContent= JSON.stringify(jsonData,undefined,2);



    }, function () {
        console.log("An error occured in getItems");
        callback([]);// if the request ws unsuccessful then callback an empty array and state in the console that an error has occured
    });
}


function postItem(messageEntered){
    var body = {'Message': messageEntered}; //maybe should get user to enter date message sent or name too?
    console.log("helloooo");
    console.log([body]); //the message that the user entered is showing in the console of the page where it's written but I think this needs to be written in the console of the message board

    makeRequest('POST', '/item', body, function (data) {
        console.log('success');
        getItems(body);
        console.log([body]);

    }, function () {
        console.log("An error occured in postItem");

    });
}




function postMessage() {

    let messageEntered = document.getElementById("user_inputs_new_message").value;//gets the data entered by the user

    if (messageEntered == "" || messageEntered == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a message!");
    } else {
        postItem(messageEntered);
        console.log("the message inputted by the user is:" + messageEntered);
        console.log("thanks for submitting a message");
        document.getElementById("user_inputs_new_message").value = "";

        // addItem(todoItemname, todoItemDesc, todoItemDate);
        // clearAndRefresh();//if name, description and due date have been added then clear the form and refresh the page.

    }
}

// var arrayOfItemIDs = []
// function createItemTable(items) {
//     //alert(JSON.stringify(items[2]['DueDate']));
//     var list = '<table id="toDoTable" style="width:100%" position:absolute ><tr><th style="text-align:center">Messagessss</th></tr>';
//     var now = new Date();
//
//     items.forEach(i => {
//         arrayOfItemIDs.push(i.ID)
//
//
//         // as you pass through the loop these items are sdded to the page
//         element = '<div>'
//         element += '<td>' + i['Message'] + '</td>'; // shouldn't this be changed to dictionary?
//         element += '</div>'
//         list += element
//     });

//
//     $(this).element += '</table>';// add the element to the table
//     $('#list').html(list);
// }

// var globalItems = []
//
// function refreshList() {
//     getItems(function (items) {
//         globalItems = items
//         createItemTable(items);
//     });
// }





//
// window.onload = function loading() {
//
//     refreshList()
// } ;
