Ext.define('Module.pos.service.store.Services', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.service.model.Service',
    model: 'Module.pos.service.model.Service',
	autoLoad: true,
	pageSize: basket.pageSize
});