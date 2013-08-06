Ext.define('Module.pos.priceBook.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.priceBook.store.PriceBooks'],
    models : ['Module.pos.priceBook.model.PriceBook'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'priceBookMainView',
		selector: 'priceBookMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'priceBookMainView': {
				afterrender: function(cmp){
					
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			},
			
			'priceBookMainView form #search-btn': {
				click: me.onSearchButtonClicked
			}
		});
		
    },
	
	onSearchButtonClicked: function(btn, event, eOpts){
		var me = this;
		var store = me.getStore('Module.pos.priceBook.store.PriceBooks');
		store.load({
			params:{
				start:0,
				limit: 5
			},
			filters: [
				new Ext.util.Filter({ 
					property: 'sku',
					operator: '*>',
					value: '2'
				})
			]
		});
	},
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
