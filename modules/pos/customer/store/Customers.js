Ext.define('Module.pos.customer.store.Customers', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.customer.model.Customer',
    model: 'Module.pos.customer.model.Customer',
	autoLoad: true,
	pageSize: basket.pageSize
});