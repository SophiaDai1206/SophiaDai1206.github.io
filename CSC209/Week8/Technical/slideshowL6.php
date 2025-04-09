<?php
include("../php/myLib.php");

$weekNr = extractFolderNumber("/Applications/MAMP/htdocs/CSC209/CSC209/Week8/Technical/slideshowL4.php"); 
$imageFolder = "Images";
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

$images = array_filter(scandir($imageFolder), function($file) use ($allowedExtensions) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    return in_array(strtolower($ext), $allowedExtensions);
});
$images = array_values($images);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Week <?php echo $weekNr; ?> Work</title>
    <style>
        header {
            background-color: #355b82;
            float: right;
            width: 80%;
            padding: 20px;
            text-align: center;
            font-size: 35px;
            color: white;
        }
    </style>
</head>
<body>
    <header>
        <div class="slideshow-container" id="slidesContainer">
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <div style="text-align:center" id="dotsContainer"></div>
    </header>

    <h1>This is work for Week <?php echo $weekNr; ?></h1>

    <script>
        let slidesContainer = document.getElementById("slidesContainer");
        let slidesData = [
            <?php foreach ($images as $index => $image): 
                $caption = createCaptionFromFilename($image);
                $slideNum = ($index + 1) . " / " . count($images);
                $imgSrc = "$imageFolder/$image";
            ?>
            {
                number: "<?php echo $slideNum; ?>",
                imgSrc: "<?php echo $imgSrc; ?>",
                caption: "<?php echo $caption; ?>"
            }<?php echo $index < count($images) - 1 ? ',' : ''; ?>
            <?php endforeach; ?>
        ];

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

        let totalSlide = slidesData.length;
        let dotsContainer = document.getElementById("dotsContainer");
        for (let j = 1; j <= totalSlide; j++) {
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
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }
    </script>
</body>
</html>
