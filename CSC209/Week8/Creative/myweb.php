<?php
include("../php/myLib.php");

$weekNr = extractFolderNumber("/Applications/MAMP/htdocs/CSC209/CSC209/Week8/Technical/slideshowL4.php"); 

$imageBaseDir = "Images";

$folders = array_filter(glob($imageBaseDir . '/*'), 'is_dir');

// Determine which folder to show based on user input (GET param)
$selectedFolder = isset($_GET['folder']) ? $_GET['folder'] : basename($folders[0]); // default to first

$imageFolderPath = "$imageBaseDir/$selectedFolder";
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

// Get image list from selected folder
$images = array_filter(scandir($imageFolderPath), function($file) use ($imageFolderPath, $allowedExtensions) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    return in_array(strtolower($ext), $allowedExtensions);
});
$images = array_values($images);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Week <?php echo $weekNr; ?> Work</title>
    <link rel="stylesheet" href="style.css">
    <style>
        header {
            background-color: #355b82;
            padding: 20px;
            text-align: center;
            font-size: 35px;
            color: white;
        }
        select {
            font-size: 16px;
            padding: 5px;
            margin: 15px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Week <?php echo $weekNr; ?>: <?php echo htmlspecialchars($selectedFolder); ?> Slideshow</h1>

        <form method="GET" onchange="this.submit()">
            <label for="folder">Choose a category:</label>
            <select name="folder" id="folder">
                <?php foreach ($folders as $folderPath): 
                    $folderName = basename($folderPath);
                    $isSelected = $folderName === $selectedFolder ? 'selected' : '';
                ?>
                    <option value="<?php echo $folderName; ?>" <?php echo $isSelected; ?>>
                        <?php echo $folderName; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </form>
    </header>

    <div class="slideshow-container" id="slidesContainer"></div>
    <div style="text-align:center" id="dotsContainer"></div>

    <script>
        const slidesData = [
            <?php foreach ($images as $index => $image): 
                $caption = createCaptionFromFilename($image);
                $slideNum = ($index + 1) . " / " . count($images);
                $imgSrc = "$imageFolderPath/$image";
            ?>
            {
                number: "<?php echo $slideNum; ?>",
                imgSrc: "<?php echo $imgSrc; ?>",
                caption: "<?php echo $caption; ?>"
            }<?php echo $index < count($images) - 1 ? ',' : ''; ?>
            <?php endforeach; ?>
        ];

        const slidesContainer = document.getElementById("slidesContainer");
        const dotsContainer = document.getElementById("dotsContainer");

        slidesData.forEach(function(slide) {
            let slideDiv = document.createElement("div");
            slideDiv.className = "mySlides fade";
            slideDiv.innerHTML = `
                <div class="numbertext">${slide.number}</div>
                <img src="${slide.imgSrc}" style="width:100%">
                <div class="text">${slide.caption}</div>
            `;
            slidesContainer.appendChild(slideDiv);
        });

        for (let j = 1; j <= slidesData.length; j++) {
            let span = document.createElement("span");
            span.className = "dot";
            span.onclick = function() { currentSlide(j); };
            dotsContainer.appendChild(span);
        }

        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            if (slides.length > 0) {
                slides[slideIndex - 1].style.display = "block";
                dots[slideIndex - 1].className += " active";
            }
        }
    </script>
</body>
</html>
