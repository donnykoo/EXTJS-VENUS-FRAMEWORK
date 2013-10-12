Ext.define('Module.pos.serviceInstance.model.InstanceProduct', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'int' }, 
		{ name: 'Version', type: 'int' }, 
		{ name: 'Active', type: 'boolean', defaultValue: true }, 
		{ name: 'LastUpdate', type:'date' },  
		{ name: 'UpdateBy', type: 'string' }, 
		{ name: 'CreateDate', type: 'date' }, 
		{ name: 'CreateBy', type: 'string' }, 
		{ name: 'SKU', type: 'string'}, 
		{ name: 'Quantity', type: 'decimal' },
        { name: 'Price', type: 'decimal' }
    ],
    idProperty: 'Id'
});