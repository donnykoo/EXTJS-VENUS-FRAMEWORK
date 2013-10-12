Ext.define('Module.pos.productPrice.store.ProductPrices', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.productPrice.model.ProductPrice',
    model: 'Module.pos.productPrice.model.ProductPrice',
    autoLoad: true,
    pageSize: basket.pageSize
});