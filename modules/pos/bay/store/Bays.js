Ext.define('Module.pos.bay.store.Bays', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.bay.model.Bay',
    model: 'Module.pos.bay.model.Bay',
	autoLoad: true,
	pageSize: basket.pageSize
});