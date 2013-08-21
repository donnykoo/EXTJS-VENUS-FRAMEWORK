Ext.define('Module.pos.service.store.Materials', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.service.model.Material',
    model: 'Module.pos.service.model.Material',
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