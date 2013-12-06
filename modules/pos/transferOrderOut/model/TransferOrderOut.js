Ext.define('Module.pos.transferOrderOut.model.TransferOrderOut', {
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
        { name: 'Status', type: 'string' },
		{ name: 'Operator', type: 'string' },
        { name: 'ConfirmPerson', type: 'string' },
        { name: 'ClosePerson', type: 'string' },
        { name: 'ExpectedArrivalDate', type: 'date' },
        { name: 'Approved', type: 'boolean' },
        { name: 'Country', type: 'string' },
        { name: 'TransferToStore', type: 'string' },
        { name: 'TransferFromStore', type: 'string' },
        { name: 'Province', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'District', type: 'string' },
        { name: 'Address', type: 'string' },
        { name: 'Zipcode', type: 'string' },
        { name: 'ContactPerson', type: 'string' },
        { name: 'ContactPhone', type: 'string' },
        { name: 'ContactMobile', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'DemandAmount', type: 'decimal' },
        { name: 'ActualAmount', type: 'decimal' },
		{ name: 'Lines', type:'auto' }],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/TransferOrderOuts?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});