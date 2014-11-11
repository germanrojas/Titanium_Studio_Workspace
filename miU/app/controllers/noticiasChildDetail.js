/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
 
/* Selecciona el título de la fila como 2 textos, celular e email  */
    if (args.categories.length>1) strCategories="Categorías Relacionadas:\n";
    else if (args.categories.length) strCategories="Categoría Relacionada:\n";
    else strCategories="";

    $._L_title.setText(args.name || "-");
    $._L_info.setText((args.author || "-") + 
                       '\n' + (args.date || "-") +
                       '\n' + (strCategories || "-"));
    
    $._L_description.setText(args.description.replace(/<.*>/, '\n') || "-"); //El replace es para eliminar las etiquetas HTML que puede contener
    
                       
    $._I_noticia.setImage(args.image || "/images/unknown/image.jpg");
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_noticiasChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_noticiasChildDetail.close();
    });
    $._W_noticiasChildDetail.addEventListener('android:back',function(e){
        $._W_noticiasChildDetail.close();
    });
    