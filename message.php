<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "dB";

// Create connection to database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection to the database is working
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO StoreMessages (name, message)
VALUES ('$_POST[name]','$_POST[message]')"

//test if query successful:
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>