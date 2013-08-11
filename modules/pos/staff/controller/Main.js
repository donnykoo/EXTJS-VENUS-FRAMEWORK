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
			}
		});
		
    },
	
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
