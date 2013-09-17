Ext.define('Module.pos.inventoryMoveOut.store.InventoryMoveOutLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.inventoryMoveOut.model.InventoryMoveOutLine',
    model: 'Module.pos.inventoryMoveOut.model.InventoryMoveOutLine',
	proxy: {
		type: 'memory'
	},
	autoDestroy: true,
    data: []
});