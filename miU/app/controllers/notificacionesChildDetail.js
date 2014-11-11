/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
    /* Selecciona el título de la fila como 2 textos, celular y el email  */
    $._L_title.setText(args.name || "Name Unknown");
    $._L_description.setText(args.description.replace(/<.*>/, '\n') || "-"); //El replace es para eliminar las etiquetas HTML que puede contener
    
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_notificacionesChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_notificacionesChildDetail.close();
    });
    $._W_notificacionesChildDetail.addEventListener('android:back',function(e){
        $._W_notificacionesChildDetail.close();
    });