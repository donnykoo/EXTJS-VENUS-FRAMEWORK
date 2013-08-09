Ext.define('Module.pos.hardwareRegistry.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : ['Module.pos.hardwareRegistry.store.HardwareRegistries'],
    models : ['Module.pos.hardwareRegistry.model.HardwareRegistry'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'hardwareRegistryMainView',
		selector: 'hardwareRegistryMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'hardwareRegistryMainView': {
				afterrender: function(cmp){
					
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			},
			
			'hardwareRegistryMainView form #search-btn': {
				click: me.onSearchButtonClicked
			}
		});
		
    },
	
	onSearchButtonClicked: function(btn, event, eOpts){
		var me = this;
		var mainView = me.getHardwareRegistryMainView();
		var form = mainView.form.getForm();
		var vals = form.getFieldValues(true);
		
		
		var filters = "";
		if(vals.Store){
			filters = Ext.String.format("Store eq '%{0}%'", vals.Store);
		}
		
		var params = {
			start:0,
			limit: basket.pageSize
		};
		if(filters && filters !== ""){
			Ext.apply(params, {
				'$filter': filters
			});
		}
		
		var store = me.getStore('Module.pos.hardwareRegistry.store.HardwareRegistries');
		
		
		store.load({
			remoteFilter: true,
			params: params
		});
	},
	
	
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
