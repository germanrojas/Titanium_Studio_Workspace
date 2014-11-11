/* Toma los atributos al instanciar este controlador */
	var args = arguments[0] || {};
    var limit=30; //Límite de caracteres en la descripción del meta texto
/* Selecciona el título de la fila y su imagen con los atributos title e icon correspondientemente  */
	$._L_rowTitle.setText(args.name || "-");
	
	if(args.description.length>limit-2) $._L_complemento.setText(args.description.replace(/<.*>/, ' ').substring(0, limit) + '...');
	else $._L_complemento.setText(args.description.replace(/<.*>/, ' '));
    if (!(Titanium.Platform.getName()==='android')){
        $.row.myFilter = args.name;     //myFilter es un atributo que se agrega a la fila para luego en la tabla 
                                        //buscarlos por ese atributo   
    }else{
        $.row.setTitle(args.name || "-");
    }
    $._I_notificaciones.setImage("/images/index_icons/alertas_icon.png");
	$.row.addEventListener('click', function(e){
	    
        var detail = Alloy.createController("notificacionesChildDetail",{name : args.name, description : args.description});
        detail.open();
    });
