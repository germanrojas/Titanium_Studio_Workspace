function decodeLine(encoded) {  //Decodifica los puntos obtenidos por Google Routes
    var len = encoded.length;   //Número de caracteres a analizar
    var index = 0;              //
    var array = [];
    var lat = 0;
    var lng = 0;
 
    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1)); //Si el primer bit de result es 1 se rota result y se niegan los bits de result y se agregan a dlat
                                                                    //Si no, sólo se rota una vez a result sin invertirlo y se agrega a dlat  
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        array.push([lat * 1e-5, lng * 1e-5]);
    } 
    return array;
}
function addRoute(obj) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function (e) {
        var response = this.responseText;
        var json = JSON.parse(response);
        if (json.routes.length){
            var step = json.routes[0].legs[0].steps;
            var intStep = 0, intSteps = step.length, points = [];
            var decodedPolyline, intPoint = 0, intPoints = 0;
            for (intStep = 0; intStep < intSteps; intStep = intStep + 1) {
                decodedPolyline = decodeLine(step[intStep].polyline.points);
                intPoints = decodedPolyline.length;
                for (intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
                    if (decodedPolyline[intPoint] != null) {
                        points.push({
                            latitude: decodedPolyline[intPoint][0],
                            longitude: decodedPolyline[intPoint][1]
                        });
                    }
                }
            }
     
            var route = {
                name: 'RUTA',
                points: points,
                color: '#c60000',
                width: 4
            };
            if(obj.band) $._V_lugar.removeRoute(route);
             
            
            obj.map.addRoute(route);
        }else{
            alert('No es posible calcular una ruta a: ' + args.name || '-');
        }
    };
    xhr.onerror = function (e) {
        alert('Error en la conexión\nNo fue posible cargar la ruta\nAsegurese de estar conectado a internet', JSON.stringify(e));
    };
    var param = [
        'destination=' + obj.stop,
        'origin=' + obj.start,
        'sensor=true'
    ];
    if (obj.region) {
        param.region = obj.region;
    }
    //Prueba para conocer lo que recibe
    //http://maps.googleapis.com/maps/api/directions/json?destination=-74,23432,4.847939&origin=-74,23832,4.84639&sensor=false
    xhr.open('GET', 'http://maps.googleapis.com/maps/api/directions/json?' + param.join('&'));
    xhr.send();
}

/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
    var latitCenter;
    var longitCenter;
    var latitDelta;
    var longitDelta;
   	var Map = require('ti.map');
    if (args.persons.length>1) strPersons="Personas Encargadas: \n";
    else if (args.persons.length) strPersons="Persona Encargada:\n";
    else strPersons="";
    
/* Selecciona el título de la fila como 2 textos, celular e email  */
    $._L_title.setText(args.name || "-");
    $._L_info.setText( "Hora de atención: " + (args.hour || "-") + 
                       '\n' + strPersons + 
                       '\nTeléfono: ' + (args.phone || "Phone Unknown"));                   
    $._L_description.setText(args.description.replace(/<.*>/, '\n') || "-"); //El replace es para eliminar las etiquetas HTML que puede contener
    
    $._V_lugar.setRegion({latitude: args.latit || '-', longitude: args.longit || '-', longitudeDelta: 0.01, latitudeDelta: 0.01});
    $._V_lugar.setLocation({latitude: Number(args.latit) || '-', longitude: Number(args.longit) || '-', longitudeDelta: 0.01, latitudeDelta: 0.01});
    
    //myPlace se ubica en el mismo lugar que place para que no sea visible, si no hasta que el usuario haga click en _V_ruta
    
    $.myPlace.setTitle(args.name || '-');
    $.myPlace.setLatitude(''+args.latit || '-');
    $.myPlace.setLongitude(''+args.longit || '-');
    
    
    $.place.setTitle(args.name || '-');
    $.place.setLatitude(Number(args.latit) || '-');
    $.place.setLongitude(Number(args.longit) || '-');
    $.place.pincolor = Map.ANNOTATION_RED;
    
    var band=false;
    Titanium.Geolocation.ACCURACY_HUNDRED_METERS;
    Titanium.Geolocation.getCurrentPosition(function(e){
        if (e.error){
            alert('HFL cannot get your current location');
            return;
        }
        var latitude = e.coords.latitude;
        var longitude = e.coords.longitude;
        $.myPlace.setTitle("YO");
        $.myPlace.setLatitude(latitude);
        $.myPlace.setLongitude(longitude);
        $.myPlace.pincolor = Map.ANNOTATION_GREEN;
    });
    
    $._V_ruta.addEventListener('click', function(e) {
        Titanium.Geolocation.getCurrentPosition(function(e){
            if (e.error){
                alert('HFL cannot get your current location');
                return;
            }
            var latitude = e.coords.latitude;
            var longitude = e.coords.longitude;
            $.myPlace.setTitle("YO");
            $.myPlace.setLatitude(latitude);
            $.myPlace.setLongitude(longitude);
            $.myPlace.pincolor = Map.ANNOTATION_GREEN;
        });
        //Se analiza donde debe estar centrada la ventana para tomar ambas coordenadas
        latitCenter = (Number($.place.getLatitude()) + Number($.myPlace.getLatitude()))/2.0;
        longitCenter = (Number($.place.getLongitude()) + Number($.myPlace.getLongitude()))/2.0;
        
        //Se adquiere el tamaño de la ventana
        latitDelta = Math.abs(Number($.place.getLatitude()) - Number($.myPlace.getLatitude()));
        longitDelta = Math.abs(Number($.myPlace.getLongitude()) - Number($.place.getLongitude()));
        //Se le da un margen proporcional
        longitDelta *= 2;
        latitDelta *= 2;
        
        $._V_lugar.region = {longitudeDelta: longitDelta, latitudeDelta:latitDelta, 
                             longitude: longitCenter, latitude: latitCenter};
                         
        addRoute({
            map: $._V_lugar,
            start: $.myPlace.getLatitude() + "," + $.myPlace.getLongitude(),
            stop: $.place.getLatitude() + "," + $.place.getLongitude(),
            band: band //La bandera se envía diciendole si es la primera vez que va a dibujar la ruta o no
        });
        band = true;
        //Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS;

    /* SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
     * THIS VALUE IS IN METERS*/
        /*
        
         
        // GET CURRENT POSITION - THIS FIRES ONCE
        Titanium.Geolocation.getCurrentPosition(function(e){
            if (e.error){
                alert('HFL cannot get your current location');
                return;
            }
            var latitude = e.coords.latitude;
            var longitude = e.coords.longitude;
            $.myPlace.setLatitude(latitude);
            $.myPlace.setLongitude(longitude);
        });*/
    });

    
/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_mapaSedeChildDetail.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_mapaSedeChildDetail.close();
    });
    $._W_mapaSedeChildDetail.addEventListener('android:back',function(e){
        $._W_mapaSedeChildDetail.close();
    });
    
/* Para quitar el problema de no poder hacer scroll sólo en el mapa cuando 
 * comience a tocar el contenido hasta q lo suelta, se activa el Scroll */

    $._V_noMap.addEventListener('touchstart', function(){
        $._Scroll_map.setScrollingEnabled(false);
        $._V_noMap.hide();
    });
    $._V_contenido.addEventListener('touchstart', function(){
        $._Scroll_map.setScrollingEnabled(true);
        $._V_noMap.show();
    });


