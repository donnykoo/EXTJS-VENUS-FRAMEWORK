Ext.define('App.controller.Main', {
    extend : 'Ext.app.Controller',

    init: function() {
        var me = this;

        me.control({
            'mainview button' : {
                click : me.handleButtonClick
            }
        });
    },

    handleButtonClick: function(btn) {
        var me     = this,
            app    = me.application,
            subapp = new Ext.app.SubApplication({
                app          : app,
                id           : 'Module.test.view.Main',
                loadMask     : true,
                loadingText  : 'Loading Test...',

                controllers : [
                    'Module.test.controller.Main'
                ],

                dependencies : {
                    css : [
                        'modules/test/css/main.css'
                    ],
                    js  : [
                        'modules/test/controller/Main.js',
                        'modules/test/view/Main.js'
                    ]
                },

                launch: function() {
                    var win = Ext.create('Module.test.view.Main', {
                        app : me
                    });
                    win.show();

                    return win;
                }
            });
    }
});
