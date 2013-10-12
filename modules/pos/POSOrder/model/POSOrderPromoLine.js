Ext.define('Module.pos.POSOrder.model.POSOrderPromoLine', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean', defaultValue: true },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'Code', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'UnitPrice', type: 'string' },
        { name: 'Unit', type: 'float' },
        { name: 'PromoType', type: 'auto' },
        { name: 'Amount', type: 'decimal' },
        //{ name: 'POSOrder', type: 'auto' }
    ],
    idProperty: 'Id'
});