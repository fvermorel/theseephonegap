function loadAssets (assets, callback) {
	// Vérifie l'existence du loader, sinon le créer
	var loader = $("body > #loader");
	if (loader.length == 0) {
		loader = $("<div>", {
			id: "loader"
		}).appendTo("body");
	}

	if ($.isArray(assets)) {
		var total = assets.length,
			current = 0;
		
		var verifProgression = function() {
			current ++;
			if (current == total) {
				loader.fadeOut("fast", function() { this.remove() });
				callback();
			}
		};
		
		$.each(assets, function(i, url) {
			var extension = url.substr((url.lastIndexOf('.') +1));
			switch(extension) {
				case "jpg":
				case "png":
				case "gif":
					// Chargement d'image
					$("<img>", {
						"src": url
					}).load(function() { verifProgression() })
					.appendTo(loader);
					break;
				case "mp3":
				case "ogg":
					// Chargement de son
					$("<audio>", {
						"src": url,
						"preload": "auto",
						"onloadeddata": function() { verifProgression() }
					}).appendTo(loader);
					break;
				default:
					alert("fichier non reconnu durant le chargement : " + url);
			}
		});
	}
}
