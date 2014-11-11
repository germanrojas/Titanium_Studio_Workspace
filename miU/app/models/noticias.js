exports.definition = {
	config: {
		columns: {
		    "title": "string",
		    "author": "string",
		    "photo": "string",
		    "date": "string",
		    "description": "string",
		    "category": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "noticias"
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

