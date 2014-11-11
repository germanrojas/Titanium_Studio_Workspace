
if (Titanium.Platform.getOsname()=='android'){
    var CloudPush = require('ti.cloudpush');
}
var Cloud = require('ti.cloud');
var deviceToken;

if (Ti.App.Properties.getBool('firstLogIn', true)){ //Se pregunta si es la primera vez que el usuario ingresa a la aplicacion
    //Si es cierto, se suscribe al canal de notificaciones y se debe crear un usuario, además de conocer el token del dispositivo deviceToken
    if (Titanium.Platform.getOsname()=='android'){
        CloudPush.retrieveDeviceToken({
            success: function deviceTokenSuccess(e) {
                deviceToken = e.deviceToken;
                CloudPush.enabled = true;
                CloudPush.showTrayNotification=true;
                //alert("TOKEN: " + deviceToken);
                Ti.App.Properties.setString('deviceToken', deviceToken);
                Cloud.Users.create({
                    username: Ti.App.Properties.getString('deviceToken', deviceToken),
                    password: '123456',
                    password_confirmation: '123456'
                }, function (e) {
                    if (e.success) {    //Si se creo correctamente, debe autenticarse automáticamente
                        //alert("CREATED!");
                        Ti.App.Properties.setBool('firstLogIn', false); //Se cambia el parámetro ya que se habrá creado correctamente al usuario
                        Cloud.Users.login({
                            login: Ti.App.Properties.getString('deviceToken', deviceToken),
                            password: '123456'
                         },
                         function (e) {
                             if (e.success) {
                                 /*Si se conecta correctamente por primera vez, se suscribe a un canal de notificaciones*/
                                 // alert("LOGINED!");
                                 Cloud.PushNotifications.subscribe({
                                    channel: 'alert', // "alert" is channel name
                                    device_token: Ti.App.Properties.getString('deviceToken', deviceToken),
                                    type: 'gcm'
                                 }, function(e){
                                    if (e.success) {
                                        Ti.App.Properties.setBool('pushNotifications', true);
                                    }else{
                                        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                                    }
                                });
                             } else {
                                 alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
                             }
                        });
                    } else {
                        //Si entra acá el usuario ya tiene creado un usuario pero la app debió eliminarse o algo similar
                        CloudPush.addEventListener('callback', function(e){
                           // alert('HOLA');
                            var data = JSON.parse(e.payload);
                            if (data.page){
                                var windowToOpen=Alloy.createController(""+data.page);
                                windowToOpen.open();
                            }
                        });
                        Cloud.Users.login({
                            
                            login: Ti.App.Properties.getString('deviceToken', 'tempUser'),
                            password: '123456'
                         },
                         function (e) {
                             if (e.success) {
                                // alert('LOGING');
                                 Cloud.PushNotifications.subscribe({
                                    channel: 'alert', // "alert" is channel name
                                    device_token: Ti.App.Properties.getString('deviceToken', 'tempUser'),
                                    type: 'gcm'
                                 }, function(e){
                                    if (e.success) {
                                        Ti.App.Properties.setBool('pushNotifications', true);
                                    }else{
                                        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                                    }
                                });
                             } else {
                                 alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
                             }
                        });
                    }
                });
            },
            error: function deviceTokenError(e) {
                alert('Failed to register for push! ' + e.error);
            }
        });
        CloudPush.addEventListener('callback', function(e){
            //alert('hola');
            var data = JSON.parse(e.payload);
            if (data.page){
                var windowToOpen=Alloy.createController(""+data.page);
                windowToOpen.open();
            }
        });
        
         
        /////
        
    }else{      //Es un IOS para crear usuario, ya que es la primera vez q entra
        Titanium.Network.registerForPushNotifications({
            types: [
                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                Titanium.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:function(e)
            {
                //alert("Token: " + e.deviceToken);
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString('deviceToken', deviceToken);
                //alert("deviceToken = " + deviceToken);
            },
            error:function(e)
            {
                alert("Errorpush: " + e.error);
            },
            callback:function(e){
                var data = e.data;
                if (data.page){
                    var windowToOpen=Alloy.createController(""+data.page);
                    windowToOpen.open();
                }
                Ti.UI.iPhone.setAppBadge(0);
            }
        });
        
        Cloud.Users.create({
            username: Ti.App.Properties.getString('deviceToken', 'tempUser'),
            password: '123456',
            password_confirmation: '123456'
        }, function (e) {
            if(e.success){  //Si se crea correctamente el usuario
                Ti.App.Properties.setBool('firstLogIn', false); //Se cambia el parámetro ya que se habrá creado correctamente al usuario
                Cloud.Users.login({
                    login: Ti.App.Properties.getString('deviceToken', 'tempUser'),
                    password: '123456'
                }, function(e){
                    if(e.success){
                       Cloud.PushNotifications.subscribe({
                            channel: 'alert',
                            type: 'ios',
                            device_token: deviceToken
                        }, function (e) {
                            if (e.success) {
                                Ti.App.Properties.setBool('pushNotifications', true);
                            }else{
                                alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                            }
                        });
                    }else{
                        //alert("NOT CREATED! =(");
                        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
                    }
                });
            }else{
                //Si entra acá el usuario ya tiene creado un usuario pero la app debió eliminarse o algo similar
                /*Loggin de Usuario*/
                Cloud.Users.login({
                    login: Ti.App.Properties.getString('deviceToken', 'tempUser'),
                    password: '123456'
                }, function(e){
                    if(!e.success){
                        alert("Error: " + e.message);
                    }
                });
            }
        });
        
    }
    
}else{  //Si entra acá, no es la primera vez que el usuario ingresa a la aplicación, pero debe ingresarse con el usuario y contraseña
    if (Titanium.Platform.getOsname()=='android'){ //Si es plataforma Android entra acá:
        /*Evento cuando llega una notificación, es necesario volverlo a determinar por que o si no, no se ejecuta, ya que pierde esa información*/
        CloudPush.enabled = true;
        CloudPush.showTrayNotification=true;
        CloudPush.addEventListener('callback', function(e){
            //alert('hola');
            var data = JSON.parse(e.payload);
            if (data.page){
                var windowToOpen=Alloy.createController(""+data.page);
                windowToOpen.open();
            }
        });
        Cloud.Users.login({
            login: Ti.App.Properties.getString('deviceToken', 'tempUser'),
            password: '123456'
         },
         function (e) {
             if (e.success) {
                 //alert("LOGGING!");
                 Cloud.PushNotifications.subscribe({
                    channel: 'alert', // "alert" is channel name
                    device_token: Ti.App.Properties.getString('deviceToken', 'tempUser'),
                    type: 'gcm'
                 }, function(e){
                    if (e.success) {
                        Ti.App.Properties.setBool('pushNotifications', true);
                       // alert("GOOD the user is subscribed!");
                    }else{
                        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                    }
                });
             } else {
                 alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
             }
        });
        
    }else{  //Si está acá es un IOS y se debe ingresar al usuario
/*Activación del Push, se hace nuevamente para que sepa que callback debe realizar cuando llega una notificación,
  Si no se hace, el callback sólo funciona cuando la aplicación está corriendo o en el background, pero no cuando cuando está cerrada*/
        Titanium.Network.registerForPushNotifications({
            types: [
                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                Titanium.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:function(e)
            {
                //alert("Token: " + e.deviceToken);
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString('deviceToken', deviceToken);
                //alert("deviceToken = " + deviceToken);
            },
            error:function(e)
            {
                alert("Errorpush: " + e.error);
            },
            callback:function(e){
                var data = e.data;
                if (data.page){ //Si hay parámetro page
                    var windowToOpen=Alloy.createController(""+data.page);
                    windowToOpen.open();    
                }
                
                Ti.UI.iPhone.setAppBadge(0);
            }
        });
        /*Loggin de Usuario*/
        Cloud.Users.login({
            login: Ti.App.Properties.getString('deviceToken', 'tempUser'),
            password: '123456'
        }, function(e){
            if(!e.success){
                alert("Error: " + e.message);
            }
        });   
    }
}

/* Controlador principal que instancia a otros controladores manipulando las ventanas principales */
    
/* Abre la ventana que desea el usuario instanciando el controlador correspondiente */
    
	$._V_contacto.addEventListener('click', function(e){
        var contacto = Alloy.createController('contacto');
        contacto.open();
    });
    $._V_directorio.addEventListener('click', function(e){
        var directorio = Alloy.createController('directorio');
        directorio.open();
    });
    $._V_mapaSede.addEventListener('click', function(e){
        var mapaSede = Alloy.createController('mapaSede');
        mapaSede.open();
    });
    $._V_notificaciones.addEventListener('click', function(e){
        var notificaciones = Alloy.createController('notificaciones');
        notificaciones.open();
    });
    $._V_noticias.addEventListener('click', function(e){
        var noticias = Alloy.createController('noticias');
        noticias.open();
    });
    $._V_eventos.addEventListener('click', function(e){
        var eventos = Alloy.createController('eventos');
        eventos.open();
    });
    $._V_ofertaAcademica.addEventListener('click', function(e){
        var eventos = Alloy.createController('ofertaAcademica');
        eventos.open();
    });
	$._V_otros.addEventListener('click', function(e){
	    var otro = Alloy.createController('otro');
	    otro.open();
	});

    var signedUser = Ti.App.Properties.getBool('signed', false);
    if (!signedUser) Ti.App.Properties.setBool('signed', true);
/***********************************************************************************/

/*Abre la ventana inicial*/
    
    $._W_miU.open();
    
/*Se cierra sesión de usuario cuando se cierra la aplicación*/
    
/*    Titanium.App.addEventListener('close', function(){
       //setInterval(function(){
           alert('The app was close');
      //}, 5000);  
    });
*/
