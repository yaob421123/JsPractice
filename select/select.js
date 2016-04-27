(function($){
    $.fn.select = function(options){
        return this.each(function() {
            var _this = $(this);
            //单例模式
            var selects = _this.data('selectOption');
            if(!selects){
                selects = new selectOption(_this, options);
                _this.data('selectOption', selects);
            }
        });
    }
    var selectOption = function(elments,options){
        this.elments = elments;
        this.options = options;
        this.selectShowbox = this.elments.find("." + this.options.selectShowbox);
        this.showboxClass =  this.options.showboxClass || "active";
        this.selectOption = this.elments.find("." + this.options.selectOption);
        this.optionClass =  this.options.optionClass || "hover";
        this.init();
    }
    selectOption.prototype = {
        init:function(){
            this.selectToggle();/*下拉框导航事件*/
            this.optionHover();/*下拉框鼠标移入事件*/
            this.optionClick();/*下拉框点击事件*/
            this.documentEvent();/*body点击事件*/
        },
        selectToggle:function(){
            var _this = this;

            this.selectShowbox.on("click", function(event){
                var event = event||window.event;
                event.stopPropagation();
                if(_this.selectOption.is(":hidden")){
                    _this.selectOption.show();
                    _this.selectShowbox.addClass(_this.showboxClass);
                }else{
                    _this.selectOption.hide();
                    _this.selectShowbox.removeClass(_this.showboxClass);
                }
            });
            /*
            this.elments.toggle(function(){
                _this.selectOption.show();
                _this.selectShowbox.addClass(_this.showboxClass);
            }, function(){
                _this.selectOption.hide();
                _this.selectShowbox.removeClass(_this.showboxClass);
            });*/
        },
        optionHover:function(){
            var _this = this;
            this.selectOption.find("li").hover(function() {
               $(this).addClass(_this.optionClass).siblings().removeClass(_this.optionClass);
            }, function() {
                $(this).removeClass(_this.optionClass);
            });
        },
        optionClick:function(){
            var _this = this;
            this.selectOption.find("li").on("click", function(){
                var text = $(this).text();
                _this.selectShowbox.text(text).removeClass(_this.showboxClass);
                 _this.selectOption.hide();
            });
        },
        documentEvent:function(){
            var _this = this;
            $("html,body").on("click", function(){
                _this.selectOption.hide();
                _this.selectShowbox.removeClass(_this.showboxClass);
            });
        }
    }
})(jQuery);