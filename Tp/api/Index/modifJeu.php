<?php
require_once __DIR__."/../../Php/config.php";

if(!isset($_SERVER["CONTENT_TYPE"]) || $_SERVER["CONTENT_TYPE"]!='application/json'){
    http_response_code(400);
    exit;
}

//Obtenir le corps de la requête
$body = json_decode(file_get_contents("php://input"));



try{

    $stmt= $conn->prepare("SELECT `id` FROM `jeux` WHERE `id`=:id");
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    if(!$stmt->rowCount()){
        http_response_code(400);
        echo "Identifiant de jeu invalide.";
        exit;
    }

    $stmt = $conn->prepare("UPDATE `jeux` SET `titre`=:titre, `url_image`=:url_image, `id_categorie`=:id_categorie  WHERE `id`=:id");
    $stmt->bindValue(":titre", $body->titre);
    $stmt->bindValue(":url_image", $body->url_image);
    $stmt->bindValue(":id_categorie", $body->id_categorie);
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    $insertion = ["id"=>$id,  "titre"=>$body->titre, "url_image"=>$body->url_image, "id_categorie"=>$body->id_categorie];
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($insertion);
} catch (PDOException $e){
    http_response_code(500);
    echo "Erreur lors de l'insertion en BD: ".$e->getMessage();
}


