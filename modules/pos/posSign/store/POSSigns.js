Ext.define('Module.pos.posSign.store.POSSigns', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.posSign.model.POSSign',
    model: 'Module.pos.posSign.model.POSSign',
	autoLoad: true,
	pageSize: basket.pageSize
});