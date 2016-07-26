!(function($){
	$.fn.CountDown = function(num, callback){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var date = _this.data('countDown');
            if(!date){
                date = new countDown(_this, num, callback);
                _this.data('countDown', date);
            }
        });
	}
	var countDown = function(elments,num, callback){
		this.elments = elments;
        if(typeof num == 'string'){
            this.num = parseInt(num);
        }else if(typeof num == 'function'){
            this.num = 120;
            this.callback = num;
        }else{
            this.num = num || 120;
        }
        this.callback = callback;
        //console.log(this.num)

        this.timer = null;
        this.init();
    }
    countDown.prototype = {
    	init : function(){
    		this.change();
    	},
        change : function(){
            var _this = this;
            this.elments.on('click', function() {
                var num = _this.num;
                clearInterval(_this.timer);
                _this.elments.css('pointer-events', 'none')
                var $html = _this.elments.html();
                _this.timer = setInterval(function(){
                    num --;
					_this.elments.addClass('active');
                    _this.elments.find('i').html('(' +num+ ')'); 
                    if(num <= 0){
                        clearInterval(_this.timer);
						_this.elments.removeClass('active');
                        _this.elments.find('i').html('');
                        _this.elments.css('pointer-events', 'auto')
                    }
                }, 1000);
                if(_this.callback){_this.callback();}
            });
        }
    }
})(jQuery)