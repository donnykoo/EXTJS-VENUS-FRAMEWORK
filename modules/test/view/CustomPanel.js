Ext.define('Module.test.view.CustomPanel', {
    extend : 'Ext.Panel',
    alias  : 'widget.test.view.CustomPanel',

    cls    : 'test-main-win',
    height : 200,
    width  : 100,

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            html  : 'This is custom panel!',
            title : 'Dynamic Load Panel'
        });

        me.callParent();
    }
});
