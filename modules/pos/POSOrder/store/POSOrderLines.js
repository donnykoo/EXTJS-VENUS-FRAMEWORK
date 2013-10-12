Ext.define('Module.pos.POSOrder.store.POSOrderLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.POSOrder.model.POSOrderLine',
    model: 'Module.pos.POSOrder.model.POSOrderLine',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});