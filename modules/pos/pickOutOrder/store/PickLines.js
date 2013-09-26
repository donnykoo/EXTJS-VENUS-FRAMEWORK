Ext.define('Module.pos.pickOutOrder.store.PickLines', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: 'Module.pos.pickOutOrder.model.PickLine',
    model: 'Module.pos.pickOutOrder.model.PickLine',
	proxy: {
		type: 'memory'
	},
	autoDestroy: true,
    data: []
});