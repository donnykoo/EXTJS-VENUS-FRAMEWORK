Ext.define('Module.pos.virtualStock.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.virtualStock.store.VirtualStocks'],
    models : ['Module.pos.virtualStock.model.VirtualStock'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'virtualStockMainView',
		selector: 'virtualStockMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'virtualStockMainView': {
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
