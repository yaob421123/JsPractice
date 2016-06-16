define(['jquery'],function(){
	/**
		<div>
			<div id="xxx">
				<input type="text">  //默认 input 
				<input id='aid' type="hidden">
			</div>
			<ul>
				<li aidddd='1'></li>
			</ul>
		</div>


		$("#xxx").newYDate({
			aidInput:'#aid', //赋值id的input的id
			aidLi:'aidddd', //默认li的带有aid属性
			callback: function(id){
				//返回当前点击的id
			}
		});
	**/
	$.fn.newYDate = function(options){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var myscroll = _this.data('newscroll');
            if(!myscroll){
                myscroll = new newscroll(_this, options);
                _this.data('newscroll', myscroll);
            }
        });
	}
	var newscroll = function(elements, options){
		var obj = {
            defaultTxt:"input", //默认input标签
            aidInput:'#province_name', //赋值id的input的id
            aidLi:'aid', //默认li的带有aid属性
            callback: function(id){

            }
        };
        this.elements = elements;
        this.options = $.extend(true, obj, options || {}); 
        this.defaultTxt = this.elements.find(obj.defaultTxt).eq(0);
        this.aidInput = this.elements.find(obj.aidInput);
        this.aidLi = obj.aidLi;

        this.backcall = obj.callback;
        
        this.init(); 
	}
	newscroll.prototype = {
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
				var aid = $(this).attr(_this.aidLi);
				
				_this.defaultTxt.attr({
					'value':text
				});

				_this.aidInput.attr({
					'value':aid
				})	
				slectUl.hide();

				_this.backcall(aid)
			});
			$(document).on("click", function(e){
				var target  = $(e.target);
		        if(target.closest(_this.elements).length == 0){
		           slectUl.hide();
		        } 
            });
		}
	}
});
