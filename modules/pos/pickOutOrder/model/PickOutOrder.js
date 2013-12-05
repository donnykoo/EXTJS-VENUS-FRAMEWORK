Ext.define('Module.pos.pickOutOrder.model.PickOutOrder', {
    extend: 'Ext.data.Model',
    fields: [
		{ name: 'Id', type: 'int' }, 
		{ name: 'Version', type: 'int' }, 
		{ name: 'Active', type: 'boolean' }, 
		{ name: 'LastUpdate', type:'date' }, 
		{ name: 'UpdateBy', type: 'string' }, 
		{ name: 'CreateDate', type: 'date' }, 
		{ name: 'CreateBy', type: 'string' }, 
		{ name: 'IdNumber', type: 'string' },
        { name: 'PlateNumber', type: 'string' },
        { name: 'ServiceProductName', type: 'string' },
        { name: 'Memo', type: 'string' },
        { name: 'Status', type: 'int' },
		{ name: 'StatusValue', type: 'int' },
		{ name: 'PickOutOrderType', type: 'string' },
		{ name: 'Lines', type:'auto' }, 
		{ name: 'Requestor', type: 'string' },
        { name: 'ConfirmBy', type: 'string' },
        { name: 'CloseBy', type: 'string' },
		{ name: 'RefNumber', type: 'string' },
        { name: 'MoveIn', type: 'boolean' }],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/PickOutOrders?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});