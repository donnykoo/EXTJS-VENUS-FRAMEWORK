Ext.define('Module.pos.appointment.model.Appointment', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Version', 'Active', 'LastUpdate', 'UpdateBy', 'CreateDate', 'CreateBy', 'Store', 'IdNumber', 
			'ServiceNumber', 'BayNumber', 'AppointmentDay', 'StartTime', 'EndTime', 'Duration', 'StaffNumber', 'Status', 'PlateNumber', 
			'VehicleModel', 'CustomerNumber', 'CustomerName', 'CustomerMobile', 'Memo', 'Accepted',
			'Slot0', 'Slot1', 'Slot2', 'Slot3', 'Slot4', 'Slot5' ],
	idProperty: 'Id',
    proxy: {
        type: 'ajax',
        url: Ext.String.format('{0}/Appointments?$inlinecount=allpages', basket.dataSource),
        reader: {
            type: 'json',
            root: 'value',
			totalProperty: 'odata.count',
			useSimpleAccessors: true,
			listeners: {
				exception: function(reader, response, error, eOpts){
					alert(response.responseCode);
				}
			}
        }
    }
});