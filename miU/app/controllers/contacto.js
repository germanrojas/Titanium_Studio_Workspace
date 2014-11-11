var contactoChild=Alloy.createCollection('contacto');   //Se instancia a la collección del modelo

    contactoChild.push(Alloy.createModel('contacto', {
        name:"Admisiones",
        address: "Av. San Felipe 890, Jesús María",
        local:"Edificio A piso 5",
        phone: '460-2976 / 460-1586 / 471-1748 anexo 1167/1168',
        email: "admisiones@uigv.edu.co",
        description: "Al cumplir 47 años, la Universidad Inca Garcilaso de la Vega viene formando profesionales de alta calidad académica y científico-humanista, e investigadores en el campo de las humanidades y nuevas tecnologías; yendo de la mano con la realidad nacional y extendiendo su servicio a toda la comunidad.  Son miles los garcilasinos que están por todo el Perú, devolviendo con creces la formación recogida con esfuerzo en nuestras aulas. También son miles los que están formándose para incrementar este ejército de civilidad democrática que pugna y tiene la esperanza de vivir un Perú mejor."
    }));
    contactoChild.push(Alloy.createModel('contacto', {
        name:"Vicerrectorado",
        address: "Av. San Felipe 890, Jesús María",
        local:"",
        phone: '471-1748 - anexo: 1101',
        email: "vrac@uigv.edu.pe",
        description: ""
    }));
    contactoChild.push(Alloy.createModel('contacto', {
        name:"Gerencia General",
        address: "Av. San Felipe 890, Jesús María",
        local:"",
        phone: '461-2745 - anexo: 3701',
        email: "gerenciageneral@uigv.edu.pe",
        description: ""
    }));
    contactoChild.push(Alloy.createModel('contacto', {
        name:"Centro de Cómputo General",
        address: "Av. Bolívar 165 - Pueblo Libre",
        local:"",
        phone: '463-0000 - anexo: 4101',
        email: "computo@uigv.edu.pe",
        description: ""
    }));
    
    /*Se recorre la colección y se genera una fila por cada modelo para agregar los ítems al picker*/
    for (var i = 0; i < contactoChild.length; i++) {
        var model = contactoChild.at(i);
        $._Pkr_dependencias.add(Titanium.UI.createPickerRow({title: model.get("name")}));
    }
    
    var currentModel=contactoChild.at(0);  //La primera opción siempre es el modelo con index 0

    $._L_titleDepend.setText(currentModel.get("name"));
    $._L_infoDepend.setText("Teléfono: " + currentModel.get("phone") +
                            "\n" + currentModel.get("address") + " - " + currentModel.get("local") +
                            "\n" + currentModel.get("email"));
    $._L_descriptionDepend.setText(currentModel.get("description"));
    
    $._Pkr_dependencias.addEventListener("change", function(e){
    currentModel=contactoChild.at(e.rowIndex);
        $._L_titleDepend.setText(currentModel.get("name"));
        $._L_infoDepend.setText("Teléfono: " + currentModel.get("phone") +
                       "\n" + currentModel.get("address") + " - " + currentModel.get("local") +
                       "\n" + currentModel.get("email"));
        $._L_descriptionDepend.setText(currentModel.get("description"));
    });
    
    
    $._V_send.addEventListener("click", function(){
        email = "" + currentModel.get("email");
        var contact = Alloy.createController('contactoMail', {email: email});
        contact.open();
    });
    
/* Se exporta un método del controlador que abra la ventana */
    exports.open = function() {
        $._W_contacto.open();
    };

/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function() {
        $._W_contacto.close();
    });
    
    $._W_contacto.addEventListener('android:back',function(){
        $._W_contacto.close();
    });