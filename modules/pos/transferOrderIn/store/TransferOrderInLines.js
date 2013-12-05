Ext.define('Module.pos.transferOrderIn.store.TransferOrderInLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.transferOrderIn.model.TransferOrderInLine',
    model: 'Module.pos.transferOrderIn.model.TransferOrderInLine',
	proxy: {
		type: 'memory'
	},
	autoDestroy: true,
    data: []
});