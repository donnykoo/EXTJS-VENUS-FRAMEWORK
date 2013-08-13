Ext.define('Module.pos.system.transaction.store.Transactions', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.system.transaction.model.Transaction',
    model: 'Module.pos.system.transaction.model.Transaction',
	autoLoad: true,
	pageSize: basket.pageSize
});