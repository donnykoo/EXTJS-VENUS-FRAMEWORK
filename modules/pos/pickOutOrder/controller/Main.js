Ext.define('Module.pos.pickOutOrder.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: ['Module.pos.pickOutOrder.view.CreateWindow'],
	
    stores: ['Module.pos.pickOutOrder.store.PickOutOrders'],
	/* , 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs' */
    models: ['Module.pos.pickOutOrder.model.PickOutOrder'],
	/* , 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff' */


    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'pickOutOrderMainView',
        selector: 'pickOutOrderMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'pickOutOrderMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
            'pickOutOrderMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            },
            'pickOutOrderMainView gridpanel': {
				itemdblclick: me.onItemDblClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getPickOutOrderMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
	onItemDblClicked: function(grid, record, item, index, e, eOpts ){
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getPickOutOrderMainView().getCreateWindow();
		
		createWindow.setObjectId(record.get("Id"));
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
		
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
