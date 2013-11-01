Ext.define('Module.pos.purchaseOrder.store.PurchaseOrders', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.purchaseOrder.model.PurchaseOrder',
    model: 'Module.pos.purchaseOrder.model.PurchaseOrder',
    autoLoad: true,
    pageSize: basket.pageSize
});