Ext.define('Module.pos.transferOrderOut.store.TransferOrderOuts', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.transferOrderOut.model.TransferOrderOut',
    model: 'Module.pos.transferOrderOut.model.TransferOrderOut',
    autoLoad: true,
    pageSize: basket.pageSize
});