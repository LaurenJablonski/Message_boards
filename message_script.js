

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
        showItems(jsonData.body)



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
        // showItems(body);
        // showItems(items);

    }, function () {
        console.log("An error occured in postItem");

    });
}




function postMessage(items) {

    let messageEntered = document.getElementById("user_inputs_new_message").value;//gets the data entered by the user

    if (messageEntered == "" || messageEntered == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a message!");
    } else {
        postItem(messageEntered);
        //self.close();
        console.log("the message inputted by the user is:" + messageEntered);
        console.log("thanks for submitting a message");
        document.getElementById("user_inputs_new_message").value = "";
        //showItems(items);

        // addItem(todoItemname, todoItemDesc, todoItemDate);
        // clearAndRefresh();//if name, description and due date have been added then clear the form and refresh the page.

    }
}

//var data = [{"ID":1,"Message":"Happy Birthday Christa!! I hope you have a wonderful day!"},{"ID":2,"Message":"We hope you have a lovely day Christa"},{"ID":3,"Message":"hallllllllllllllllllooooooooooooooooooooo"},{"Message":"cxcxcxcx","ID":4},{"Message":"Message  5 testing","ID":5}];

//var obj = JSON.stringify(items);

// shareInfoLength = data.shareMessages.length;
// for ( i = 0; i < shareInfoLength; i++) {
//     alert(Object.keys(data.shareMessages[i]).length);
// }

function showItems(data) {
    console.log("you are reaching showItems");
    var displayMessages = document.getElementById("whereToDisplayMessages");
    var lengthOfMessages = data.length;
    for (var i = 0; i < lengthOfMessages; i++) { // instead of length we could put the id of the last entered message
        var div = document.createElement("div");
        div.innerHTML = 'Message: ' + data[i].Message; //i['Message'];
        displayMessages.appendChild(div);
    }
}



//     function showItems(items) {
//     console.log("you are reaching showItems");
//     var displayMessages = document.getElementById("whereToDisplayMessages");
//     for ( i = 0; i < Object.keys(obj.items[i]).length; i++) { // instead of length we could put the id of the last entered message
//         var div = document.createElement("div");
//         div.innerHTML = 'Message: ' + data[i].message;
//         displayMessages.appendChild(div);
//     }
// }

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
