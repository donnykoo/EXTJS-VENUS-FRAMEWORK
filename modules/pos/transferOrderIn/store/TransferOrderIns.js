Ext.define('Module.pos.transferOrderIn.store.TransferOrderIns', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.transferOrderIn.model.TransferOrderIn',
    model: 'Module.pos.transferOrderIn.model.TransferOrderIn',
    autoLoad: true,
    pageSize: basket.pageSize
});