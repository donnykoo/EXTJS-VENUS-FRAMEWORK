Ext.define('Module.pos.product.store.Products', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.product.model.Product',
    model: 'Module.pos.product.model.Product',
    autoLoad: false,
    pageSize: basket.pageSize
});