var mapaSedeChild=Alloy.createCollection('mapaSede');   //Se instancia a la collección del modelo



/*Se recorre la colección y se genera una fila por cada modelo para la visualización, cada fila es una instancia del controlador mapaSedeChild*/
    var rows = [];
    var offsetAPI = 0;
    var limitAPI = 30;
    var readyToScroll = false;
    var readable=true;

var offsetAPI = 0;
var limitAPI = 30;
var baseUrl = "http://webdev.uigv.ni7.co/api/lugares/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert(json.length);
        readable = true;
        for (i=0; i<json.length; i++){
            mapaSedeChild.push(Alloy.createModel('mapaSede', {
                id:   json[i].id,
                name: json[i].name,
                image: json[i].image,
                phone:  json[i].phone
            }));
        }
        if (json.length<limitAPI) readable = false;
        for (var i = 0; i < mapaSedeChild.length; i++) {
            var model = mapaSedeChild.at(i);
            id = model.get("id");
            name = "" + model.get("name");
            image = "" + model.get("image");
            phone = "" + model.get("phone");
            var newRow = Alloy.createController("mapaSedeChild",{id : id, name : name, image : image, phone : phone, detailEvent : true});
            $._Tbl_mapaSede.appendRow(newRow.getView());
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


/* Search */
$._Tbl_mapaSede.search.addEventListener('return', function(e){
        //alert("Estás buscando bien =D");
        questAPI = e.value;
        
        var baseUrl = "http://webdev.uigv.ni7.co/api/lugares/lista/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                //var ready;
                readyToScroll=false;
                json = JSON.parse(this.responseText);
                //alert(json.length);
                mapaSedeChild = [];
                mapaSedeChild = Alloy.createCollection('mapaSede');
                for (i=0; i<json.length; i++){
                    mapaSedeChild.push(Alloy.createModel('mapaSede', {
                        id:   json[i].id,
                        name: json[i].name,
                        phone: json[i].phone,
                        image: json[i].photo
                    }));
                }
                //
                rows=[];
                for (var i = 0; i < mapaSedeChild.length; i++) {
                    var model = mapaSedeChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    phone = "" + model.get("phone");
                    image = "" + model.get("image");
                    var newRow = Alloy.createController("mapaSedeChild",{id : id, name : name, phone: phone, photo : image});
                    rows.push(newRow.getView());  
                    
                }
                //Se actualiza la información en la tabla
                $._Tbl_mapaSede.appendRow(rows);
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
        if (offsetAPI) strAPI+="&offset=" + offsetAPI;
        if (limitAPI) strAPI+="&limit=" + limitAPI;
        //alert(strAPI);
        xhr.open("GET", strAPI);
        xhr.send();
        
        $._Tbl_mapaSede.search.blur();
    
});

    
    $._Tbl_mapaSede.appendRow(rows);
/* Se exporta un método del controlador que abra la ventana */

    exports.open = function() {
        $._W_mapaSede.open();
    };



/*Paginación*/
$._Tbl_mapaSede.addEventListener('scroll', function(e) {
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/lugares/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                            //alert(json.length);
                            readable = true;
                            for (i=0; i<json.length; i++){
                                mapaSedeChild.push(Alloy.createModel('mapaSede', {
                                    id:   json[i].id,
                                    name: json[i].name,
                                    image: json[i].image,
                                    phone:  json[i].phone
                                }));
                            }
                            if (json.length<limitAPI) readable = false;
                            for (i = 0; i < json.length; i++) {
                                var model = mapaSedeChild.at(i+offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                phone = "" + model.get("phone");
                                var newRow = Alloy.createController("mapaSedeChild",{id : id, name : name, image : image, phone : phone, detailEvent : true});
                                $._Tbl_mapaSede.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_mapaSede.search.getValue();
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/lugares/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                                //alert(json.length);
                                readable = true;
                                for (i=0; i<json.length; i++){
                                    mapaSedeChild.push(Alloy.createModel('mapaSede', {
                                        id:   json[i].id,
                                        name: json[i].name,
                                        image: json[i].image,
                                        phone:  json[i].phone
                                    }));
                                }
                                //Agregar a la tabla los nuevos ítems
                                if (json.length<limitAPI) readable = false;
                                for (i = 0; i <  json.length; i++) {
                                    
                                    var model = mapaSedeChild.at(i+offsetAPI);
                                    id = model.get("id");
                                    name = "" + model.get("name");
                                    image = "" + model.get("image");
                                    phone = "" + model.get("phone");
                                    var newRow = Alloy.createController("mapaSedeChild",{id : id, name : name, image : image, phone : phone});
                                    $._Tbl_mapaSede.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_mapaSede.search.getValue();
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
    $._L_back.addEventListener('click', function(e) {
        $._W_mapaSede.close();
        $._Tbl_mapaSede.search.blur();
    });
    $._W_mapaSede.addEventListener('android:back',function(e){
        $._W_mapaSede.close();
        $._Tbl_mapaSede.search.blur();
    });
 /*Búsqueda de lugares por nombre*/   
    $._Tbl_mapaSede.search.addEventListener('cancel',function(e){
        $._Tbl_mapaSede.search.blur();
    });
 //Necesario para que no haga focus en la barra de búsqueda
    $._W_mapaSede.addEventListener('open',function(){
        $._Tbl_mapaSede.search.hide();
        if(Titanium.Platform.getOsname()=='android'){
            setTimeout(function(){
                $._Tbl_mapaSede.search.show();
            },1000);
        }else{
            setTimeout(function(){
                $._Tbl_mapaSede.search.show();
            },50);
        }
    });
