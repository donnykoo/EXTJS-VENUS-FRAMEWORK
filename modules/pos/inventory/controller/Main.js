Ext.define('Module.pos.inventory.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.inventory.store.Inventories'],
    models : ['Module.pos.inventory.model.Inventory'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'inventoryMainView',
		selector: 'inventoryMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'inventoryMainView': {
				afterrender: function(cmp){
					
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			}
		});
		
    },
	
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
