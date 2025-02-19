<?php
    if(isset($_POST['sub'])){
        $username = $_POST['username'];
        $nume = $_POST['nume'];
        $prenume = $_POST['prenume'];
        $parola = $_POST['parola'];
        $email = $_POST['email'];
        $varsta = $_POST['varsta'];

        ///Database connection
        $conn = new mysqli('localhost', 'root', '' ,'htmlusers');

        if($conn -> connect_error) {
            die('Connection Failed: '.$conn->connect_error);
        }else{
            $stmt = $conn->prepare("insert into users(Username, Nume, Prenume, Parola, Varsta, Email) values(?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssi", $username, $nume, $prenume, $parola, $varsta, $email);
            $stmt->execute();
            echo "Inregistrare cu succes";
            $stmt->close();
            $conn->close();
        }
    }
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="register.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/fd77b90805.js" crossorigin="anonymous"></script>
    <title>Register</title>
</head>
<body>
    <div class="nav">
        <a href="">Bibliografie</a>
        <a href="">Contact</a>
        <a href="register.html" style="color: yellowgreen;">Register</a>
        <a href="istorie.html">Istorie</a>
        <a href="index.html" >Home</a>
   </div>
   <br>
   <br>
   <div class="container">
    <center>
        <h1>Register</h1>
        <br>
        <form action="" method="post">
            <p>Username</p>
            <input type="text" id="username" name="username">
            <p>Nume</p>
            <input type="text" id="nume" name="nume">
            <p>Prenume</p>
            <input type="text" id="prenume" name="prenume">
            <p>Parola</p>
            <input type="text" id="parola" name="parola">
            <p>E-mail</p>
            <input type="text" id="email" name="email">
            <p>Varsta</p>
            <input type="text" id="varsta" name="varsta">
            <br>
            <br>
            <input type="submit" id="sub" name="sub">
        </form>
        <br>
    </center>
   </div>
</body>
</html>