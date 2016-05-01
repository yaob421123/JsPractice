(function($){
    $.fn.Plug = function(options){
        return this.each(function() {
            var _this = $(this);
            //单例模式
            var selects = _this.data('plug');
            if(!selects){
                selects = new plug(_this, options);
                _this.data('plug', selects);
            }
        });
    }
    var plug = function(elments,options){
        var obj = {
			//....
		};
		this.elments = elments;
		this.options = $.extend(true, obj, options || {});

        this.init();
    }
    selectOption.prototype = {
        init:function(){
            //....
        },
		change : function(){
			//....
		}
    }
})(jQuery);