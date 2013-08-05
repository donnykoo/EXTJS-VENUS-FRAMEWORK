Ext.live = function (selector, event, handler) {
    Ext.getBody().on(event, function(event, target){
        handler.apply(Ext.get(target), arguments);
    }, null, {
        delegate: selector
    });
};