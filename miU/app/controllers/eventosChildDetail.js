/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
 
/* Selecciona el título de la fila como 2 textos, celular e email  */
    
    if (args.persons.length>1) strPersons="Personas Encargadas: \n";
    else if (args.persons.length) strPersons="Persona Encargada:\n";
    else strPersons="";
    
    if (args.categories.length>1) strCategories="Categorías Relacionadas:\n";
    else if (args.categories.length) strCategories="Categoría Relacionada:\n";
    else strCategories="";
    
    for (var i=0; i<args.persons.length; i++){
        strPersons += '\t' + args.persons[i] + '\n';
    }
    for (var i=0; i<args.categories.length; i++){
        strCategories += '\t' + args.categories[i] + '\n';
    }
    
    $._L_title.setText(args.name || "-");
    $._L_info.setText((strPersons || "-") + 
                       '\n' + (args.date || "-") +
                       '\nTiempo estimado: ' + (args.duration || "-") +
                       '\n' + (strCategories || "-"));
    
    $._L_description.setText(args.description.replace(/<.*>/, '\n') || "-"); //El replace es para eliminar las etiquetas HTML que puede contener
    
                       
    $._I_evento.setImage(args.image || "/images/unknown/image.jpg");
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_eventosChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_eventosChildDetail.close();
    });
    $._W_eventosChildDetail.addEventListener('android:back',function(e){
        $._W_eventosChildDetail.close();
    });
    