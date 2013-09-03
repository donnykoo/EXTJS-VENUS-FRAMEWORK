Ext.define('Module.pos.inventoryMoveIn.store.InventoryMoveInLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.inventoryMoveIn.model.InventoryMoveInLine',
    model: 'Module.pos.inventoryMoveIn.model.InventoryMoveInLine',
	proxy: {
		type: 'memory'
	},
	autoDestroy: true,
    data: []
});