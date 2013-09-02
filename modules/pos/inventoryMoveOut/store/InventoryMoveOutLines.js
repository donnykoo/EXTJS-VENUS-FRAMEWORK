Ext.define('Module.pos.inventoryMoveOut.store.InventoryMoveOutLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.inventoryMoveIn.model.InventoryMoveOutLine',
    model: 'Module.pos.inventoryMoveIn.model.InventoryMoveOutLine',
    data: []
});