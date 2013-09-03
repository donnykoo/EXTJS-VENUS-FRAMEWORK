Ext.define('Module.pos.inventoryMoveOut.store.InventoryMoveOuts', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.inventoryMoveOut.model.InventoryMoveOut',
    model: 'Module.pos.inventoryMoveOut.model.InventoryMoveOut',
    autoLoad: true,
    pageSize: basket.pageSize
});