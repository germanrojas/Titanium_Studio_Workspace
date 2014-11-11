exports.definition = {
	config: {
		
		adapter: {
			type: "sync_ger", //< use either book_rest or book_acs
			collection_name: "model_test",
			// Endpoint URL to access the service for the REST sync adapter
			//base_url: 'BASE_URL/book/'
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
	},
};