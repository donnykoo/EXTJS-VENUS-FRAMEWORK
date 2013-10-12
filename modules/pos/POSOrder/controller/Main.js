Ext.define('Module.pos.POSOrder.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: ['Module.pos.POSOrder.store.POSOrders',
            'Module.pos.POSOrder.store.POSOrderLines',
            'Module.pos.POSOrder.store.POSOrderPayments',
            'Module.pos.POSOrder.store.POSOrderPromoLines'],
    
    models: ['Module.pos.POSOrder.model.POSOrder',
             'Module.pos.POSOrder.model.POSOrderLine',
            'Module.pos.POSOrder.model.POSOrderPayment',
            'Module.pos.POSOrder.model.POSOrderPromoLine'],

    refs: [{
            ref: 'contentPanel',
            selector: 'contentpanel'
        }, {
            ref: 'posOrderMainView',
            selector: 'posOrderMainView'
        }],

    init: function() {
        var me = this;

        me.control({
            'posOrderMainView': {
                afterrender: function(cmp) {

                },
                added: function(cmp, container, pos, eOpts) {

                }
            }
        });

    },

    beforeLaunch: function(appliation) {

    },

    launch: function(application) {
        var me = this;
    }
});
