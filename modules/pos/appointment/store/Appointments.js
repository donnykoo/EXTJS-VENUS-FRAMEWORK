Ext.define('Module.pos.appointment.store.Appointments', {
    extend: 'Ext.data.Store',
    requires: 'Module.pos.appointment.model.Appointment',
    model: 'Module.pos.appointment.model.Appointment',
	autoLoad: true,
	pageSize: basket.pageSize
});