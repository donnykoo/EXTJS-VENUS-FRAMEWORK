Ext.define('Module.pos.stockTake.store.StockTakeLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.stockTake.model.StockTakeLine',
    model: 'Module.pos.stockTake.model.StockTakeLine',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});