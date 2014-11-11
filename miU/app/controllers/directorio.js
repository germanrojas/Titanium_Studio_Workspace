//var rows = [];                                  //Almacena las filas que se anexan a la tabla
var dirChild=Alloy.createCollection('directorio');   //Se instancia a la collección del modelo
    
/*Se recorre la colección y se genera una fila por cada modelo para la visualización, cada fila es una instancia del controlador dirChild*/
    var rows = [];
    var offsetAPI = 0;
    var limitAPI = 30;
    var readyToScroll = false;
    var readable=true;

$._Tbl_directorio.search.addEventListener('return', function(e){
    if (e.value.length > 2) {
        //alert("Estás buscando bien =D");
        questAPI = e.value;
        
        var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                //var ready;
                readyToScroll=false;
                json = JSON.parse(this.responseText);
                //alert(json.length);
                dirChild = [];
                dirChild = Alloy.createCollection('directorio');
                for (i=0; i<json.length; i++){
                    dirChild.push(Alloy.createModel('directorio', {
                        id:   json[i].id,
                        name: json[i].name,
                        email: json[i].email,
                        image: json[i].photo
                    }));
                }
                //
                rows=[];
                for (var i = 0; i < dirChild.length; i++) {
                    var model = dirChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    email = "" + model.get("email");
                    image = "" + model.get("image");
                    var newRow = Alloy.createController("dirChild",{id : id, name : name, email: email, photo : image});
                    rows.push(newRow.getView());  
                    
                }
                //Se actualiza la información en la tabla
                $._Tbl_directorio.appendRow(rows);
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
        
        $._Tbl_directorio.search.blur();
        
    }
    else {
        alert("Por favor utilice más de 3 caracteres para realizar la búsqueda");
    }
});

    
    
    
     
/* Se exporta un método del controlador que abra la ventana */

    exports.open = function(){
        $._W_directorio.open();
        $._Tbl_directorio.search.focus();
    };

/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function() {
        $._W_directorio.close();
        $._Tbl_directorio.search.blur();
    });
    $._W_directorio.addEventListener('android:back',function(){
        $._W_directorio.close();
        $._Tbl_directorio.search.blur();
    });
    
/* Paginación */    
    $._Tbl_directorio.addEventListener('scroll', function(e) {
        // Es necesario saber si es android o no, ya que en android no existen las propiedades de contentOffset pero si 
        // existen propiedades como visibleItemCount que determina el número de filas que se están visualizando, en pocas palabras,
        // en android se tiene en cuenta el evento de scroll con el número de filas y en iOS con las distancias
        if (Titanium.Platform.getOsname()=='android'){
            
            if (readyToScroll){
                readyToScroll = false;
                if (readable){
                    offsetAPI += limitAPI;
                    var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                            //alert(json.length);
                            readable = true;
                            for (i=0; i<json.length; i++){
                                dirChild.push(Alloy.createModel('directorio', {
                                    id:   json[i].id,
                                    name: json[i].name,
                                    email: json[i].email,
                                    image: json[i].image
                                }));
                            }
                            if (json.length<limitAPI) readable = false;
                            for (i = 0; i < json.length; i++) {
                                var model = dirChild.at(i+offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                email = "" + model.get("email");
                                image = "" + model.get("image");
                                var newRow = Alloy.createController("dirChild",{id : id, name : name, email : email, image : image});
                                $._Tbl_directorio.appendRow(newRow.getView());
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
                   
                    questAPI = $._Tbl_directorio.search.getValue();
                    if (questAPI) strAPI += "&q=" + questAPI;
                    //alert(strAPI);
                    xhr.open("GET", strAPI);
                    xhr.send();
                }
            }
        }else{
            
            
            
            var tolerance = 100; //Tolerancia de paginación dada en pixeles para IOs
            if(e.contentSize.height < e.contentOffset.y + e.size.height + tolerance){
                if (readyToScroll){
                    readyToScroll = false;
                    if (readable){
                        offsetAPI += limitAPI;
                        var baseUrl = "http://webdev.uigv.ni7.co/api/personas/lista/";
                        var xhr = Ti.Network.createHTTPClient({
                            onload: function(e) {
                                json = JSON.parse(this.responseText);
                                    //alert(json.length);
                                    readable = true;
                                    for (i=0; i<json.length; i++){
                                        dirChild.push(Alloy.createModel('directorio', {
                                            id:   json[i].id,
                                            name: json[i].name,
                                            email: json[i].email,
                                            image: json[i].image
                                        }));
                                    }
                                    //Agregar a la tabla los nuevos ítems
                                    if (json.length<limitAPI) readable = false;
                                    for (i = 0; i <  json.length; i++) {
                                        var model = dirChild.at(i+offsetAPI);
                                        id = model.get("id");
                                        name = "" + model.get("name");
                                        email = "" + model.get("email");
                                        image = "" + model.get("image");
                                        var newRow = Alloy.createController("dirChild",{id : id, name : name, email : email, image : image});
                                        $._Tbl_directorio.appendRow(newRow.getView());
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
                        questAPI = $._Tbl_directorio.search.getValue();
                        if (questAPI) strAPI += "&q=" + questAPI;
                        //alert(strAPI);
                        xhr.open("GET", strAPI);
                        xhr.send();
                    }
                }
            }
        }
    });

    $._Tbl_directorio.search.addEventListener('cancel',function(e){
        $._Tbl_directorio.search.blur();
    });

