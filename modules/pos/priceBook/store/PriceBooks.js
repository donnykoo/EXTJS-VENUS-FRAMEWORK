Ext.define('Module.pos.priceBook.store.PriceBooks', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.priceBook.model.PriceBook',
    model: 'Module.pos.priceBook.model.PriceBook',
	autoLoad: true,
	pageSize: 5
});