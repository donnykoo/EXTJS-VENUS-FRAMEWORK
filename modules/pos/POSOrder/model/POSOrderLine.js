Ext.define('Module.pos.POSOrder.model.POSOrderLine', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean', defaultValue: true },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'SKU', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'Ref', type: 'string' },
        { name: 'PlateNumber', type: 'float' },
        { name: 'UOM', type: 'auto' },
        { name: 'UnitPrice', type: 'decimal' },
        { name: 'Discount', type: 'decimal' },
        { name: 'Unit', type: 'decimal' },
        { name: 'Amount', type: 'decimal' },
        { name: 'Memo', type: 'string' },
        //{ name: 'POSOrder', type: 'auto' }
    ],
    idProperty: 'Id'
});