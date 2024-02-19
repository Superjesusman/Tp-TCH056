<?php
require_once __DIR__."/../../Php/config.php";

try{
    $stmt= $conn->prepare("DELETE FROM `jeux_plateformes` WHERE `id_jeux`=:id");
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    if(!$stmt->rowCount()){
        http_response_code(400);
        echo "L'identifiant du jeu est invalide!";
        exit;
    }

    $stmt= $conn->prepare("DELETE FROM `jeux` WHERE `id`=:id");
    $stmt->bindValue(":id", $id);
    $stmt->execute();

    if(!$stmt->rowCount()){
        http_response_code(400);
        echo "L'identifiant du jeu est invalide!";
        exit;
    }
    
    

    $reponse = ["response"=>"OK"];
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($reponse);
} catch (PDOException $e){
    http_response_code(500);
    echo "Erreur lors de l'insertion en BD: ".$e->getMessage();
}


