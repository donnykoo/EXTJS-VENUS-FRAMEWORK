Ext.define('Module.pos.inventory.store.Inventories', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.inventory.model.Inventory',
    model: 'Module.pos.inventory.model.Inventory',
	autoLoad: true,
	pageSize: basket.pageSize
});