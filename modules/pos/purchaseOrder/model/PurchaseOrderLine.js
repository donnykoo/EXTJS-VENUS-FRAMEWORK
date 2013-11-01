Ext.define('Module.pos.purchaseOrder.model.PurchaseOrderLine', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'SKU', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'UOM', type: 'auto' },
        { name: 'PurchasePrice', type: 'decimal' },
        { name: 'DemandQuantity', type: 'decimal' },
        { name: 'ActualQuantity', type: 'decimal' },
        { name: 'DemandAmount', type: 'decimal' },
        { name: 'ActualAmount', type: 'decimal' }
    ],
    idProperty: 'SKU'
});