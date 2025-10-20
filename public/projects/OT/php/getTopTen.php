<?php
    require_once("./CommonMethods.php");

    $sql = "SELECT * FROM `oregon_top_ten` ORDER BY `points` DESC LIMIT 10";
    $rs = $pdo->query($sql);

    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        echo("<tr><td>".$row['name']."</td><td>".$row['points']."</td><td>".$row['rating']."</td></tr>\n");
    }
?>