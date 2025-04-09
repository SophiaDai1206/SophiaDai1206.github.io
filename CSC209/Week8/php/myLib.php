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

function createCaptionFromFilename($filename) {
    $nameWithoutExt = pathinfo($filename, PATHINFO_FILENAME);
    $nameWithSpaces = str_replace(['-', '_'], ' ', $nameWithoutExt);
    return ucwords($nameWithSpaces);
}
?>

</body>
</html>