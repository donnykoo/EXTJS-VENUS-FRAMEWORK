Ext.define('Module.pos.inventoryPickOut.store.InventoryPickOuts', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.inventoryPickOut.model.InventoryPickOut',
    model: 'Module.pos.inventoryPickOut.model.InventoryPickOut',
    autoLoad: true,
    pageSize: basket.pageSize
});