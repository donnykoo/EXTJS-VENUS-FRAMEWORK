Ext.define('Module.pos.transferOrderOut.store.TransferOrderOutLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.transferOrderOut.model.TransferOrderOutLine',
    model: 'Module.pos.transferOrderOut.model.TransferOrderOutLine',
	proxy: {
		type: 'memory'
	},
	autoDestroy: true,
    data: []
});