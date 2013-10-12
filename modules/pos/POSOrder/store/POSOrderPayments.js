Ext.define('Module.pos.POSOrder.store.POSOrderPayments', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.POSOrder.model.POSOrderPayment',
    model: 'Module.pos.POSOrder.model.POSOrderPayment',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});