var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        json = JSON.parse(this.responseText);
        alert(json);
    },
    onerror: function(e) {
        alert('Error: ' + e.error);
    },
    timeout:30000
});
function user_login(e) {
	
    var username = $.input_username.getValue();
    var password = $.input_password.getValue();
    
    var wstoken = '3c4d7fa6b68b7c3d97bd4e420aecb5c5';
	var domainname = 'http://temas23.nivel7.net';
    
    var key = 'abc';
	var tstamp = Math.round((new Date()).getTime() / 1000);
    var token = Ti.Utils.sha1(key+tstamp);
    var format = 'json';
    
    var functionname = 'local_germoodlewebservice_test_user_auth';
    
    var contactoChild=Alloy.createCollection('model_test');   //Se instancia a la collección del modelo
    contactoChild.fetch();
    var currentModel=contactoChild.at(0);
    
    var key_encrypt = Titanium.Utils.md5HexDigest(Titanium.Utils.base64encode("abc"));
    
    var CryptoJS_titanium = require('tripledes');
    //alert('key: '+key_encrypt);
    //alert('pass: '+password);
    var encrypted_password = CryptoJS_titanium.TripleDES.encrypt(password, key_encrypt);
    
    encrypted_password = Titanium.Utils.base64encode(encrypted_password);
    //alert('pass: '+encrypted_password);
    //alert('tstamp: '+tstamp);
    
    //var params = {tstamp:0, token: token, username: username, password: encrypted_password};
	//alert(encrypted_password);
	
	xhr.open("POST", domainname+"/webservice/rest/server.php?wstoken="+wstoken+"&wsfunction="+functionname+"&moodlewsrestformat="+format);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send({tstamp:0, token: token, username: username, password: 'test'});
	

    //alert("Encripted= "+encrypted); 
    //alert("Decrypted= "+decrypted);
    //alert(currentModel.get('title'));
}

$.index.open();
