/* El modelo es generado desde consola para ahorrar tiempo con el comando:
	$alloy generate model notificaciones sql name:string url:string icon:string*/


exports.definition = {
	config: {
		columns: {
		    "title": "string",
		    "description": "string",
		    "date": "string",
		    "icon": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "notificaciones"
		}
	},
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}
