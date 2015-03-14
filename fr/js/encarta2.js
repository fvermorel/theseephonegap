

 $(document).ready(function(){
     $('.encart').animate({
opacity: 1
}, 2000, function() {
// Animation complete.
});
  $(".ecrit").click(function (){
      $(".texte").fadeToggle("slow", "linear");
	    $("#ecrit").removeClass("ecrit").addClass("ecrithover");
    });
	$("#ecrit.ecrithover").click(function (){
     
	    $("#ecrit").removeClass("ecrithover").addClass("ecrit");
    });
	
	$('.son').click(function() {
		$('#voix').playMedia();
	});

  });

// Animation complete.

// Bonus pédagogique
	$('#btnPlus').click(function() {
		// Bonus activé si la chouette ne s'est pas déjà envolée
		if (! $('#chouette').hasClass('envol'))
		{
			// Envol de la chouette
			$('#chouette').addClass('envol');
			// Affichage en fondu lent de la bulle après 2 s d'attente
			$('#bulle1BIG').delay(2000).fadeIn('slow', 'easeInOutCubic');
			
			// En cas de click sur la chouette...
			$('#chouette').click(function() {
				// Désactivation du click de souris et fin d'envol
				// $(this).unbind().removeClass('envol');
				$(this).unbind().removeClass('envol').addClass('atterrissage');
				// Fondu lent de la bulle
				$('#bulle1BIG').fadeOut('slow', 'easeInOutCubic');
			});
		}
	});
