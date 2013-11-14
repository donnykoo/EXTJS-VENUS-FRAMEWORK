﻿Ext.define('Module.pos.purchaseOrder.model.PurchaseOrder', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean' },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'Store', type: 'string' },
        { name: 'IdNumber', type: 'string' },
        { name: 'Operator', type: 'string' },
        { name: 'ApprovedBy', type: 'string' },
        { name: 'ClosedBy', type: 'string' },
        { name: 'ExpectedArrivalDate', type: 'date' },
        { name: 'Approved', type: 'bool' },
        { name: 'Supplier', type: 'string' },
        { name: 'Country', type: 'string' },
        { name: 'Province', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'District', type: 'string' },
        { name: 'Address', type: 'string' },
        { name: 'Zipcode', type: 'string' },
        { name: 'ContactPerson', type: 'string' },
        { name: 'ContactPhone', type: 'string' },
        { name: 'ContactMobile', type: 'string' },
        { name: 'DemandAmount', type: 'decimal' },
        { name: 'ActualAmount', type: 'decimal' },
        { name: 'ConfirmPerson', type: 'string' },
        { name: 'ClosePerson', type: 'string' },
        { name: 'Status', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'Lines', type: 'auto' }
    ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/PurchaseOrders?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});