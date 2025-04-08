<!DOCTYPE html>
<html>
<head>
    <?php
    // Include the library
    include("php/myLib.php");

    $currentPath = dirname(realpath(__FILE__));
    $weekNr = extractFolderNumber($currentPath);
    ?>
    <title>Week <?php echo $weekNr; ?> Work</title>
</head>
<body>

    <h1>This is work for Week <?php echo $weekNr; ?></h1>

</body>
</html>
