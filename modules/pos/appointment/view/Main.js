Ext.define('Module.pos.appointment.view.Main', {
    extend : 'Ext.ux.view.SearchPanel',
    alias  : 'widget.appointmentMainView',
	
	createItems : function(){
		var me = this,
			formConfig = me.formConfig || {},
			gridConfig = me.gridConfig || {},
			store = me.store,
			columns = me.columns;
			
		formConfig = Ext.apply(me.defaultFormConfig, formConfig);
		formConfig.buttons = [
			{ 
				itemId: 'search-btn',
				text: 'Search',
				handler: function(btn, event, eOpts){
					me.onSearchButtonClicked(btn, event, eOpts);
				}
			},
			{ 
				itemId: 'reset-btn',
				text: 'Reset', handler: function(){
					form.getForm().reset();
				} 
			}
		];
		
		gridConfig = Ext.apply(me.defaultGridConfig, gridConfig);	
		gridConfig = Ext.apply(gridConfig, {
			store: me.store,
			columns: me.columns,
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: me.store,
				dock: 'bottom',
				displayInfo: true
			}]
		});
		
		//1. Create the Form Panel
		var form = me.form = Ext.create('Ext.form.Panel', formConfig);
		
		var grid = me.grid = Ext.create('Ext.grid.Panel', gridConfig);
		
		this.items = [form, grid];
	},
	
    initComponent: function() {
        var me = this;
		
        Ext.apply(me, {
            formConfig: {
				height: 100,
				items: [{
					layout: 'hbox',
					defaults: {
						flex: 1,
						padding: '5 0 5 10'
					},
					
					defaultType: 'textfieldSearch',
					items: [
						{
							fieldLabel: '预约号',
							name: 'IdNumber',
							flex: 1
						},{
							xtype: 'datefieldSearch',
							fieldLabel: '预约日期',
							name: 'AppointmentDay',
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
							fieldLabel: '顾客手机',
							name: 'CustomerMobile',
							flex: 1
						},{
							fieldLabel: '车牌',
							name: 'PlateNumber',
							flex: 1
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
                tbar: {
                    xtype: 'toolbar',
                    border: true,
                    height: 30,
                    items: []
                },
            },
			store: Ext.data.StoreManager.lookup('Module.pos.appointment.store.Appointments'),
			columns: [
				{ text: '预约号',  dataIndex: 'IdNumber', width: 120 },
				{ text: '车牌', dataIndex: 'PlateNumber', width: 100 },
				{ text: '工位', dataIndex: 'BayNumber', width: 60 },
				{ text: '预约服务', dataIndex: 'ServiceNumber', width: 80 },
				{ text: '预约日期', dataIndex: 'AppointmentDay', width: 80,  xtype: 'datecolumn', format:'Y-m-d' },
				{ text: '预约开始时间', dataIndex: 'StartTime', width: 160, xtype:'datecolumn',  format:'Y-m-d H:i' },
				{ text: '服务耗时', dataIndex: 'Duration', width: 60, 
					renderer: function(value){
						return Ext.String.format("{0}分钟", value);
					} 
				},
				{ text: '顾客姓名', dataIndex: 'CustomerName', width: 60 },
				{ text: '顾客手机', dataIndex: 'CustomerMobileMobile', width: 100 },
				{ text: '是否接受', dataIndex: 'Accepted', width: 60 },
				{ text: '状态', dataIndex: 'Status', width: 60, 
					renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
						if(value === 'Pending'){
							return '等候';
						}else if(value === 'Confirmed'){
							return '已确认';
						}else if(value == 'Cancelled'){
							return '已取消';
						}
						return value;
					}
				}
			]
        });
		
        me.callParent();
    }
});
