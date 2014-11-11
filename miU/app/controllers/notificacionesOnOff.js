/* Se exporta un método del controlador que abra la ventana */
    
    exports.open = function() {
        $._W_notificacionesOnOff.open();
    };
    
/* Se cierra la ventana cuando el usuario desea volver a la principal */
    $._L_back.addEventListener('click', function(e) {
        $._W_notificacionesOnOff.close();
        if (Titanium.Platform.getOsname()=='android'){
            var CloudPush = require('ti.cloudpush');
        }
        var Cloud = require('ti.cloud');
        var deviceToken;
        deviceToken = Ti.App.Properties.getString('deviceToken', '');
        if (Ti.App.Properties.getBool('pushNotifications', !notifications)!=notifications){
            if (notifications){  //Se debe suscribir, por que hubo un cambio y ahora es verdadero
               if (Titanium.Platform.getOsname()=='android'){
                    Cloud.PushNotifications.subscribe({
                        channel: 'alert', // "alert" is channel name
                        device_token: deviceToken,
                        type: 'android'
                     }, function(e){
                        if (!e.success) {
                            alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                        }
                    });
               }else{
                   Cloud.PushNotifications.subscribe({
                        channel: 'alert',
                        type: 'ios',
                        device_token: deviceToken
                    }, function (e) {
                        if (!e.success) {
                            alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                        }
                    });
                }
            }else{  //Se debe quitar la suscripción
                Cloud.PushNotifications.unsubscribe({
                    channel: 'alert',
                    device_token: deviceToken
                }, function (e) {
                    if (!e.success) {
                        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                    }else{
                        if (Titanium.Platform.getOsname()=='android'){
                            CloudPush.enabled = true;
                        }else{
                            Titanium.Network.unregisterForPushNotifications();
                        }
                    }
                });
            }
            Ti.App.Properties.setBool('pushNotifications', notifications);
            
        }
    });
    $._W_notificacionesOnOff.addEventListener('android:back',function(e){
        $._W_notificacionesOnOff.close();
    });
    
    var notifications = Ti.App.Properties.getBool('pushNotifications', true);
    if (!notifications){
        $._Switch_.setValue(false);
        $._L_coment.setText("Notificaciones desactivadas");
    }
    
    $._Switch_.addEventListener('change', function(e){
        notifications = !notifications;
        if (notifications) $._L_coment.setText("Notificaciones activadas");
        else $._L_coment.setText("Notificaciones desactivadas");
    });
    