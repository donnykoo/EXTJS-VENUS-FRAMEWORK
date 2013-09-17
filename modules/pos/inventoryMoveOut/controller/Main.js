Ext.define('Module.pos.inventoryMoveOut.controller.Main', {
    extend: 'Ext.app.Controller',

	requires: ['Module.pos.inventoryMoveOut.view.CreateWindow'],
	
    stores: ['Module.pos.inventoryMoveOut.store.InventoryMoveOuts'],
	/* , 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs' */
    models: ['Module.pos.inventoryMoveOut.model.InventoryMoveOut'],
	/* , 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff' */


    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'inventoryMoveOutMainView',
        selector: 'inventoryMoveOutMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'inventoryMoveOutMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
			'inventoryMoveOutMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            },
			'inventoryMoveOutMainView gridpanel': {
				itemdblclick: me.onItemDblClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getInventoryMoveOutMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
	onItemDblClicked: function(grid, record, item, index, e, eOpts ){
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getInventoryMoveOutMainView().getCreateWindow();
		
		createWindow.setObjectId(record.get("Id"));
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
		
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
