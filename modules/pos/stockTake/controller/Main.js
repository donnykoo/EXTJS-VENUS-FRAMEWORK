Ext.define('Module.pos.stockTake.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: ['Module.pos.stockTake.view.StartWindow', 'Module.pos.stockTake.view.HistoryWindow'],

    apiPath: Ext.String.format('{0}/api/StockTakesApi', "/" === basket.contextPath ? "" : basket.contextPath),

    objectId: 0,
    objectVersion: 0,
    objectData: { },

    refs: [{
            ref: 'contentPanel',
            selector: 'contentpanel'
        }, {
            ref: 'stockTakeMainView',
            selector: 'stockTakeMainView'
        }],

    init: function() {
        var me = this;

        me.control({
            'stockTakeMainView': {
                beforerender: function(cmp) {
                    Ext.Ajax.request({
                        url: Ext.String.format("{0}/{1}/RunningOrComplete", me.apiPath),
                        method: 'POST',
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            var location = response.getResponseHeader('Location');
                            Ext.Logger.debug("Resource Location : " + location);
                            Ext.Logger.dir(obj);
                            var startButton = Ext.getCmp('startButton');
                            var runningButton = Ext.getCmp('runningButton');
                            if (obj) {
                                me.setObjectId(obj.Id);
                                if (obj.Id > 0) {
                                    startButton.hide();
                                    runningButton.show();
                                }
                            } else {
                                startButton.show();
                                runningButton.hide();
                                me.setObjectId(0);
                            }

                        },
                        failure: function(response, opts) {
                            Ext.Logger.warn('server-side failure with status code ' + response.status);
                        },
                        scope: this
                    });
                },

                afterrender: function(cmp) {
                },

                added: function(cmp, container, pos, eOpts) {

                }
            },
            'stockTakeMainView form #start-btn': {
                click: me.onStartButtonClicked
            },
            'stockTakeMainView form #running-btn': {
                click: me.onRunningClicked
            },
            'stockTakeMainView form #history-btn': {
                click: me.onHistoryClicked
            }
        });

    },

    onStartButtonClicked: function(btn, event, eOpts) {
        var me = this;
        Ext.Ajax.request({
            url: Ext.String.format("{0}/{1}/Create", me.apiPath, 0),
            method: 'POST',
            params: {
                Id: 0
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var location = response.getResponseHeader('Location');
                Ext.Logger.debug("Resource Location : " + location);
                Ext.Logger.dir(obj);
                me.setObjectId(obj.Id);

                var contentView = me.getContentPanel(),
                    startWinow = me.getStockTakeMainView().getStartWindow();

                startWinow.setObjectId(me.objectId);
                startWinow.showAt(contentView.getX() + 20, contentView.getY() + 10);
            },
            failure: function(response, opts) {
                Ext.Logger.warn('server-side failure with status code ' + response.status);
            },
            scope: this
        });
    },

    onRunningClicked: function(grid, record, item, index, e, eOpts) {
        var me = this;

        var contentView = me.getContentPanel(),
            startWinow = me.getStockTakeMainView().getStartWindow();

        startWinow.setObjectId(me.objectId);
        startWinow.showAt(contentView.getX() + 20, contentView.getY() + 10);

    },

    onHistoryClicked: function(grid, record, item, index, e, eOpts) {
        var me = this;

        var contentView = me.getContentPanel(),
            historyWindow = me.getStockTakeMainView().getHistoryWindow();

        historyWindow.showAt(contentView.getX() + 20, contentView.getY() + 10);
    },

    setObjectId: function(id) {
        this.objectId = id;
    },
    getObjectId: function() {
        return this.objectId;
    },

    beforeLaunch: function(appliation) {

    },

    launch: function(application) {
        var me = this;
    }
});
