<?php
    require_once("./CommonMethods.php");

    $score = $_GET['score']; $rating = "";
    if ($score <= 3000) { $rating = "Greenhorn"; }
    else if ($score <= 6000) {$rating = "Adventurer"; }
    else { $rating = "Trail guide"; }

    $sql = "SELECT `key`, MIN(`points`) as points from `oregon_top_ten`";
    $stmt = $pdo->query($sql);
    $rs = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($rs['points'] < $score) {
        $sql = "DELETE FROM `oregon_top_ten` WHERE `key` = :loKey".
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(':loKey' => $rs['key']));
        $rs = $stmt->fetch(PDO::FETCH_ASSOC);
        $sql = "INSERT INTO `oregon_top_ten` (`name`, `points`, `rating`) VALUES (:player,:score,:rating)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(':player' => $_GET['name'], ':score' => $score, ':rating' => $rating));
        echo("true");
    } else {
        $sql = "SELECT COUNT(*) `oregon_top_ten`";
        $stmt = $pdo->query($sql);
        $rs = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($rs[0] < 10) {
            $sql = "INSERT INTO `oregon_top_ten`(`name`, `points`, `rating`) VALUES (:player, :score, :rating)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array(':player' => $_GET['name'], ':score' => $score, ':rating' => $rating));
            echo("true");
        } else {
            echo("false");
        }
    }
?>