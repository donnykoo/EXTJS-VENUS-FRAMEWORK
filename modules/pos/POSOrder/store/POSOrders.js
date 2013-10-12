Ext.define('Module.pos.POSOrder.store.POSOrders', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.POSOrder.model.POSOrder',
    model: 'Module.pos.POSOrder.model.POSOrder',
    autoLoad: true,
    pageSize: basket.pageSize
});