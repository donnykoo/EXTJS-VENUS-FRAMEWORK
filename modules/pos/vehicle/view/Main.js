Ext.define('Module.pos.vehicle.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.vehicleMainView',
	
    initComponent: function() {
        var me = this;
		
        Ext.apply(me, {
            formConfig: {
				height: 120,
				items: [{
					layout: 'hbox',
					defaults: {
						flex: 1,
						padding: '5 0 5 10'
					},
					
					defaultType: 'textfieldSearch',
					items: [
						{
							fieldLabel: '车牌号',
							name: 'PlateNumber',
							flex: 1
						},{
							fieldLabel: '客户编号',
							name: 'CustomerNumber',
							flex: 1
						},{
							xtype: 'hidden',
							name: 'placeholder2',
							flex: 1,
							submitValue: false
						}
					]
				}, {
					layout: 'hbox',
					defaults: {
						flex: 1,
						padding: '5 0 5 10'
					},
					
					defaultType: 'textfieldSearch',
					items: [
						{
							fieldLabel: '车型',
							name: 'VehicleModel',
							flex: 2
						},{
							xtype: 'hidden',
							name: 'placeholder',
							flex: 1,
							submitValue: false
						}
					]
				}]
			},
			gridConfig: {

			},
			store: Ext.data.StoreManager.lookup('Module.pos.vehicle.store.Vehicles'),
			columns: [
				{ text: '车辆编号',  dataIndex: 'IdNumber', width: 160 },
				{ text: '车牌', dataIndex: 'PlateNumber', width: 100 },
				{ text: '车型', dataIndex: 'VehicleModel', width: 200 },
				{ text: '顾客编号', dataIndex: 'CustomerNumber', width: 160 },
				{ text: 'Vin Code', dataIndex: 'VinCode', width: 160 }
			]
        });
		
        me.callParent();
    }
});
