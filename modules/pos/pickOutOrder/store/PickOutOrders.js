Ext.define('Module.pos.pickOutOrder.store.PickOutOrders', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.pickOutOrder.model.PickOutOrder',
    model: 'Module.pos.pickOutOrder.model.PickOutOrder',
    autoLoad: true,
    pageSize: basket.pageSize
});