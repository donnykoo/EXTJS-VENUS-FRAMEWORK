Ext.define('Module.pos.purchaseOrder.store.PurchaseOrderLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.purchaseOrder.model.PurchaseOrderLine',
    model: 'Module.pos.purchaseOrder.model.PurchaseOrderLine',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});