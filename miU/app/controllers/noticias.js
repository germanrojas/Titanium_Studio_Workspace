var noticiasChild=Alloy.createCollection('noticias');   //Se instancia a la collección del modelo

var rows=[];
// currentCategory toma el valor ingresado como parámetro (que proviene de Child) y si no hay parámetro toma la 
// primera categoría que encuentre
var currentCategory = "";   //Por defecto no tiene nada para mostrar, las noticias destacadas
var categories = [];        // Vector que almacena las categorias
var newRow = [];
var questAPI = '';
var categoryAPI = '';
var readyToScroll = false; //Indica si se está listo para hacer Scroll y pedir más datos


$._L_noticias.setText('Noticias Destacadas');
rows[0] = $._Tbl_noticias.getData()[0].rows[0];


var offsetAPI = 0;
var limitAPI = 30;
var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert(json.length);
        readable = true;
        for (i=0; i<json.length; i++){
            noticiasChild.push(Alloy.createModel('noticias', {
                id:   json[i].id,
                name: json[i].name,
                image: json[i].image,
                date:  json[i].date
            }));
        }
        if (json.length<limitAPI) readable = false;
        for (var i = 0; i < noticiasChild.length; i++) {
            var model = noticiasChild.at(i);
            id = model.get("id");
            name = "" + model.get("name");
            image = "" + model.get("image");
            date = "" + model.get("date");
            var newRow = Alloy.createController("noticiasChild",{id : id, name : name, image : image, date : date, detailEvent : true});
            $._Tbl_noticias.appendRow(newRow.getView());
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
//Adquirir todas las categorias, lo que cambia con adquirir noticias es lógicamente la url, no se envian 
//parámetros y cuando se crea el controlador se envia el valor detailEvent en False (Para saber que es una categoría y no una noticia)
categories[0]=$._Tbl_categorias.getData()[0].rows[0];
var baseUrl = "http://webdev.uigv.ni7.co/api/noticias_categorias/lista/";
var xhr = Ti.Network.createHTTPClient({
    cache: true,
    onload: function(e) {
        //var ready;
        readyToScroll=false;
        json = JSON.parse(this.responseText);
        //alert('id=' + json[0].id + '\nname=' + json[0].name);
        
        for (i=0; i<json.length; i++){
            newRow = Alloy.createController("noticiasChild",{ id : json[i].id, name: json[i].name, noticiasLength : json[i].noticiasLength, detailEvent : false});
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
    var notiCurrent = true;
    exports.open = function() {
        $._W_noticias.open();
    };
    
    
    
/* Selecciòn de categoria Cuando el usuario hace click en la tabla categorias*/

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
                    
            var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/lista/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function(e) {
                    readyToScroll=false;
                    //var ready;
                    json = JSON.parse(this.responseText);
                    noticiasChild = [];
                    noticiasChild = Alloy.createCollection('noticias');
                    readable = true;
                    for (i=0; i<json.length; i++){
                        noticiasChild.push(Alloy.createModel('noticias', {
                            id:   json[i].id,
                            name: json[i].name,
                            image: json[i].image,
                            date:  json[i].date
                        }));
                    }
                    if (json.length<limitAPI) readable = false;
                    //
                    rows=[];
                    $._L_noticias.setText(currentCategory.toUpperCase());
                    rows[0] = $._Tbl_noticias.getData()[0].rows[0];
                    //alert('length: '+noticiasChild.length);
                    for (var i = 0; i < noticiasChild.length; i++) {
                        var model = noticiasChild.at(i);
                        id = model.get("id");
                        name = "" + model.get("name");
                        image = "" + model.get("image");
                        date = "" + model.get("date");
                        var newRow = Alloy.createController("noticiasChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                        rows.push(newRow.getView());  
                        
                    }
                    //Se actualiza la información en la tabla de noticias
                        $._Tbl_noticias.data=[];
                        $._Tbl_noticias.setData(rows);
                        //Ya que seleccionó una categoría, debe visualizar las noticias correspondientes
                        $._V_noticias.show();
                        $._V_categorias.hide();
                        //Ahora como se vizualisan los noticias, debe cambiarse el menù de la vista _V_back, de forma tal que pueda filtrar de nuevo o volver
                        //menú principal
                        $._L_back.setText("    Principal    ");
                        $._L_actual.setText("noticias");
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
            
            $._Tbl_noticias.search.setValue('');
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
    $._W_noticias.addEventListener('android:back', function(){
        $._W_noticias.close();
        $._Tbl_noticias.search.blur();
        $._Tbl_categorias.search.blur();
    });
    
    $._L_alterno.addEventListener('click', function(){
        $._V_categorias.show();
        $._V_noticias.hide();
        $._L_back.setText("    Atrás    ");
        $._L_actual.setText("Categorías");
        $._L_alterno.hide();
        notiCurrent = false;
    });
    $._L_back.addEventListener('click', function() {
        $._Tbl_categorias.search.blur();
        $._Tbl_noticias.search.blur();
        $._V_noticias.show();
        if (notiCurrent){
            $._W_noticias.close();
        }else{
            $._V_categorias.hide();
            $._L_back.setText("    Principal    ");
            $._L_actual.setText("Noticias");
            $._L_alterno.show();
            notiCurrent = true;
        }
    });
/* Búsqueda de noticias por nombre, cuando se cancela se quita el teclado */
    $._Tbl_noticias.search.addEventListener('cancel', function(e){
        $._Tbl_noticias.search.blur();
    });
    
/* Búsqueda de noticias por nombre */
    $._Tbl_noticias.search.addEventListener('return', function(e){
        
        questAPI = e.value;
        
        var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/lista/";
        var xhr = Ti.Network.createHTTPClient({
            cache: true,
            onload: function(e) {
                //var ready;
                readyToScroll=false;
                json = JSON.parse(this.responseText);
                //alert(json.length);
                noticiasChild = [];
                noticiasChild = Alloy.createCollection('noticias');
                for (i=0; i<json.length; i++){
                    noticiasChild.push(Alloy.createModel('noticias', {
                        id:   json[i].id,
                        name: json[i].name,
                        image: json[i].image,
                        date:  json[i].date
                    }));
                }
                //
                rows=[];
                $._L_noticias.setText(currentCategory.toUpperCase());
                rows[0] = $._Tbl_noticias.getData()[0].rows[0];
                for (var i = 0; i < noticiasChild.length; i++) {
                    var model = noticiasChild.at(i);
                    id = model.get("id");
                    name = "" + model.get("name");
                    image = "" + model.get("image");
                    date = "" + model.get("date");
                    var newRow = Alloy.createController("noticiasChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                    rows.push(newRow.getView());  
                    
                }
                //Se actualiza la información en la tabla de noticias
                $._Tbl_noticias.data = [];
                $._Tbl_noticias.setData(rows);
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
        
        $._Tbl_noticias.search.blur();
      
    });
    
/*Paginación*/
$._Tbl_noticias.addEventListener('scroll', function(e) {
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                            //alert(json.length);
                            readable = true;
                            for (i=0; i<json.length; i++){
                                noticiasChild.push(Alloy.createModel('noticias', {
                                    id:   json[i].id,
                                    name: json[i].name,
                                    image: json[i].image,
                                    date:  json[i].date
                                }));
                            }
                            if (json.length<limitAPI) readable = false;
                            for (i = 0; i < json.length; i++) {
                                var model = noticiasChild.at(i+offsetAPI);
                                id = model.get("id");
                                name = "" + model.get("name");
                                image = "" + model.get("image");
                                date = "" + model.get("date");
                                var newRow = Alloy.createController("noticiasChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                                $._Tbl_noticias.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_noticias.search.getValue();
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
                    var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/lista/";
                    var xhr = Ti.Network.createHTTPClient({
                        cache: true,
                        onload: function(e) {
                            json = JSON.parse(this.responseText);
                                //alert(json.length);
                                readable = true;
                                for (i=0; i<json.length; i++){
                                    noticiasChild.push(Alloy.createModel('noticias', {
                                        id:   json[i].id,
                                        name: json[i].name,
                                        image: json[i].image,
                                        date:  json[i].date
                                    }));
                                }
                                //Agregar a la tabla los nuevos ítems
                                if (json.length<limitAPI) readable = false;
                                for (i = 0; i <  json.length; i++) {
                                    
                                    var model = noticiasChild.at(i+offsetAPI);
                                    id = model.get("id");
                                    name = "" + model.get("name");
                                    image = "" + model.get("image");
                                    date = "" + model.get("date");
                                    var newRow = Alloy.createController("noticiasChild",{id : id, name : name, image : image, date : date, detailEvent : true});
                                    $._Tbl_noticias.appendRow(newRow.getView());
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
                    questAPI = $._Tbl_noticias.search.getValue();
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
    $._W_noticias.addEventListener('open',function(){
        
        $._Tbl_noticias.search.hide();
        if(Titanium.Platform.getOsname()=='android'){
            setTimeout(function(){
                $._Tbl_noticias.search.show();
            },1000);
        }else{
            setTimeout(function(){
                $._Tbl_noticias.search.show();
            },50);
        }
    });