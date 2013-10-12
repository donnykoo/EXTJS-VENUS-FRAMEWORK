Ext.define('Module.pos.POSOrder.store.POSOrderPromoLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.POSOrder.model.POSOrderPromoLine',
    model: 'Module.pos.POSOrder.model.POSOrderPromoLine',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});