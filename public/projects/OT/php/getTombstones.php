<?php
    require_once("./CommonMethods.php");
    
    $sql = "SELECT `mile`, `name`, `epitaph` FROM `tombstones` WHERE `date` IN (SELECT MAX(`date`) FROM `tombstones` GROUP BY FLOOR(`mile` / 40)) ORDER BY `mile`";
    $rs = $pdo->query($sql);
    $results = array();
    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        $results[] = array(
            'mile' => $row['mile'],
            'name' => $row['name'],
            'epitaph' => $row['epitaph']
        );
    }
    echo(json_encode($results));
?>