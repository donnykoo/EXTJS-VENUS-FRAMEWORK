Ext.define('Module.pos.service.model.Service', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'Store', 'SKU', 'Name', 'Description',
			'Price', 'OperationPart', 'DefaultManHour', 'CategoryName', 'Materials', 'Steps', 'Duration', 
			'ServiceCycle', 'ServiceMiles'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Services?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});