<?php
$gPublic = true;
require_once __DIR__."/../../Php/config.php";

if(isset($id) && filter_var($id, FILTER_VALIDATE_INT)){
    $stmt = $conn->prepare("SELECT * FROM `jeux` WHERE `id`=:id");
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    $jeu = $stmt->fetch();
} else {
    $jeu = ["error"=>"Identifiant invalide"];
}

if($jeu){
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($jeu);
    exit;
} else {
    header("HTTP/1.0 404 Not Found");
    exit;
}

