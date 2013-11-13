Ext.define('Module.pos.purchaseOrder.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['Module.pos.purchaseOrder.view.CreateWindow'],


    stores: [
        'Module.pos.purchaseOrder.store.PurchaseOrders',
        'Module.pos.purchaseOrder.store.PurchaseOrderLines'
    ],

    models: ['Module.pos.purchaseOrder.model.PurchaseOrder',
            'Module.pos.purchaseOrder.model.PurchaseOrderLine'
    ],

    refs: [{
        ref: 'contentPanel',
        selector: 'contentpanel'
    }, {
        ref: 'purchaseOrderMainView',
        selector: 'purchaseOrderMainView'
    }],

    init: function () {
        var me = this;

        me.control({
            'purchaseOrderMainView': {
                afterrender: function (cmp) {
                    
                },
                added: function (cmp, container, pos, eOpts) {

                }
            },
            'purchaseOrderMainView gridpanel': {
                itemdblclick: me.onItemDblClicked
            }
        });
    },

    onAnchorClick: function (event, target, eOpts) {
        
    },
    
    onItemDblClicked: function (grid, record, item, index, e, eOpts) {
        var me = this,
			contentView = me.getContentPanel(),
			createWindow = me.getPurchaseOrderMainView().getCreateWindow();

        createWindow.setObjectId(record.get("Id"));
        createWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);

    },


    beforeLaunch: function (appliation) {

    },

    launch: function (application) {
        var me = this;
    }

});