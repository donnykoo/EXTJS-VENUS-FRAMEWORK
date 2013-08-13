/** 
	Override the form field add the method to retriev the odata filters 
**/
Ext.define('Ext.form.field.TextSearch', {
	extend: 'Ext.form.field.Text',
	alias: 'widget.textfieldSearch',
	/**
	 * If the returned value is False, then this filter will not be added into the $filter parameter
	 */
	getODataFilter: function(){
		var me = this,
			val = me.getValue();
		if(Ext.isEmpty(val)){
			return false;
		}
		
		//If contains % in the text field, then this is pattern match search
		var isEqualOperation = true;
		
		if(val.indexOf('%') != -1){
			if(val.indexOf('[%]') != -1){
				var newVal = val.replace(/[%]/g, '');
				if(newVal.indexOf('%') != -1){
					isEqualOperation = false;
				}
			}else{
				isEqualOperation = false;
			}
		}
		
		if(isEqualOperation){
			return Ext.String.format("{0} eq '{1}'", this.getName(), val);
		}else{
			return Ext.String.format("substringof('{0}', {1})",val, this.getName());
		}
	}
});


Ext.define('Ext.form.field.DateSearch', {
	extend: 'Ext.form.field.Date',
	alias: 'widget.datefieldSearch',
	
	valueToRaw: function(value) {
		var rawVal = this.getRawValue(),
			prefix = '';
			
			
		if(rawVal && rawVal.indexOf(':') > 0){
			colon = rawVal.indexOf(':');
			prefix = rawVal.substring(0, colon + 1);
		}
		
		var date = this.parseDate(value);
		if(date){
			return Ext.String.format('{0}{1}', prefix, this.formatDate(this.parseDate(value)));
		}else{
			return Ext.String.format('{0}', prefix);
		}
    },
	
	parseDate : function(value) {
        if(!value || Ext.isDate(value)){
            return value;
        }


		if(Ext.String.startsWith(value, 'After:', true) || 
				Ext.String.startsWith(value, 'Before:', true)){
			value = value.substr(value.indexOf(':') + 1);
			
		};
		
        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },
	
	getODataFilter: function(){
		var me = this,
			val = me.getValue();
			rawVal = me.getRawValue();
		if(Ext.isEmpty(val)){
			return false;
		}
		
		var operator = 'eq';
		
		if(Ext.String.startsWith(rawVal, 'After:', true)){
			operator = 'gt';
		}else if(Ext.String.startsWith(rawVal, 'Before:', true)){
			operator = 'lt';
		}
		
		
		
		return Ext.String.format("{0} {1} datetimeoffset'{2}'", this.getName(), operator, basket.UTCDateString(val));
	}
});
