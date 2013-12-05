Ext.define('Module.pos.transferOrderIn.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: ['Module.pos.transferOrderIn.view.CreateWindow'],
	
    stores: ['Module.pos.transferOrderIn.store.TransferOrderIns'],
	/* , 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs' */
    models: ['Module.pos.transferOrderIn.model.TransferOrderIn'],
	/* , 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff' */


    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'transferOrderInMainView',
        selector: 'transferOrderInMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'transferOrderInMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
            'transferOrderInMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            },
            'transferOrderInMainView gridpanel': {
				itemdblclick: me.onItemDblClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getTransferOrderInMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
	onItemDblClicked: function(grid, record, item, index, e, eOpts ){
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getTransferOrderInMainView().getCreateWindow();
		
		createWindow.setObjectId(record.get("Id"));
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
		
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
