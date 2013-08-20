Ext.define('Module.pos.product.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: [
        'Module.pos.product.store.Products',
        'Module.pos.product.store.Materials'
    ],

    models: ['Module.pos.product.model.Product'],

    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'productMainView',
        selector: 'productMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'productMainView': {
                afterrender: function (cmp) {
                    /**
                        me.mon(cmp.getGrid().getEl(), {
                            click: me.onAnchorClick,
                            scope: me,
                            delegate: 'a'
                        });
                        */
                },
                added: function (cmp, container, pos, eOpts) {

                }
            }
        });
    },

    onAnchorClick: function (event, target, eOpts) {
        alert(event);
    },

    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});