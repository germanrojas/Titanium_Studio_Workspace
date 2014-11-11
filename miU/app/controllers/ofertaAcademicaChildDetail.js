/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
 

    if (args.persons.length>1) strPersons="Personas Encargadas: \n";
    else if (args.persons.length) strPersons="Persona Encargada:\n";
    else strPersons="";
    
    if (args.facultades.length>1) strFacultades="Facultades:\n";
    else if (args.facultades.length) strFacultades="Facultad:\n";
    else strFacultades="";    
    
    for (var i=0; i<args.persons.length; i++){
        strPersons += '\t' + args.persons[i] + '\n';
    }
    for (var i=0; i<args.facultades.length; i++){
        strFacultades += '\t' + args.facultades[i] + '\n';
    }
    
    $._L_title.setText(args.name || "-");
    $._L_info.setText((strPersons || "-") + 
                       '\nSNIES: ' + (args.snies || "-") +
                       '\nDuración: ' + (args.duration || "") +
                       '\n' + (strFacultades || "-"));
    

    $._L_description.setText(args.description.replace(/<.*>/, '\n') || "-"); //El replace es para eliminar las etiquetas HTML que puede contener 
    
                       
    $._I_oferta.setImage(args.photo || "/images/unknown/image.jpg");
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_ofertaAcademicaChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_ofertaAcademicaChildDetail.close();
    });
    $._W_ofertaAcademicaChildDetail.addEventListener('android:back',function(e){
        $._W_ofertaAcademicaChildDetail.close();
    });
    