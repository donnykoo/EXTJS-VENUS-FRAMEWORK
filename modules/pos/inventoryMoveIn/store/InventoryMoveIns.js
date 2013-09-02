Ext.define('Module.pos.inventoryMoveIn.store.InventoryMoveIns', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.inventoryMoveIn.model.InventoryMoveIn',
    model: 'Module.pos.inventoryMoveIn.model.InventoryMoveIn',
    autoLoad: true,
    pageSize: basket.pageSize
});