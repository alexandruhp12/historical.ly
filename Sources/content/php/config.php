<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "htmlusers";

$conn = mysqli_connect($servername, $username, $password, $db);
if(!$conn){
    die("Conexiune esuata: " .mysqli_connect_error());
}
?>

//login.php
    <?php
    include('config.php');

        $username = $_POST['username'];
        $parola = $_POST['parola'];
        if(isset($_POST['sub'])){
        $query = mysqli_query($conn, "select * from users where Username = '$username'");
        $no = mysqli_num_rows($query);
        if($no > 0){
            $data = mysqli_fetch_assoc($query);
            if($data['Parola'] == $parola){
             ///  echo "Conectare cu succes!";
               $ok = 1;
            }
            else{
                $ok = 0;
               /// echo "EROARE";
            }
        }
        else{
          $ok = 0;
        }
    }
?>
