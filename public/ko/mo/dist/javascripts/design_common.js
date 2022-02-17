"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var esOut = "Expo.easeOut";
var $window = $(window);
var winSc = $(window).scrollTop();
var $header = $("#header");
var $html = $("html");
var $htmlH;
var navAni;
var controller = null;

$window.load(function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $htmlH = $html.outerHeight();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    main();
});
function layout() {

}
"use strict";
function main() {
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
    var $footer = $("footer")
    var $donaBtn = $(".fix_btn_wrap"),
        _footerH = $footer.height();
    $window.scroll(function () {
        if(winSc > winH - 100){
            $logo.addClass("logo_black");
        } else {
            $logo.removeClass("logo_black");
        }
        if(winSc > $htmlH - winH - 700 && drawCounter === false){
            draw();
        }

        if(winSc <= 300){
            $donaBtn.addClass("open_fix");
        } else {
            $donaBtn.removeClass("open_fix");
        }

        if(winSc + window.innerHeight >= document.body.clientHeight - _footerH) {
            $donaBtn.addClass("active");
        }else{
            $donaBtn.removeClass("active");
        }
    });
}