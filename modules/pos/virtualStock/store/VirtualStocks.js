Ext.define('Module.pos.virtualStock.store.VirtualStocks', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.virtualStock.model.VirtualStock',
    model: 'Module.pos.virtualStock.model.VirtualStock',
	autoLoad: true,
	pageSize: basket.pageSize
});