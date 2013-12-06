Ext.define('Module.pos.transferOrderOut.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: ['Module.pos.transferOrderOut.view.CreateWindow'],
	
    stores: ['Module.pos.transferOrderOut.store.TransferOrderOuts'],
	/* , 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs' */
    models: ['Module.pos.transferOrderOut.model.TransferOrderOut'],
	/* , 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff' */


    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'transferOrderOutMainView',
        selector: 'transferOrderOutMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'transferOrderOutMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
            'transferOrderOutMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            },
            'transferOrderOutMainView gridpanel': {
				itemdblclick: me.onItemDblClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getTransferOrderOutMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
	onItemDblClicked: function(grid, record, item, index, e, eOpts ){
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getTransferOrderOutMainView().getCreateWindow();
		
		createWindow.setObjectId(record.get("Id"));
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
		
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
