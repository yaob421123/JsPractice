define(['jquery'],function(){
	/**
		<div>
			<div id="">
				<input type="text"> 默认 input 
			</div>
			<ul></ul>
		</div>
	**/
	$.fn.yScroll = function(options){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var myscroll = _this.data('scroll');
            if(!myscroll){
                myscroll = new scroll(_this, options);
                _this.data('scroll', myscroll);
            }
        });
	}
	var scroll = function(elements, options){
		var obj = {
            defaultTxt:"input" //默认input标签
        };
        this.elements = elements;
        this.options = $.extend(true, obj, options || {}); 
        this.defaultTxt = this.elements.find(obj.defaultTxt);

        this.init(); 
	}
	scroll.prototype = {
		init : function (){
			this.change();
		},
		change : function(){
			var _this = this;
			var slectUl = this.elements.siblings('ul');
			this.elements.on('click',  function() {
				slectUl.is(':hidden') ? slectUl.show() : slectUl.hide();
			});

			this.elements.siblings('ul').on('click', 'li', function() {
				var index = $(this).index();
				var text = $(this).text();
				var aid = $(this).attr('value');
				//判断是 input标签的 还是其他标签
				if(_this.defaultTxt.get(0).tagName == "INPUT"){
					_this.defaultTxt.attr({
						'value':text,
						'aid' : aid
					});
				}else{
					_this.defaultTxt.html(text);
					_this.defaultTxt.attr({
						'aid' : aid
					});
				}
				
				slectUl.hide();
			});
		}
	}
});
