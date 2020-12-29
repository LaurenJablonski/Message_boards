
function postMessage() {

    let messageEntered = document.getElementById("user-inputs-new-message").value;//gets the data entered by the user



    if (messageEntered == "" || messageEntered == null) {// series for statements that give alerts if the user has forgotten to enter the name. description or task
        alert("Please enter a message!");
    } else {
        console.log("thanks for submitting a message");
        // addItem(todoItemname, todoItemDesc, todoItemDate);
        // clearAndRefresh();//if name, description and due date have been added then clear the form and refresh the page.

    }
}


var input = document.querySelector('#clear_message_button');
var textarea = document.querySelector('#user-inputs-new-message');

input.addEventListener('click', function () {
    textarea.value = '';
}, false);