Ext.define('Module.pos.POSOrder.model.POSOrderPayment', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean', defaultValue: true },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'PaymentType', type: 'string' },
        { name: 'Amount', type: 'decimal' },
        { name: 'Ref', type: 'string' },
        { name: 'POSOrder', type: 'auto' }
    ],
    idProperty: 'Id'
});