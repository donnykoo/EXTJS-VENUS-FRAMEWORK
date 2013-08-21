Ext.define('Module.pos.product.store.Materials', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.product.model.Material',
    model: 'Module.pos.product.model.Material',
	autoLoad: false,
	data: '',
	proxy: {
        type: 'memory',
        reader: {
            type: 'xml',
			record: 'Material',
            root: 'elements'                            
		}    
    }
});