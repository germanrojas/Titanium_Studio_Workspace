/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
    
/* Se exporta un método del controlador que abra la ventana */
	exports.open = function(){
		$._W_contactoMail.open();
	};
    
    $._W_contactoMail.setToRecipients([args.email]);
    
    //Si se desea agregar un archivo adjunto:
        //var f = Ti.Filesystem.getFile('cricket.wav');
        //$._W_contacto.addAttachment(f);

    