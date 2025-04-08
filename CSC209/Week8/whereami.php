<!DOCTYPE html>
<html>
<body>

<?php
$fullPath = realpath("whereami.php");

// Get the directory path (parent folder)
$folderPath = dirname($fullPath);
echo "Folder Path: ". $folderPath;
echo "<br>" ;
echo "Base Name: ". basename($folderPath);
echo "<br>" ;
$weekNrString = substr($baseName, -2);
echo "The last two characters of the basename: ". $weekNrString;
echo "<br>" ;
$weekNr = 0;
    if (ctype_digit($weekNrString)) {
        $weekNr = intval($weekNrString);
    }
?>
<p>My week number is <?php echo $weekNr; ?></p>


<p> This page figures out its whereabouts </p>
</body>
</html>