Ext.define('Module.pos.inventoryPickOut.controller.Main', {
    extend: 'Ext.app.Controller',


    stores: ['Module.pos.inventoryPickOut.store.InventoryPickOuts'],
    models: ['Module.pos.inventoryPickOut.model.InventoryPickOut'],

    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'inventoryPickOutMainView',
        selector: 'inventoryPickOutMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'inventoryPickOutMainView': {
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
