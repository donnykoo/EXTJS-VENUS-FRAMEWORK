Ext.define('Module.pos.stockTake.store.StockTakes', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.stockTake.model.StockTake',
    model: 'Module.pos.stockTake.model.StockTake',
    autoLoad: true,
    pageSize: basket.pageSize
});