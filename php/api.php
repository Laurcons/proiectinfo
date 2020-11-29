<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require("pdo.php");

$response = [
    "status" => "notset"
];
$pdo = get_pdo();

(function(&$response, $pdo) {

    if (!array_key_exists("a", $_GET)) {
        $response["status"] = "action-not-set";
        return;
    }

    $action = $_GET["a"];

    if ($action === "create-db") {

        $pdo->query("DROP DATABASE IF EXISTS `genealogiePricop`;");
        $pdo->query("CREATE DATABASE `genealogiePricop`;");
        $pdo->query("CREATE TABLE `genealogiePricop`.`rudePricop` (
            `id` int(11) NOT NULL,
            `nume` varchar(25) NOT NULL,
            `prenume` varchar(25) NOT NULL,
            `varsta` int(11) NOT NULL,
            `grad` varchar(25) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;");
        $pdo->query("ALTER TABLE `genealogiePricop`.`rudepricop`
          ADD PRIMARY KEY (`id`);");
        $pdo->query("ALTER TABLE `genealogiePricop`.`rudepricop`
        MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;");
        $response["status"] = "success";

    } else if ($action === "insert-predefined") {

        $predefines = [
            ["Jiros", "Carmen", 45, "mama"],
            ["Jiros", "Dacian", 45, "tata"],
            ["Jiros", "Sorina", 11, "sora"],
            ["Tanasa", "Olga", 65, "bunica"],
            ["Heghis", "Alina", 46, "matusa"],
            ["Musk", "Elon", 49, "cumatru"],
            ["Tanasa", "Norocel", 47, "unchi"],
            ["Jiros", "Viorica", -1, "bunica"],
            ["Astley", "Rick", 54, "tata_vitreg"],
            ["Ciolac", "Sorin", -1, "nas"]
        ];

        $stmt = $pdo->prepare("INSERT INTO `genealogiePricop`.`rudePricop` (nume, prenume, varsta, grad) VALUES (?,?,?,?);");
        foreach ($predefines as $pre) {
            $stmt->execute($pre);
        }

        $response["status"] = "success";

    } else if ($action === "insert") {

        $row = [
            $_POST["nume"],
            $_POST["prenume"],
            $_POST["varsta"],
            $_POST["grad"]
        ];

        $stmt = $pdo->prepare("INSERT INTO `genealogiePricop`.`rudePricop` (nume, prenume, varsta, grad) VALUES (?,?,?,?);");
        $stmt->execute($row);
        $response["status"] = "success";

    } else if ($action === "retrieve") {

        $queries = json_decode(file_get_contents("queries.json"), true);
        $response["queries"] = [];
        foreach ($queries as $queryData) {
            $stmt = $pdo->prepare("SELECT * FROM `genealogiePricop`.`rudePricop` WHERE " . $queryData["condition"]);
            $stmt->execute();
            $queryData["result"] = $stmt->fetchAll();
            $response["queries"][] = $queryData;
        }
        $response["status"] = "success";

    } else if ($action === "delete") {

        $stmt = $pdo->prepare("DELETE FROM `genealogiePricop`.`rudePricop` WHERE Id=?;");
        $stmt->execute([
            $_POST["id"]
        ]);
        $response["status"] = "success";

    } else {
        $response["status"] = "action-not-found";
        return;
    }

})($response, $pdo);

header("Content-type: application/json");
echo(json_encode($response));

?>