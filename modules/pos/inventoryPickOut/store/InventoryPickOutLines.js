Ext.define('Module.pos.inventoryPickOut.store.inventoryPickOutLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.inventoryPickOut.model.InventoryPickOutLine',
    model: 'Module.pos.inventoryPickOut.model.InventoryPickOutLine',
    data: []
});