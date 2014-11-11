exports.definition = {
	config: {
		columns: {
		    "id": "number",
		    "name": "string",
		    "author": "string",
		    "image": "string",
		    "date": "string",
		    "duration": "string",
		    "description": "string",
		    "category": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "eventos"
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

