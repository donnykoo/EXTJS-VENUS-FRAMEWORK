Ext.define('Module.pos.service.controller.Main', {
    extend : 'Ext.app.Controller',
	
	
    stores : [
		'Module.pos.service.store.Services',
		'Module.pos.service.store.Steps',
		'Module.pos.service.store.Materials'
	],
    models : ['Module.pos.service.model.Service'],
	
	refs: [{
		ref: 'contentPanel',
		selector: 'contentpanel'
	}, {
		ref: 'serviceMainView',
		selector: 'serviceMainView'
	}],

    init: function() {
        var me = this;
		
		me.control({
			'serviceMainView': {
				afterrender: function(cmp){
				/**
					me.mon(cmp.getGrid().getEl(), {
						click: me.onAnchorClick,
						scope: me,
						delegate: 'a'
					});
					*/
				},
				added: function(cmp, container, pos, eOpts ){
					
				}
			}
		});
    },
	
	onAnchorClick: function(event, target, eOpts){
		alert(event);
	},
	
	beforeLaunch: function(appliation){
		
	},
	
	launch: function(application){
		var me = this;
	}
	
});
