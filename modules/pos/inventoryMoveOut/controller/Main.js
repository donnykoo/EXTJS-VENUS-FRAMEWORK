Ext.define('Module.pos.inventoryMoveOut.controller.Main', {
    extend: 'Ext.app.Controller',


    stores: ['Module.pos.inventoryMoveOut.store.InventoryMoveOuts'],
    models: ['Module.pos.inventoryMoveOut.model.InventoryMoveOut'],

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
            }
        });

    },


    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});
