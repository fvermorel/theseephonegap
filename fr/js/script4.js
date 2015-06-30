$(document).ready(function(){
	
		 loadAssets([
        "../fr/son/d1.mp3",
        "../fr/son/d2.mp3",
        "../fr/son/d3.mp3",
		"../fr/son/d4.mp3",
		"../fr/son/d5.mp3",
		"../fr/son/d6.mp3",
		"../fr/voix/chapitre13.mp3",
        "../fr/voix/chapitre14.mp3",
        "../fr/voix/chapitre15.mp3",
		"../fr/voix/chapitre16.mp3",	
		"../fr/voix/chapitre17.mp3",
		"../fr/voix/chapitre18.mp3",
		"../fr/voices/chapitre13.mp3",
        "../fr/voices/chapitre14.mp3",
        "../fr/voices/chapitre15.mp3",
		"../fr/voices/chapitre16.mp3",	
		"../fr/voices/chapitre17.mp3",
		"../fr/voices/chapitre18.mp3",		
		"../fr/resources/chapter4/img/1.jpg",
		"../fr/resources/chapter4/img/2.jpg",
		"../fr/resources/chapter4/img/3.jpg",
		"../fr/resources/chapter4/img/4.jpg",
		"../fr/resources/chapter4/img/5.jpg",
		"../fr/resources/chapter4/img/6.jpg",
    ], function() {
        startApp();
    });
	
	 $('.encart').animate({

          opacity: 1

          }, 2000, function() {

          // Animation complete.

          });

          $(".ecrit").click(function (){

          $(".encart").toggleClass("encartbaisse");

           $(".ecrit").toggleClass("ecrithover");

          });
		    $(".son").click(function (){

        

          $(".son").toggleClass("sonhover");

          });
	
	
	
    preloadChapter(2);
    $("#chapters").load("menu.html", function() {  //alert('Load was performed.');
    });
   

   
    $('#menuImg').click(function(){
        if (menuStatus == 1) { openMenu();}
        else { closeMenu();    }
    });
   
    $('.chapterImg').live('click', function(){
        $('#chapters img.active').removeClass("active");
        $(this).addClass("active");
        chapter = parseInt($(this).attr("id"));
        page = 1;
        if (chapter == 1)
            $('#prev').hide();
        preloadChapter(1);
    });
   
    $(document).mouseup(function (e)
    {
        if (!$(e.target).is(".chapterImg") && !$(e.target).is("#menuImg") && menuStatus == 0)    { closeMenu();}
    });
    $('<img/>').attr('src', 'img/nextChapter.png').load();
    $('<img/>').attr('src', 'img/prevChapter.png').load();
});

// liste des chapitre: la valaur correspond au nombre de page par chapitre
var chapterList=[4,4,4,6,4,4];
var menuStatus = 1; //closed
var chapter = 1;
var page = 1;
var allLoaded = [0,0,0,0,0,0]; //

function showPage(page) {
    if (page == 1)
        $('#prev').attr('src', 'img/prevChapter.png');
    if (page == chapterList[chapter-1])
        $('#next').attr('src', 'img/nextChapter.png');

    $('#page').fadeOut('fast', function () {
        $(this).attr('src', 'resources/chapter'+chapter+'/img/'+page+'.jpg');
        $(this).fadeIn('fast');
    });
    $("#text").load("resources/chapter"+chapter+"/text"+page+".html");
}

// Préchargement des images

function preloadChapter(start){
    var images = [];
    for (var i = 1; i <= chapterList[chapter-1] ; i++)
        images.push('chapter'+chapter+'/img/'+i+'.jpg');
    preload(images, start);
}

function preload(imagesToLoad, start) {
    imagesLoaded = start - 1;
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === imagesToLoad.length) {
            allLoaded[chapter-1] = 1;
        }
    }
    for ( var index = start; index <= imagesToLoad.length; index++) {
        var $img = $('<img />')
        .attr('src', 'resources/' + imagesToLoad[index-1])
        .attr('id', index)
        .load(imageLoaded);
        if (index == 1)
            showPage(1);
    }
}

function closeMenu(){
    $("#chapters").animate({ 'height': "0%" }, 500 );
    menuStatus = 1;
}
function openMenu(){
    $("#chapters").animate({ 'height': "88%" }, 500 );
    menuStatus = 0;
}

