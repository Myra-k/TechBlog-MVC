<?php
// backend.php

// Replace the database connection details with your actual database credentials
$servername = "your_database_servername";
$username = "your_database_username";
$password = "your_database_password";
$dbname = "your_database_name";

// Establish the database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch articles from the database
$sql = "SELECT id, title, content, date_created FROM articles ORDER BY date_created DESC";
$result = $conn->query($sql);

$articles = array();

// Prepare the data for JSON format
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $articles[] = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'content' => $row['content'],
            'date_created' => $row['date_created']
        );
    }
}

// Close the database connection
$conn->close();

// Set the response headers for JSON
header('Content-Type: application/json');

// Return the articles in JSON format
echo json_encode($articles);
?>
