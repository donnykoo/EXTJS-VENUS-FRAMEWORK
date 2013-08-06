Ext.define('Module.test.controller.Main', {
    extend : 'Ext.app.Controller',
	
    stores : ['Module.test.store.Test'],
    models : ['Module.test.model.Test'],
	
	refs: [{
		ref: 'mainwin',
        selector: 'mainwin'
	}],

    init: function() {
        var me = this;

        me.control({
            'mainwin' : {
                beforerender : me.handleMainBeforeRender
            },
			
			'mainwin toolbar #openCustomPanel-btn': {
				click: me.onOpenCustomPanelClicked
			}
        });
		
    },

    handleMainBeforeRender: function(win) {
        console.log('Main Before Render');
    },
	
	onOpenCustomPanelClicked: function(btn, event, eOpts){
		var me = this;
		var panel = Ext.create('Module.test.test.view.CustomPanel');
		var win = me.getMainwin();
		win.removeAll();
		win.add(panel);
	}
});
