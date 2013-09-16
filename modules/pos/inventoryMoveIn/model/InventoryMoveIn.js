Ext.define('Module.pos.inventoryMoveIn.model.InventoryMoveIn', {
    extend: 'Ext.data.Model',
    fields: [
		{ name: 'Id', type: 'int' }, 
		{ name: 'Version', type: 'int' }, 
		{ name: 'Active', type: 'boolean' }, 
		{ name: 'LastUpdate', type:'date' }, 
		{ name: 'UpdateBy', type: 'string' }, 
		{ name: 'CreateDate', type: 'date' }, 
		{ name: 'CreateBy', type: 'string' }, 
		{ name: 'IdNumber', type: 'string' },
		{ name: 'Status', type: 'int' }, 
		{ name: 'VirtualStock', type:'string' }, 
		{ name: 'MoveInType', type:'string' }, 
		{ name: 'Lines', type:'auto' }, 
		{ name: 'Requestor', type:'string' },
		{ name: 'RefNumber', type:'string' },
		{ name: 'LogisticOrderNumber', type:'string' }],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/InventoryMoveIns?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});