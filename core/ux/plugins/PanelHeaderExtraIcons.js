/*
* Add extra button icon to the title bar
* Example usage:
	plugins: [{
		ptype: "headericons",
		headerButtons : [{
			xtype: 'button',
			iconCls: 'icon-page-white-excel',
			index: 1,
			scope: this,
			handler: this.onExportToExcel
		}]
	}]  
*
*/
Ext.define('Ext.ux.plugins.PanelHeaderExtraIcons', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.headericons',
	alternateClassName: 'Ext.ux.PanelHeaderExtraIcons',
 
	iconCls: '',
	index: undefined,
 
	headerButtons: [],
 
	init: function(panel) {
		this.panel = panel;
		this.callParent();
		panel.on('render', this.onAddIcons, this, {single: true});
	},
 
	onAddIcons :function () {
		if (this.panel.getHeader) {
			this.header = this.panel.getHeader();
		} else if (this.panel.getOwnerHeaderCt) {
			this.header = this.panel.getOwnerHeaderCt();
		}
		this.header.insert(this.index || this.header.items.length, this.headerButtons);
	},
	
	getHeader: function(){
		return this.header;
	}
});