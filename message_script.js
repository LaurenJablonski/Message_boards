var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user_inputs_new_message');

var arrayOfItemIDs = []

// input.addEventListener('click', function () {
//     textarea.value = '';
// }, false);

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

function getItems(data) {

    makeRequest('GET','/api/item',null, function (data) {// what I seem to put as the body here (null) is appended to the end of the http so it becomes http://localhost:8080/item?%22hello%22
        console.log("this is get items");
        console.log("the data being received is: " + data);
        var jsonData = JSON.stringify(data);
        console.log("this is the jsonData.body" + jsonData.body);
        showItems(jsonData.body);



    }, function (error) {
        console.log("An error occured in getItems");
        console.log("the error is" + error);
        //callback([]);
    });
}


function postItem(messageEntered, nameOfUser){
    var body = {'Message': messageEntered, 'Name': nameOfUser}; //maybe should get user to enter date message sent or name too?
    console.log("helloooo");
    console.log([body]); //the message that the user entered is showing in the console of the page where it's written but I think this needs to be written in the console of the message board

    makeRequest('POST', '/api/item', body, function (data) {
        console.log('success');
        //getItems(body);
        console.log([body]);

    }, function () {
        console.log("An error occured in postItem");

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
        //self.close();
        console.log("the message inputted by the user is:" + messageEntered);
        console.log("the name of user is:" + nameOfUser);
        console.log("thanks for submitting a message");
        document.getElementById("user_inputs_new_message").value = "";
        document.getElementById("nameTextboxID").value = "";
        //showItems(items);


    }
}

function showItems(data) {
    var list = document.getElementById("whereToDisplayMessages"); //or just empty div

    console.log("you are reaching showItems");
    console.log("the data is" + data[message]);
    var lengthOfMessages = data.length;
    for (var i = 0; i < lengthOfMessages; i++) {
        if (i%1 == 0){ //even
            element = '<div class="mail"><div class="cover"></div><div class="letter"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['Message'];
            element += data[i]['Name'];
            element += '</textarea></div>';
            dragElement(document.getElementById("whereToDisplayMessages"));
            list += element;




        }
        if (i%2 == 0){ //multiple of 3 but not even
            element = '<div class="mail3"><div class="cover3"></div><div class="letter3"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['Message'];
            element += data[i]['Name'];
            element += '</textarea></div>';
            list += element;


        }

        if (i%3 == 0){ //multiple of 3 but not even
            element = '<div class="mail4"><div class="cover4"></div><div class="letter4"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['Message'];
            element += data[i]['Name'];
            element += '</textarea></div>';
            list += element;


        }
        if (i%4 == 0){//odd
            element = '<div class="mail2"><div class="cover2"></div><div class="letter2"><textarea rows = "9" cols="28" id="where_messages_appear">';
            element += data[i]['Message'];
            element += data[i]['Name'];
            element += '</textarea></div>';
            list += element;
            //dragElement(document.getElementById("whereToDisplayMessages"));



        }
        $(this).element += '    </div>';
        $('#whereToDisplayMessages').prepend(element);
    };
}
dragElement(document.getElementById("whereToDisplayMessages"));
//Make the DIV element draggable:


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
};



$().ready(function () { //* this function means that when the page has finished loading, it calls the refreshlist function, where this refreshlist function calls the getItems function with fucnction createItemTable as a function. (it's passing a function as an argument) */
    getItems();
    //showItems(data);
});



