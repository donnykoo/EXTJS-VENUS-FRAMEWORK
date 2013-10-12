Ext.define('Module.pos.productPrice.model.ProductPrice', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'auto' },
        { name: 'SKU', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'ProductCategory', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'BrandName', type: 'string' },
        { name: 'UOMName', type: 'string' },
        { name: 'ServiceNumber', type: 'string' },
        { name: 'ServiceName', type: 'string' },
        { name: 'Price', type: 'decimal' },
        { name: 'Store', type: 'string' }
    ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/ProductPrices?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});