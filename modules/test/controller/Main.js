Ext.define('Module.test.controller.Main', {
    extend : 'Ext.app.Controller',

    stores : ['Module.test.store.Test'],
    models : ['Module.test.model.Test'],

    init: function() {
        var me = this;

        me.control({
            'mainwin' : {
                beforerender : me.handleMainBeforeRender
            }
        });
    },

    handleMainBeforeRender: function(win) {
        console.log('Main Before Render');
    }
});
