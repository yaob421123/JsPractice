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
			type:'phone',
            data:'data-count-down',
            dataToggle:'alert',
			dataErr:'',
            num:120,
			validateback:function(tel){
				//验证手机或者邮箱是否存在的回调函数，数组 [true/false, 错误提示]
			},
            callback:function(){
				//倒计时完成后回调
            }
        }
		this.elements = elements;
        this.options = $.extend(true, obj, options || {}); 
		this.type = this.options.type; //手机或者邮箱倒计时的类型。默认phone，  mail可选 
        this.data = this.options.data; //输入框data， 验证手机或者邮箱的输入框
		this.dataErr = this.options.dataErr; //错误提示 class或者id
        this.dataToggle = this.options.dataToggle; //显示方式 目前使用自带弹出框 alert
        this.num = this.options.num; 
		this.validateback = this.options.validateback; //验证手机或者邮箱的回到函数
        this.callback = this.options.callback; //倒计时开始后的回调

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
				if($('input['+ _this.data +']').length <= 0)return;
                if(_this.type == 'mail'){
					var $input = $('input['+ _this.data +']').eq(0);
					if($input.val() == ''){
						$(_this.dataErr).html('*请输入邮箱');
						return false;
					}else if(isEmail($input.val()) == false){
						$(_this.dataErr).html('*请输入正确的邮箱');
						return false;
					}
				}else{
					var $input = $('input['+ _this.data +']').eq(0);
					if($input.val() == ''){
						$(_this.dataErr).html('*请输入手机号码');
						return false;
					}else if(isPhoneNo($input.val()) == false){
						$(_this.dataErr).html('*您输入的手机号码不正确');
						return false;
					}
				}
				
				var __content;
				var _isVali = _this.validateback($input.val(), __content);
				if(!_isVali[0]){
					$(_this.dataErr).html('*' + _isVali[1]);
					return false;
				}
                clearInterval(_this.timer);
				 _this.elements.css('pointer-events', 'none')
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
	/*邮箱验证*/
	function isEmail(str) { 
		var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ; 
		return pattern.test(str); 
	}
})(jQuery)