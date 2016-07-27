!(function($){
	$.fn.CountDown = function(options){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var date = _this.data('countDown');
            if(!date){
                date = new countDown(_this, options);
                _this.data('countDown', date);
            }
        });
	}
	var countDown = function(elements, options){
        var obj = {
            data:'data-count-down',
            dataToggle:'alert',
            num:120,
            callback:function(){

            }
        }
		this.elements = elements;
        this.options = $.extend(true, obj, options || {}); 
        this.data = this.options.data;
        this.dataToggle = this.options.dataToggle; //显示方式 目前使用自带弹出框 alert
        this.num = this.options.num; 
        this.callback = this.options.callback;

        this.timer = null;
        this.init();
    }
    countDown.prototype = {
    	init : function(){
    		this.change();
    	},
        change : function(){
            var _this = this;
            this.elements.on('click', function() {
                var $input = $('input['+ _this.data +']').eq(0);
                if($input.val() == ''){
                    alert('请输入手机号码');
                    return false;
                }else if(isPhoneNo($input.val()) == false){
                    alert('您输入的手机号码不正确');
                    return false;
                }
                clearInterval(_this.timer);
                var $html = _this.elements.html();
                var num = _this.num + 1;
                _this.timer = setInterval(function(){
                    num --;
                    _this.elements.addClass('active');
                    _this.elements.find('i').html('(' +num+ ')'); 
                    if(num <= 0){
                        clearInterval(_this.timer);
                        _this.elements.removeClass('active');
                        _this.elements.find('i').html('');
                        _this.elements.css('pointer-events', 'auto')
                    }
                }, 1000);
                _this.callback();
            });
        }
    }
    function isPhoneNo(phone) { 
        var pattern = /^1[34578]\d{9}$/; 
        return pattern.test(phone); 
    }
})(jQuery)