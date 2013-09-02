Ext.define('Module.pos.inventoryMoveIn.model.InventoryMoveInLine', {
    extend: 'Ext.data.Model',
    fields: ['SKU', 'Name', 'UOM', 'Quantity', 'RealityQuantity'],
    idProperty: 'SKU'
});