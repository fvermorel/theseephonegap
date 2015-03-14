$(document).ready(function(){
	preloadChapter(2);
	$("#chapters").load("menu.html", function() {  //alert('Load was performed.');
	});
	
	$("#text").load("resources/chapter1/text1.html");
	$('#next').live("click", function(){goPage("next");	});
	$('#prev').hide().live("click", function(){goPage("prev");	});
	
	$('#menuImg').click(function(){
		if (menuStatus == 1) { openMenu();}
		else { closeMenu();	}
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
		if (!$(e.target).is(".chapterImg") && !$(e.target).is("#menuImg") && menuStatus == 0)	{ closeMenu();}
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
	$("#chapters").animate({ 'height': "60%" }, 500 );
	menuStatus = 0;
}

function goPage(direction){
	if (direction == "next"){
		if (page == chapterList[chapter-1]) {
			chapter += 1;
			page = 1;
			$('#prev').attr('src', 'img/prevChapter.png').show();
			$('#next').attr('src', 'img/next.png');
		}
		else {
			$('#prev').attr('src', 'img/prev.png').show();
			page += 1;
			if (page == chapterList[chapter-1]) {
				if (chapter == chapterList.length)
					$('#next').hide();
				else
				{
					$('#next').show();
				}
			}
		}
	}
	else
	{
		if (page == 1)
		{
			chapter -= 1;
			page = chapterList[chapter-1];
			$('#prev').attr('src', 'img/prev.png');
			$('#next').attr('src', 'img/nextChapter.png');
		}
		else {
			page -= 1;
			$('#next').attr('src', 'img/next.png');
			if (page == 1 && chapter == 1)
				$('#prev').hide();
			$('#next').show();
		}
	}
	showPage(page);
}