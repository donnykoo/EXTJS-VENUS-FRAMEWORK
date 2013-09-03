Ext.define('Module.pos.inventoryMoveIn.controller.Main', {
    extend: 'Ext.app.Controller',


    stores: ['Module.pos.inventoryMoveIn.store.InventoryMoveIns', 'Module.pos.product.store.Products', 'Module.pos.staff.store.Staffs'],
    models: ['Module.pos.inventoryMoveIn.model.InventoryMoveIn', 'Module.pos.product.model.Product', 'Module.pos.staff.model.Staff'],


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
            }
        });

    },


    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
