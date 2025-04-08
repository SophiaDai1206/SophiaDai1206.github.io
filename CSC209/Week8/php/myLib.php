<!DOCTYPE html>
<html>
<body>

<?php
function extractFolderNumber($fullPath) {
    $folderPath = dirname(dirname($fullPath));
    $baseName  = basename($folderPath);
    $weekNrString = substr($baseName, -1);
    if (ctype_digit($weekNrString)) {
        return intval($weekNrString);
    } else {
        return 0;
    }
}
?>

</body>
</html>