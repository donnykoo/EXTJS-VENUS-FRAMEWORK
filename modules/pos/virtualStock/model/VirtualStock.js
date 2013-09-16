Ext.define('Module.pos.virtualStock.model.VirtualStock', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'IdNumber', 'Name', 'StockType', 'StoreName', 'OwnerName', 'Status', 'Store' ],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/VirtualStocks?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});