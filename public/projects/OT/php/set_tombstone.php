<?php

	include ("CommonMethods.php");
	
	$sql = "insert into `tombstones` (`name`, `mile`, `epitaph`) values (:name,:mile,:epitaph)";
	$stmt = $pdo->prepare($sql);
	$stmt->execute(array(':name' => $_GET['name'], ':mile' => $_GET['mile'], ':epitaph' => $_GET['epitaph']));

?>