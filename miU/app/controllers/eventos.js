var eventosChild=Alloy.createCollection('eventos');   //Se instancia a la collección del modelo
var readable=true; //Variable que determina si es o no posible pedir más datos para la paginación
/*Se anexan algunos modelos a la colección*/

var rows=[];
var currentCategory = "";   //Por defecto no tiene nada para mostrar los eventos destacados
var categories = [];        // Vector que almacena las categorias
var newRow = [];
var questAPI = '';
var categoryAPI = '';
var readyToScroll = false; //Indica si se está listo para hacer Scroll y pedir más datos
$._L_eventos.setText("Eventos Destacados");

rows[0] = $._Tbl_eventos.getData()[0].rows[0];

var offsetAPI = 0;
var limitAPI = 30;
var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert(json.length);
        readable = true;
        for (i=0; i<json.length; i++){
            eventosChild.push(Alloy.createModel('eventos', {
                id:   json[i].id,
                name: json[i].name,
                image: json[i].image,
                date:  json[i].date
            }));
        }
        if (json.length<limitAPI) readable = false;
        for (var i = 0; i < eventosChild.length; i++) {
            var model = eventosChild.at(i);
            id = model.get("id");
            name = "" + model.get("name");
            image = "" + model.get("image");
            date = "" + model.get("date");
            var newRow = Alloy.createController("eventosChild",{id : id, name : name, image : image, date : date, detailEvent : true});
            $._Tbl_eventos.appendRow(newRow.getView());
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
//Adquirir todas las categorias, lo que cambia con adquirir eventos es lógicamente la url, no se envian 
//parámetros y cuando se crea el controlador se envia el valor detailEvent en False (Para saber que es una categoría y no un evento)
categories[0]=$._Tbl_categorias.getData()[0].rows[0];
var baseUrl = "http://webdev.uigv.ni7.co/api/eventos_categorias/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert('id=' + json[0].id + '\nname=' + json[0].name);
        
        for (i=0; i<json.length; i++){
            newRow = Alloy.createController("eventosChild",{ id : json[i].id, name: json[i].name, eventosLength : json[i].eventosLength, detailEvent : false});
            categories.push(newRow.getView());
        }
        $._Tbl_categorias.setData(categories);
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



    
/* Se exporta un método del controlador que abra la ventana */
    var eventCurrent = true;
    exports.open = function() {
        $._W_eventos.open();
    };
    
/* Selecciòn de evento Cuando el usuario hace click en la tabla categorias*/

    $._Tbl_categorias.addEventListener('click', function(e){
        //Se guarda el título de la fila seleccionada que para el caso es la categoria seleccionada
        if(Titanium.Platform.getName()==='android'){  //Si es android las filas tienen el parámetro title pero no myFilter, 
                                                      //esto para organizar, más información en child.js
            if ((e.rowData.title) && (e.rowData.title != $._L_categorias.getText())){
                currentCategory = e.rowData.title;
                correctClick=true;
            }else{
                correctClick=false;
            }
        }else{ //Si es iOS las filas tienen el parámetro myFilter pero no title, esto para organizar, más información en child.js
            if (e.rowData.myFilter){
                currentCategory = e.rowData.myFilter;
                correctClick=true;
            }else{
                correctClick=false;
            }
        }
        if (correctClick){
                    
            var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function(e) {
                    readyToScroll=false;
                    //var ready;
                    json = JSON.parse(this.responseText);
                    eventosChild = [];
                    eventosChild = Alloy.createCollection('eventos');
                    readable = true;
                    for (i=0; i<json.length; i++){
                        eventosChild.push(Alloy.createModel('eventos', {
                            id:   json[i].id,
                            name: json[i].name,
                            image: json[i].image,
                            date:  json[i].date
                        }));
                    }
                    if (json.length<limitAPI) readable = false;
                    //
                    rows=[];
                    $._L_eventos.setText(currentCategory.toUpperCase());
                    rows[0] = $._Tbl_eventos.getData()[0].rows[0];
                    //alert('length: '+eventosChild.length);
                    for (var i = 0; i < eventosChild.length; i++) {
                        var model = eventosChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        date = "" + model.get("date");
                        var newRow = Alloy.createController("eventosChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                        rows.push(newRow.getView());  
                        
                    }
                    //Se actualiza la información en la tabla de eventos
                        $._Tbl_eventos.data=[];
                        $._Tbl_eventos.setData(rows);
                        //Ya que seleccionó una categoría, debe visualizar los eventos correspondientes
                        $._V_eventos.show();
                        $._V_categorias.hide();
                        //Ahora como se vizualisan los eventos, debe cambiarse el menù de la vista _V_back, de forma tal que pueda filtrar de nuevo o volver
                        //menú principal
                        $._L_back.setText("    Principal    ");
                        $._L_actual.setText("Eventos");
                        $._L_alterno.show();
                        eventCurrent = true;
                    //
                    readyToScroll=true;
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert('Error: ' + e.error);
                },
                timeout:30000
            });
            categoryAPI = e.row.categoryID;
            strAPI = baseUrl + "?category=" + categoryAPI;
            
            $._Tbl_eventos.search.setValue('');
            limitAPI = 30;
            offsetAPI = 0;
            if (offsetAPI) strAPI+="&offset=" + offsetAPI;
            if (limitAPI) strAPI+="&limit=" + limitAPI;
            //alert(strAPI);
            xhr.open("GET", strAPI);
            //alert(strAPI);
            xhr.send();
        }
    });
    
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    
    $._W_eventos.addEventListener('android:back', function(){
        $._W_eventos.close();
        $._Tbl_eventos.search.blur();
    });
    

    $._L_alterno.addEventListener('click', function(){
        
        $._V_categorias.show();
        $._V_eventos.hide();
        $._L_back.setText("    Atrás    ");
        $._L_actual.setText("Categorías");
        $._L_alterno.hide();
        eventCurrent = false;
    });
    $._L_back.addEventListener('click', function() {
        $._Tbl_eventos.search.blur();
        $._V_eventos.show();
        if (eventCurrent){
            $._W_eventos.close();
        }else{
            $._V_categorias.hide();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Eventos");
            $._L_alterno.show();
            eventCurrent = true;
        }
    });
    
/* Búsqueda de eventos por nombre, cuando se cancela se quita el teclado */
    $._Tbl_eventos.search.addEventListener('cancel', function(e){
        $._Tbl_eventos.search.blur();
    });
    
/* Búsqueda de eventos por nombre */
    $._Tbl_eventos.search.addEventListener('return', function(e){
        
        questAPI = e.value;
        
        var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function(e) {
                //var ready;
                readyToScroll=false;
                json = JSON.parse(this.responseText);
                //alert(json.length);
                eventosChild = [];
                eventosChild = Alloy.createCollection('eventos');
                for (i=0; i<json.length; i++){
                    eventosChild.push(Alloy.createModel('eventos', {
                        id:   json[i].id,
                        name: json[i].name,
                        image: json[i].image,
                        date:  json[i].date
                    }));
                }
                //
                rows=[];
                $._L_eventos.setText(currentCategory.toUpperCase());
                rows[0] = $._Tbl_eventos.getData()[0].rows[0];
                for (var i = 0; i < eventosChild.length; i++) {
                    var model = eventosChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    date = "" + model.get("date");
                    var newRow = Alloy.createController("eventosChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                    rows.push(newRow.getView());  
                    
                }
                //Se actualiza la información en la tabla de eventos
                $._Tbl_eventos.data = [];
                $._Tbl_eventos.setData(rows);
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
        if (categoryAPI) strAPI+="&category=" + categoryAPI;
        offserAPI=0;
        limitAPI=30;
        if (offsetAPI) strAPI+="&offset=" + offsetAPI;
        if (limitAPI) strAPI+="&limit=" + limitAPI;
        //alert(strAPI);
        xhr.open("GET", strAPI);
        xhr.send();
        
        $._Tbl_eventos.search.blur();
      
    });
    
/*Paginación*/
$._Tbl_eventos.addEventListener('scroll', function(e) {
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                            //alert(json.length);
                            readable = true;
                            for (i=0; i<json.length; i++){
                                eventosChild.push(Alloy.createModel('eventos', {
                                    id:   json[i].id,
                                    name: json[i].name,
                                    image: json[i].image,
                                    date:  json[i].date
                                }));
                            }
                            if (json.length<limitAPI) readable = false;
                            for (i = 0; i < json.length; i++) {
                                var model = eventosChild.at(i+offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("eventosChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                                $._Tbl_eventos.appendRow(newRow.getView());
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
                    if (categoryAPI) strAPI += "&category="+categoryAPI;
                    questAPI = $._Tbl_eventos.search.getValue();
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/eventos/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                                //alert(json.length);
                                readable = true;
                                for (i=0; i<json.length; i++){
                                    eventosChild.push(Alloy.createModel('eventos', {
                                        id:   json[i].id,
                                        name: json[i].name,
                                        image: json[i].image,
                                        date:  json[i].date
                                    }));
                                }
                                //Agregar a la tabla los nuevos ítems
                                if (json.length<limitAPI) readable = false;
                                for (i = 0; i <  json.length; i++) {
                                    
                                    var model = eventosChild.at(i+offsetAPI);
                                    id = model.get("id");
                                    name = "" + model.get("name");
                                    image = "" + model.get("image");
                                    date = "" + model.get("date");
                                    var newRow = Alloy.createController("eventosChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                                    $._Tbl_eventos.appendRow(newRow.getView());
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
                    if (categoryAPI) strAPI += "&category="+categoryAPI;
                    questAPI = $._Tbl_eventos.search.getValue();
                    if (questAPI) strAPI += "&q=" + questAPI;
                    //alert(strAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }
    }
});
//Necesario para que no haga focus en la barra de búsqueda cuando se abre la ventana
    $._W_eventos.addEventListener('open',function(){
        
        $._Tbl_eventos.search.hide();
        if(Titanium.Platform.getOsname()=='android'){
            setTimeout(function(){
                $._Tbl_eventos.search.show();
            },1000);
        }else{
            setTimeout(function(){
                $._Tbl_eventos.search.show();
            },50);
        }
    });