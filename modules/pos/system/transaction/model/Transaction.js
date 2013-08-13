Ext.define('Module.pos.system.transaction.model.Transaction', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'CreateDate', 'CreateBy', 'Store', 'TransactionId', 'InstanceId', 'Name', 'Payload', 'TargetId', 'Status', 'ErrorMessage' ],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Transactions?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});