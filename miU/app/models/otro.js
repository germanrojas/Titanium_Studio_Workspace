/* El modelo es generado desde consola para ahorrar tiempo con el comando:
	$alloy generate model otro sql name:string url:string icon:string*/


exports.definition = {
	config: {
		columns: {
		    "id": "number",
		    "name": "string",
		    "url": "string",
		    "icon": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "otro"
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
