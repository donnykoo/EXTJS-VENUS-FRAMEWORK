Ext.define('Module.pos.stockTake.store.StockTakeReports', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.stockTake.model.StockTakeReport',
    model: 'Module.pos.stockTake.model.StockTakeReport',
    proxy: {
        type: 'memory'
    },
    autoDestroy: true,
    data: []
});