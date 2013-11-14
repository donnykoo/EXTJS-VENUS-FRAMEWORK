Ext.define('Module.pos.stockTake.model.StockTakeLine', {
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
        { name: 'StockTake', type: 'auto' }
        , 'Upload',
        { name: 'VirtualStock', type: 'string' },
        { name: 'URL', type: 'string' },
        { name: 'UploadTime', type: 'date' },
        { name: 'Status', type: 'string' },
        { name: 'StockTakeReports', xtype: 'auto' }
    ],
    idProperty: 'Id'
    //proxy: {
    //    type: 'ajax',
    //    url: Ext.String.format('{0}/ServiceInstanceDetails?$inlinecount=allpages', basket.dataSource),
    //    reader: {
    //        type: 'json',
    //        root: 'value',
    //        totalProperty: 'odata.count',
    //        useSimpleAccessors: true
    //    }
    //}
});