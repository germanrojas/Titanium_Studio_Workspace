/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
    
    if (args.areas.length>1) strareas="Áreas:\n";
    else if (args.areas.length) strareas="Área:\n";
    else strareas="";
    
    for (var i=0; i<args.areas.length; i++){
        strareas += '\t' + args.areas[i] + '\n';
    }
    
    /* Selecciona el título de la fila como 2 textos, celular y el email  */
    $._L_title.setText(args.name || "-");
    
    $._L_info.setText((args.cel || "-") + 
                       '\n' + (args.email || "-") + 
                       '\n' + strareas);
    $._I_persona.setImage(args.photo);
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_dirChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_dirChildDetail.close();
    });
    $._W_dirChildDetail.addEventListener('android:back',function(e){
        $._W_dirChildDetail.close();
    });