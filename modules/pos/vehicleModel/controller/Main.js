Ext.define('Module.pos.vehicleModel.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores: ['Module.pos.vehicleModel.store.VehicleModels'],
    models: ['Module.pos.vehicleModel.model.VehicleModel'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'vehicleModelMainView',
		selector: 'vehicleModelMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
		    'vehicleModelMainView': {
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
