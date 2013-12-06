﻿Ext.define('Module.pos.serviceInstance.model.ServiceInstance', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Version', type: 'int' },
        { name: 'Active', type: 'boolean' },
        { name: 'LastUpdate', type: 'date' },
        { name: 'UpdateBy', type: 'string' },
        { name: 'CreateDate', type: 'date' },
        { name: 'CreateBy', type: 'string' },
        { name: 'IdNumber', type: 'string' },
        { name: 'ServiceNumber', type: 'string' },
        { name: 'ServiceName', type: 'string' },
        { name: 'ServiceProductSKU', type: 'string' },
        { name: 'WorkerNumber', type: 'string' },
        { name: 'WorkerName', type: 'string' },
        { name: 'Status', type: 'string' },
        { name: 'Memo', type: 'string' },
        { name: 'PlanStartTime', type: 'date' },
        { name: 'PlanEndTime', type: 'date' },
        { name: 'AppointmentDay', type: 'date' },
        { name: 'ActualStartTime', type: 'date' },
        { name: 'ActualEndTime', type: 'date' },
        { name: 'BayNumber', type: 'string' },
        { name: 'PlateNumber', type: 'string' },
        { name: 'CustomerNumber', type: 'string' },
        { name: 'CustomerName', type: 'string' },
        { name: 'CustomerMobile', type: 'string' },
        { name: 'VehicleModel', type: 'string' },
        { name: 'VehicleStatus', type: 'int' },
        { name: 'Ref', type: 'string' },
        { name: 'ReceiveCarCheckOrder', type: 'string' },
        { name: 'HandOverCarCheckOrder', type: 'string' },
        { name: 'OrderType', type: 'string' },
        { name: 'KeyLocation', type: 'string' },
        { name: 'IsDiy', type: 'bool' },
        { name: 'InstanceProducts', type: 'auto' },
        { name: 'Steps', type: 'auto' },
        { name: 'Duration', type: 'int' },
        { name: 'Slot0', type: 'int' },
        { name: 'Slot1', type: 'int' },
        { name: 'Slot2', type: 'int' },
        { name: 'Slot3', type: 'int' },
        { name: 'Slot4', type: 'int' },
        { name: 'Slot5', type: 'int' }
    ],
    idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/ServiceInstanceDetails?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
            totalProperty: 'odata.count',
            useSimpleAccessors: true
        }
    }
});