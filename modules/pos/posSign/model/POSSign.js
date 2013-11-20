Ext.define('Module.pos.posSign.model.POSSign', {
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
		{ name: 'Status', mapping: 'StatusValue', type: 'int' },
		{ name: 'UserName', type: 'string' },
		{ name: 'Device', type: 'string' },
        { name: 'Date', type: 'date' },
        { name: 'Payment' }
        ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/POSSigns?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});