Ext.define('Module.pos.productPrice.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: [
        'Module.pos.productPrice.store.ProductPrices'
    ],

    models: ['Module.pos.productPrice.model.ProductPrice'],

    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'productPriceMainView',
        selector: 'productPriceMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'productPriceMainView': {
                afterrender: function (cmp) {
                    
                },
                added: function (cmp, container, pos, eOpts) {

                }
            }
        });
    },

    onAnchorClick: function (event, target, eOpts) {
        
    },

    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});