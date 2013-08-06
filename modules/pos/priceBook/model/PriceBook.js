Ext.define('Module.pos.priceBook.model.PriceBook', {
    extend: 'Ext.data.Model',
    fields: ['sku', 'name', 'price', 'validThru'],
 
    proxy: {
        type: 'ajax',
        url: 'data/priceBooks.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});