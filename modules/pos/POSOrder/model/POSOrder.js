Ext.define('Module.pos.POSOrder.model.POSOrder', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean' },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        {name:'IdNumber',type:'string'},
        { name: 'CustomerNumber', type: 'string' },
        { name: 'TransactionDate', type: 'date' },
        { name: 'MachineCode', type: 'string' },
        { name: 'TotalReceivable', type: 'decimal' },
        { name: 'Balance', type: 'decimal' },
        { name: 'Status', type: 'string' },
        { name: 'StatusValue', type: 'int' },
        { name: 'Payments', type: 'auto' },
        { name: 'Lines', type: 'auto' },
        { name: 'Promotions', type: 'auto' },
        { name: 'Ref', type: 'string' },
        { name: 'Memo', type: 'string' }
    ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/POSOrders?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});