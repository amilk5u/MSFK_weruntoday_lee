"use strict";
function main() {
    var $loading = $("#loading"),
        $loadingH2 = $loading.find("h2");

    var $mainVisual = $("#mainVisual"),
        $mainTxt = $mainVisual.find(".txt01, .txt02, .txt_dot");

    TweenMax.to($loadingH2, 1, {scale:1, ease:Expo.ease});
    TweenMax.to($loading, 1.5, {height:0, delay:.5, ease:Expo.ease});

    setTimeout(function () {
        if(winSc < winH){
            TweenMax.to($html, 1, {scrollTop:winH});
        }
    }, 6000);

    var $logo = $("header h1 a");
    const canv = document.getElementById("canvas"),
        ctx = canv.getContext("2d"),
        img = new Image(),
        imgMask = new Image();

    imgMask.src = "./images/common/cloud-texture.png";
    img.src = "./images/main/bottom_content_bg.png";

    var speed = 0;
    var requestId,
        drawCounter = false;

    var $bottomContent = $(".bottom_content"),
        $bottomTxt01 = $bottomContent.find(".txt01"),
        $bottomTxt02 = $bottomContent.find(".txt02"),
        $bottomTxt03 = $bottomContent.find("h2"),
        $bottomTxt04 = $bottomContent.find(".tit_wrap p");

    function draw() {
        speed += 25;
        const maskX = (canv.width - (70 + speed)) / 2,
            maskY = (canv.height - (30 + speed)) / 2;
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(imgMask, maskX, maskY, 70 + speed, 30 + speed);
        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        requestId = window.requestAnimationFrame(draw);

        TweenMax.to($bottomTxt01, .5, {opacity:1, delay:1});
        TweenMax.to($bottomTxt02, .5, {opacity:1, delay:1});
        TweenMax.to($bottomTxt03, .5, {opacity:1, delay:1});
        TweenMax.to($bottomTxt04, .5, {opacity:1, delay:1});
        drawCounter = true;
    }

    img.onload = () => {
        canv.width = img.naturalWidth; 
        canv.height = img.naturalHeight;
    };
    $window.scroll(function () {
        if(winSc > winH - 100){
            $logo.addClass("logo_black");
        } else {
            $logo.removeClass("logo_black");
        }
        if(winSc > $htmlH - winH - 700 && drawCounter === false){
            draw();
        }
    });
}