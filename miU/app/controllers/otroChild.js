/* Toma los atributos al instanciar este controlador */
	var args = arguments[0] || {};
 
/* Selecciona el título de la fila y su imagen con los atributos title e icon correspondientemente  */
	$._L_rowTitle.setText(args.title || "Row Unknown");
	$._I_otro.setImage(args.icon);

/* Se abre una url al hacer click, adquirida por el atributo url */
	$.row.addEventListener('click', function(e){
	    Titanium.Platform.openURL(args.url);
	});
