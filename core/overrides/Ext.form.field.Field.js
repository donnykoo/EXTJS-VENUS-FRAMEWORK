/** 
	Override the form field add the method to retriev the odata filters 
**/
Ext.override(Ext.form.field.Base, {
	/**
	 * If the returned value is False, then this filter will not be added into the $filter parameter
	 */
	getODataFilter: function(){
		return false;
	}
});

Ext.override(Ext.form.field.Text, {
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