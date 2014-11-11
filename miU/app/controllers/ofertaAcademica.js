var ofertaAcademicaChild=Alloy.createCollection('ofertaAcademica');   //Se instancia a la collección del modelo

var rows=[];
var currentFacultad = "";   // Por defecto no tiene seleccionada ninguna facultad
var facultades = [];        // Vector que almacena las facultades
var newRow = [];
var questAPI = '';
var facultadAPI = '';
var readyToScroll = false; //Indica si se está listo para hacer Scroll y pedir más datos

rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
facultades[0]=$._Tbl_facultades.getData()[0].rows[0];


var baseUrl = "http://webdev.uigv.ni7.co/api/ofertaAcademica_facultades/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert('id=' + json[0].id + '\nname=' + json[0].name);
        
        for (i=0; i<json.length; i++){
            newRow = Alloy.createController("ofertaAcademicaChild",{ id : json[i].id, name: json[i].name, programLength : json[i].programLength, detailEvent : false});
            facultades.push(newRow.getView());
        }
        $._Tbl_facultades.setData(facultades);
        limitAPI = 30;
        offsetAPI = 0;
        readyToScroll=true;
        //
    },
    onerror: function(e) {
        Ti.API.debug(e.error);
        alert('Error: ' + e.error);
    },
    timeout:30000
});
//alert(baseUrl);
xhr.open("GET", baseUrl);
xhr.send();


var offsetAPI = 0;
var limitAPI = 30;
var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert(json.length);
        readable = true;
        for (i=0; i<json.length; i++){
            ofertaAcademicaChild.push(Alloy.createModel('ofertaAcademica', {
                id:   json[i].id,
                name: json[i].name,
                image: json[i].image
            }));
        }
        if (json.length<limitAPI) readable = false;
        for (var i = 0; i < ofertaAcademicaChild.length; i++) {
            var model = ofertaAcademicaChild.at(i);
            id = model.get("id");
            name = "" + model.get("name");
            image = "" + model.get("image");
            var newRow = Alloy.createController("ofertaAcademicaChild",{id : id, name : name, image : image, detailEvent : true});
            $._Tbl_ofertaAcademica.appendRow(newRow.getView());
        }
        //
        readyToScroll = true;
    },
    
    onerror: function(e) {
        Ti.API.debug(e.error);
        alert('Error: ' + e.error);
    },
    timeout:30000
});
strAPI = baseUrl+ "?offset=" + offsetAPI + "&limit=" + limitAPI;
//alert(strAPI);
xhr.open("GET", strAPI);
xhr.send();
    
    
    
/* Se exporta un método del controlador que abra la ventana */
    var oferCurrent = false;
    exports.open = function() {
        $._W_ofertaAcademica.open();
    };










/* Selecciòn de programa Cuando el usuario hace click en la tabla facultades*/

$._Tbl_facultades.addEventListener('click', function(e){
        //Se guarda el título de la fila seleccionada que para el caso es la facultad seleccionada
        if(Titanium.Platform.getName()==='android'){  //Si es android las filas tienen el parámetro title pero no myFilter, 
                                                      //esto para organizar, más información en child.js
            if ((e.rowData.title) && (e.rowData.title != $._L_facultades.getText())){
                currentFacultad = e.rowData.title;
                correctClick=true;
            }else{
                correctClick=false;
            }
        }else{ //Si es iOS las filas tienen el parámetro myFilter pero no title, esto para organizar, más información en child.js
            if (e.rowData.myFilter){
                currentFacultad = e.rowData.myFilter;
                correctClick=true;
            }else{
                correctClick=false;
            }
        }
        if (correctClick){
                
            var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function(e) {
                    //var ready;
                    readyToScroll=false;
                    json = JSON.parse(this.responseText);
                    ofertaAcademicaChild = [];
                    ofertaAcademicaChild = Alloy.createCollection('ofertaAcademica');
                    //alert(json.length);
                    readable = true;
                    for (i=0; i<json.length; i++){
                        ofertaAcademicaChild.push(Alloy.createModel('ofertaAcademica', {
                            id:   json[i].id,
                            name: json[i].name,
                            image: json[i].image
                        }));
                    }
                    if (json.length<limitAPI) readable = false;
                    
                    rows=[];
                    $._L_ofertaAcademica.setText(currentFacultad.toUpperCase());
                    rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
                    
                    for (var i = 0; i < ofertaAcademicaChild.length; i++) {
                        var model = ofertaAcademicaChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        var newRow = Alloy.createController("ofertaAcademicaChild",{id : id, name : name, image : image, detailEvent : true});
                        rows.push(newRow.getView()); 
                    }
                    $._Tbl_ofertaAcademica.data=[];
                    $._Tbl_ofertaAcademica.setData(rows);
                    
                    
                    $._V_ofertaAcademica.show();
                    $._V_facultades.hide();
                    $._L_back.setText("    Facultades    ");
                    $._L_actual.setText("Programas");
                    $._L_alterno.hide();
                    oferCurrent = true;
                    readyToScroll = true;
                },
                
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert('Error: ' + e.error);
                },
                timeout:30000
            });
            facultadAPI = e.row.categoryID;
            strAPI = baseUrl + "?facultad=" + facultadAPI;
            
            $._Tbl_ofertaAcademica.search.setValue('');
            limitAPI = 30;
            offsetAPI = 0;
            if (offsetAPI) strAPI+="&offset=" + offsetAPI;
            if (limitAPI) strAPI+="&limit=" + limitAPI;
            //alert(strAPI);
            xhr.open("GET", strAPI);
            xhr.send(); 
        }
    });



/* Búsqueda de programas por nombre */
    $._Tbl_ofertaAcademica.search.addEventListener('return', function(e){
        
        questAPI = e.value;
        
        var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function(e) {
                readyToScroll=false;
                json = JSON.parse(this.responseText);
                //alert(json.length);
                ofertaAcademicaChild = [];
                ofertaAcademicaChild = Alloy.createCollection('ofertaAcademica');
                for (i=0; i<json.length; i++){
                    ofertaAcademicaChild.push(Alloy.createModel('ofertaAcademica', {
                        id:   json[i].id,
                        name: json[i].name,
                        image: json[i].image
                    }));
                }
                //
                rows=[];
                $._L_ofertaAcademica.setText(currentFacultad.toUpperCase());
                rows[0] = $._Tbl_ofertaAcademica.getData()[0].rows[0];
                for (var i = 0; i < ofertaAcademicaChild.length; i++) {
                    var model = ofertaAcademicaChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    var newRow = Alloy.createController("ofertaAcademicaChild",{id : id, name : name, image : image, detailEvent : true});
                    rows.push(newRow.getView());  
                    
                }
                //Se actualiza la información en la tabla de ofertaAcademica
                $._Tbl_ofertaAcademica.data = [];
                $._Tbl_ofertaAcademica.setData(rows);
                readyToScroll=true;
                //
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert('Error: ' + e.error);
            },
            timeout:30000
        });
        strAPI = baseUrl + "?q=" + questAPI;
        if (facultadAPI) strAPI+="&facultad=" + facultadAPI;
        offserAPI=0;
        limitAPI=30;
        if (offsetAPI) strAPI+="&offset=" + offsetAPI;
        if (limitAPI) strAPI+="&limit=" + limitAPI;
        //alert(strAPI);
        xhr.open("GET", strAPI);
        xhr.send();
        
        $._Tbl_ofertaAcademica.search.blur();
      
    });
    
    
/*Paginación*/
$._Tbl_ofertaAcademica.addEventListener('scroll', function(e) {
    // Es necesario saber si es android o no, ya que en android no existen las propiedades de contentOffset pero si 
    // existen propiedades como visibleItemCount que determina el número de filas que se están visualizando, en pocas palabras,
    // en android se tiene en cuenta el evento de scroll con el número de filas y en iOS con las distancias
    //alert('point0');
    if (Titanium.Platform.getOsname()=='android'){
        //alert('point1');
        var tolerance = 8; //Tolerancia de paginación dada en número de filas
        if(e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance){            
            if (readyToScroll){
                readyToScroll = false;
                if (readable){
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                            //alert(json.length);
                            readable = true;
                            for (i=0; i<json.length; i++){
                                ofertaAcademicaChild.push(Alloy.createModel('ofertaAcademica', {
                                    id:   json[i].id,
                                    name: json[i].name,
                                    image: json[i].image
                                }));
                            }
                            if (json.length<limitAPI) readable = false;
                            for (i = 0; i < json.length; i++) {
                                var model = ofertaAcademicaChild.at(i+offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("ofertaAcademicaChild",{id : id, name : name, image : image, detailEvent : true});
                                $._Tbl_ofertaAcademica.appendRow(newRow.getView());
                            }
                            readyToScroll = true;  
                            
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert('Error: ' + e.error);
                        },
                        timeout:30000
                    });
                    strAPI = baseUrl+"?offset="+offsetAPI+"&limit="+limitAPI;
                    if (facultadAPI) strAPI += "&facultad="+facultadAPI;
                    questAPI = $._Tbl_ofertaAcademica.search.getValue();
                    if (questAPI) strAPI += "&q=" + questAPI;
                    //alert(strAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    }else{
        var tolerance = 100; //Tolerancia de paginación dada en pixeles para IOs
        if(e.contentSize.height < e.contentOffset.y + e.size.height + tolerance){
            if (readyToScroll){
                readyToScroll = false;
                if (readable){
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/programas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                                //alert(json.length);
                                readable = true;
                                for (i=0; i<json.length; i++){
                                    ofertaAcademicaChild.push(Alloy.createModel('ofertaAcademica', {
                                        id:   json[i].id,
                                        name: json[i].name,
                                        image: json[i].image
                                    }));
                                }
                                //Agregar a la tabla los nuevos ítems
                                if (json.length<limitAPI) readable = false;
                                for (i = 0; i <  json.length; i++) {
                                    var model = ofertaAcademicaChild.at(i+offsetAPI);
                                    id = model.get("id");
                                    name = "" + model.get("name");
                                    image = "" + model.get("image");
                                    var newRow = Alloy.createController("ofertaAcademicaChild",{id : id, name : name, image : image, detailEvent : true});
                                    $._Tbl_ofertaAcademica.appendRow(newRow.getView());
                                }
                            readyToScroll=true;
                            
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert('Error: ' + e.error);
                        },
                        timeout:30000
                    });
                    strAPI = baseUrl+"?offset="+offsetAPI+"&limit="+limitAPI;
                    if (facultadAPI) strAPI += "&facultad="+facultadAPI;
                    questAPI = $._Tbl_ofertaAcademica.search.getValue();
                    if (questAPI) strAPI += "&q=" + questAPI;
                    //alert(strAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    }
});    
    
    
    


/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_alterno.addEventListener('click', function(){
        $._V_facultades.hide();
        $._V_ofertaAcademica.show();
        $._L_back.setText("    Facultades    ");
        $._L_actual.setText("Programas");
        $._L_alterno.hide();
        oferCurrent = true;
    });
    $._L_back.addEventListener('click', function() {
        $._Tbl_facultades.search.blur();
        $._Tbl_ofertaAcademica.search.blur();
        $._V_ofertaAcademica.hide();
        if (!oferCurrent){
            $._W_ofertaAcademica.close();
        }else{
            $._V_facultades.show();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Facultades");
            $._L_alterno.show();
            oferCurrent = false;
        }
    });
    $._W_ofertaAcademica.addEventListener('android:back', function(){
        $._W_ofertaAcademica.close();
        $._Tbl_ofertaAcademica.search.blur();
        $._Tbl_facultades.search.blur();
    });
    
/* Búsqueda de personas por nombre cuando se cancela se quita el teclado */
    $._Tbl_facultades.search.addEventListener('cancel', function(e){
        $._Tbl_facultades.search.blur();
    });
    
    $._Tbl_ofertaAcademica.search.addEventListener('cancel', function(e){
        $._Tbl_ofertaAcademica.search.blur();
    });
//Necesario para que no haga focus en la barra de búsqueda
    $._W_ofertaAcademica.addEventListener('open', function(){
        $._Tbl_ofertaAcademica.search.hide();
        $._Tbl_facultades.search.hide();
        if(Titanium.Platform.getOsname()=='android'){
            setTimeout(function(){
                $._Tbl_facultades.search.show();
                $._Tbl_ofertaAcademica.search.show();
            },1000);
        }else{
            setTimeout(function(){
                $._Tbl_facultades.search.show();
                $._Tbl_ofertaAcademica.search.show();
            },50);    
        }
        
    });