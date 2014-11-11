var rows = [];
var otroChild=Alloy.createCollection('otro');   //Se instancia a la collección del modelo    

    /****************************************************************************************************************************/
var offset = 0;
var limit = 20;
var ready = true;
var baseUrl = "http://webdev.uigv.ni7.co/api/otros/lista/";
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        //var ready;
        json = JSON.parse(this.responseText);
        //alert(json.length);
        for (i=0; i<json.length; i++){
            otroChild.push(Alloy.createModel('otro', {
                id:   json[i].id,
                name: json[i].name,
                icon: json[i].image,
                url:  json[i].url
            }));
        }
        for (var i = 0; i < otroChild.length; i++) {
            var model = otroChild.at(i);
            id = model.get("id");
            title = "" + model.get("name");
            url = "" + model.get("url");
            icon = "" + model.get("icon");
            var newRow = Alloy.createController("otroChild",{id : id, title : title, url : url, icon: icon});
            $._Tbl_otro.appendRow(newRow.getView());
        }
    },
    onerror: function(e) {
        alert('Error: ' + e.error);
    },
    timeout:30000
});
xhr.open("GET", baseUrl+"?offset="+offset+"&limit="+limit);
xhr.send();
/******/
//Paginación

$._Tbl_otro.addEventListener('scroll', function(e) {
    // Es necesario saber si es android o no, ya que en android no existen las propiedades de contentOffset pero si 
    // existen propiedades como visibleItemCount que determina el número de filas que se están visualizando, en pocas palabras,
    // en android se tiene en cuenta el evento de scroll con el número de filas y en iOS con las distancias
    
    if (Titanium.Platform.getOsname()=='android'){
        var tolerance = 8; //Tolerancia de paginación dada en número de filas
        if(e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + tolerance){            
            if (ready){
                ready = false;
                offset += limit;
                
                var xhr = Ti.Network.createHTTPClient({
                    onload: function(e) {
                        json = JSON.parse(this.responseText);
                        //alert(json.length);
                        for (i=0; i<json.length;i++){ //Ciclo de adquisición de modelos
                            otroChild.push(Alloy.createModel('otro', {
                                id: json[i].id,
                                name: json[i].name,
                                icon: json[i].image,
                                url:  json[i].url
                            }));
                        }
                        //Agregar a la tabla los nuevos ítems
                        var start =  $._Tbl_otro.getData()[0].rows.length;
                        var stop = start + limit;
                        if (stop > otroChild.length) stop = otroChild.length;
                        for (i = start; i < stop; i++) {
                            var model = otroChild.at(i);
                            id = model.get("id");
                            title = "" + model.get("name");
                            url = "" + model.get("url");
                            icon = "" + model.get("icon");
                            var newRow = Alloy.createController("otroChild",{id : id, title : title, url : url, icon: icon});
                            $._Tbl_otro.appendRow(newRow.getView());
                        }
                        
                        
                    },
                    ondatastream: function(e){
                        ready = true;
                    },
                    onerror: function(e) {
                        alert('Error: ' + e.error);
                    },
                    timeout:30000
                });
                xhr.open("GET", baseUrl+"?offset="+offset+"&limit="+limit);
                xhr.send();
            }
        }
    }else{
        var tolerance = 100; //Tolerancia de paginación dada en pixeles para IOs
        if(e.contentSize.height < e.contentOffset.y + e.size.height + tolerance){
            if (ready){
                ready = false;
                offset += limit;
                var xhr = Ti.Network.createHTTPClient({
                    onload: function(e) {
                        //var ready;
                        json = JSON.parse(this.responseText);
                        //alert(json.length);
                        for (i=0; i<json.length;i++){
                            otroChild.push(Alloy.createModel('otro', {
                                id: json[i].id,
                                name: json[i].name,
                                icon: json[i].image,
                                url:  json[i].url
                            }));
                        }
                        //Agregar a la tabla los nuevos ítems
                        var start =  $._Tbl_otro.getData()[0].rows.length;
                        var stop = start + limit;
                        if (stop>otroChild.length) stop = otroChild.length;
                        for (i = start; i < stop; i++) {
                            var model = otroChild.at(i);
                            id = model.get("id");
                            title = "" + model.get("name");
                            url = "" + model.get("url");
                            icon = "" + model.get("icon");
                            var newRow = Alloy.createController("otroChild",{id : id, title : title, url : url, icon: icon});
                            $._Tbl_otro.appendRow(newRow.getView());
                        }
                        
                        
                    },
                    ondatastream: function(e){
                        ready = true;
                    },
                    onerror: function(e) {
                        Ti.API.debug(e.error);
                        alert('Error: ' + e.error);
                    },
                    timeout:30000
                });
                xhr.open("GET", baseUrl+"?offset="+offset+"&limit="+limit);
                xhr.send();
            }
        }
    }
});


/* Se exporta un método del controlador que abra la ventana */
	
	exports.open = function() {
	    $._W_otro.open();
	};

/* Se cierra la ventana cuando el usuario desea volver a la principal */
	$._L_back.addEventListener('click', function(e) {
	    $._W_otro.close();
	});
	$._W_otro.addEventListener('android:back',function(e){
	    $._W_otro.close();
	});

