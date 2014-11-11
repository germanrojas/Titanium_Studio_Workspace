/* Toma los atributos al instanciar este controlador */
    var args = arguments[0] || {};
 
/* Selecciona el título de la fila y su imagen con los atributos name y photo correspondientemente  */

    $._L_rowTitle.setText(args.name || "-");
    //Ésta condición no debería ser necesaria ya que agregar el  filtro a la tabla debería funcionar en todos los OS, pero 
    //por error de Titanium no funciona en android, por lo que hay q darle el titulo a la fila y así hacer que logre buscar ya que es 
    //el filtro que tiene por defecto, lo que tiene android es que si la fila tiene otras componentes oculta el título, en iOS encambio,
    //es visible por ello debe filtrarse la búsqueda en la tabla por un atributo agregado: myFilter
    if (!(Titanium.Platform.getName()==='android')){
        $.row.myFilter = args.name;     //myFilter es un atributo que se agrega a la fila para luego en la tabla 
                                        //buscarlos por ese atributo   
    }else{
        $.row.setTitle(args.name || "-");
    }
    
    
/* Se abre una vista detallada cuando se hace click si el argumento detailEvent es verdadero*/
    if (args.detailEvent){
        $.row.addEventListener('click', function(e){
        //
            var baseUrl = "http://webdev.uigv.ni7.co/api/noticias/detalle/";
            var xhr = Ti.Network.createHTTPClient({
                cache: true,
                onload: function(e) {
                    json = JSON.parse(this.responseText);
                    var detail = Alloy.createController("noticiasChildDetail",{name : json.name, author : json.author, date: json.date, image : json.image, 
                                                                               description : json.description, categories : json.categories});
                    detail.open();
                     
                },
                onerror: function(e) {
                    Ti.API.debug(e.error);
                    alert('error');
                },
                timeout:15000
            });
            xhr.open("GET", baseUrl + "?id=" + args.id);
            xhr.send();
        //  
        });
        $._L_complemento.setText(args.date ||  "-");
        $._I_noticia.setImage(args.image || "/images/unknown.jpg");
    }else{
        $.row.categoryID = args.id;
        //alert(args.name + ': '+$.row.categoryID);
        $._L_complemento.setText(args.noticiasLength + " noticias relacionados");
        $._L_complemento.setLeft("10dp");
        $._L_rowTitle.setLeft("10dp");
        
    }
  
    
