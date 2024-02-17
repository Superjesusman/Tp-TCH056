<?php
try {
    $conn = new PDO("mysql:host=db;dbname=mydatabase", "user", "password");

    $conn->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );
    //echo "Connexion réussie";
} catch (PDOException $e) {
    echo "Connexion échouée: " . $e->getMessage();
}
