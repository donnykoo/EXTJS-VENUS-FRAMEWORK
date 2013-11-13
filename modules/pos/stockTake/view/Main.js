/**
 * serviceInstance主显示页面
 */
Ext.define('Module.pos.stockTake.view.Main', {
    id: 'StcokTakeMainView',
    extend: 'Ext.ux.view.SearchPanel',
    alias: 'widget.stockTakeMainView',

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            formConfig: {
                height: 60,
                items: []
            }
        });
        me.createItems();
        me.callParent();
    },

    createItems: function() {
        var me = this,
            formConfig = me.formConfig || { },
            store = me.store,
            columns = me.columns;

        formConfig = Ext.apply(me.defaultFormConfig, formConfig);
        formConfig.buttons = [
            {
                id: 'startButton',
                itemId: 'start-btn',
                text: '开始',
                hidden: true
            }, {
                id: 'runningButton',
                itemId: 'running-btn',
                text: '查看进行中',
                hidden: true
            },
            {
                id: 'historyButton',
                itemId: 'history-btn',
                text: '查看历史'
            }
        ];

        //1. Create the Form Panel
        var form = me.form = Ext.create('Ext.form.Panel', formConfig);

        this.items = [form];
    },

    getStartWindow: function() {
        var me = this;
        return Ext.widget('stockTakeStartWindow', { id: 'StockTakeStartWindow' });
    },
    getHistoryWindow: function() {
        var me = this;
        return Ext.widget('stockTakeHistoryWindow', { id: 'StockTakeHistoryWindow' });
    }
});
