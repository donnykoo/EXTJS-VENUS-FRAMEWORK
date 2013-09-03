Ext.define('Module.pos.inventoryMoveIn.model.InventoryMoveInLine', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'UpdateBy', 'CreateDate', 'CreateBy', 
	'SKU', 'Name', 'UOM', 
	{ name:'Quantity', type: 'float' }, 'InventoryMove'],
    idProperty: 'Id'
});