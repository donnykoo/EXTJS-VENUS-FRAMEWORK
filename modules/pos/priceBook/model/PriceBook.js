Ext.define('Module.pos.priceBook.model.PriceBook', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'SKU', 'ProductName', 'Price', 'EffectiveDate', 'EndDate', 'Store'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/PriceBooks?$inlinecount=allpages', basket.dataSource),
        reader: {
			type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});