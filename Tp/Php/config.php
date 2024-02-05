<?php
    $conn = new mysqli("db","mydatabase","user","password");

    if($conn->connect_error){
        die("Connexion échouée: ". $conn->connect_error);
    }
    echo "Connexion réussie!";
?>