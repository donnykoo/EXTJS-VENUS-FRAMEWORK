Ext.define('Module.pos.customer.model.Customer', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'IdNumber', 'FirstName', 'MiddleName', 'LastName',
			'Gender', 'Mobile', 'HomePhone', 'BusinessPhone', 'Fax', 'Country', 'Province', 'City', 'County', 
			'Street1', 'Street2', 'IdentityCardNumber'],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Customers?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true 
        }
    }
});