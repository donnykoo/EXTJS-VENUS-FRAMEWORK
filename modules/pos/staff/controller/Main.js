Ext.define('Module.pos.staff.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.staff.store.Staffs'],
    models : ['Module.pos.staff.model.Staff'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'staffMainView',
		selector: 'staffMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'staffMainView': {
				afterrender: function(cmp){
					
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			},
			
			'staffMainView form #search-btn': {
				click: me.onSearchButtonClicked
			}
		});
		
    },
	
	onSearchButtonClicked: function(btn, event, eOpts){
		var me = this;
		var store = me.getStore('Module.pos.staff.store.Staffs');
		store.load({
			remoteFilter: true,
			params:{
				start:0,
				limit: basket.pageSize
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
