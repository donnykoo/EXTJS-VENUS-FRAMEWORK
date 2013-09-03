Ext.define('Module.pos.inventoryMoveIn.controller.Main', {
    extend: 'Ext.app.Controller',

	requires: ['Module.pos.inventoryMoveIn.view.CreateWindow'],
	
    stores: ['Module.pos.inventoryMoveIn.store.InventoryMoveIns'],
	/* , 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs' */
    models: ['Module.pos.inventoryMoveIn.model.InventoryMoveIn'],
	/* , 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff' */


    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'inventoryMoveInMainView',
        selector: 'inventoryMoveInMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'inventoryMoveInMainView': {
                afterrender: function (cmp) {

                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
			'inventoryMoveInMainView gridpanel #create-btn': {
                click: me.onCreateButtonClicked
            }
        });
		
    },

	onCreateButtonClicked: function (btn, event, eOpts) {
		var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getInventoryMoveInMainView().getCreateWindow();
			
		createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
	},
	
    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
