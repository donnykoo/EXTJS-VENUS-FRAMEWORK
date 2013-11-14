Ext.define('Module.pos.stockTake.model.StockTake', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean' },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'Store', type: 'string' },
        { name: 'InstanceId', type: 'string' },
        { name: 'Stauts', type: 'string' },
        { name: 'StockTakeTime', type: 'date' },
        { name:'Lines',xtype:'auto'}
    ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/StockTakes?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});