Ext.override(Ext.data.reader.Reader, {
    readRecords: function(data) {
        var me = this,
            success,
            recordCount,
            records,
            root,
            total,
            value,
            message;
        
        /*
         * We check here whether fields collection has changed since the last read.
         * This works around an issue when a Model is used for both a Tree and another
         * source, because the tree decorates the model with extra fields and it causes
         * issues because the readers aren't notified.
         */
        if (me.lastFieldGeneration !== me.model.prototype.fields.generation) {
            me.buildExtractors(true);
        }
        
        /**
         * @property {Object} rawData
         * The raw data object that was last passed to {@link #readRecords}. Stored for further processing if needed.
         */
        me.rawData = data;

        data = me.getData(data);
        
        success = true;
        recordCount = 0;
        records = [];
            
        if (me.successProperty) {
            value = me.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }
        
        if (me.messageProperty) {
            message = me.getMessage(data);
        }

        
        // Only try and extract other data if call was successful
        if (me.readRecordsOnFailure || success) {
            // If we pass an array as the data, we dont use getRoot on the data.
            // Instead the root equals to the data.
            root = Ext.isArray(data) ? data : me.getRoot(data);
            
            if (root) {
                total = root.length;
            }

          if (me.totalProperty) {
                value = parseInt(me.getTotal(data), 10);
                if (!isNaN(value)) {
                    total = value;
                }
            }

           if (root) {
                records = me.extractData(root);
                recordCount = records.length;
            }
        }

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success,
            message: message
        });
    }
});

