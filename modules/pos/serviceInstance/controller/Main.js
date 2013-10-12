Ext.define('Module.pos.serviceInstance.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: ['Module.pos.serviceInstance.view.CreateWindow'],
	
    stores: ['Module.pos.serviceInstance.store.ServiceInstances',
            'Module.pos.serviceInstance.store.InstanceProducts',
            'Module.pos.serviceInstance.store.ServiceStepInstances'],

    models: ['Module.pos.serviceInstance.model.ServiceInstance',
            'Module.pos.serviceInstance.model.InstanceProduct',
            'Module.pos.serviceInstance.model.ServiceStepInstance'],



    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'serviceInstanceMainView',
        selector: 'serviceInstanceMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'serviceInstanceMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
            'serviceInstanceMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            },
            'serviceInstanceMainView gridpanel': {
				itemdblclick: me.onItemDblClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getServiceInstanceMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
	onItemDblClicked: function(grid, record, item, index, e, eOpts ){
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getServiceInstanceMainView().getCreateWindow();
		
		createWindow.setObjectId(record.get("Id"));
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
		
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
