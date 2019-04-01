<html>
<head>
	<title>Source Code</title>
</head>	
<body>
<?php

$path = $_GET['file'];
$path = str_replace("..", "", $path);
$path=basename($path);

echo '<b>'.$path.'</b>';
echo '<p></p>';
echo "<textarea  readonly='readonly' cols='80' rows='60'>";
if (file_exists($path)) {
	echo htmlspecialchars(file_get_contents($path));
}
echo "</textarea>";

?>
</body>
</html>
