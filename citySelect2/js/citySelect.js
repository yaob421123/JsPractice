(function($){
	$.fn.CityScroll = function(options){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var mycity = _this.data('city');
            if(!mycity){
                mycity = new city(_this, options);
                _this.data('city', mycity);
            }
        });
	}
	var city = function(elements, options){
		var obj = {
            cityProvince : "#province", //省份
            cityProper : "#proper" //市区
        };
        this.elements = elements;
        this.options = $.extend(true, obj, options || {}); 

        this.cityProvince = this.elements.find(obj.cityProvince); //省份
        this.cityProper = this.elements.find(obj.cityProper);//市区
        this.provinceUl = this.cityProvince.siblings('ul');
        this.properUl = this.cityProper.siblings('ul');

        this.myProvince; //当前所选省份
        this.myProper; //当前所选城市

        this.init(); 
		console.log(1);
	}
	city.prototype = {
		init : function (){
			
			this.change();
			this.bodyEvent();
		},
		change : function(){
			var _this = this;

			//省份
			this.cityProvince.on('click', function() {
				_this.properUl.hide();
				_this.provinceUl.is(":hidden") ? _this.provinceUl.show() : _this.provinceUl.hide();
				_this.provinceCity();
			});

			//省份
			this.cityProper.on('click', function() {
				_this.provinceUl.hide();
				if(_this.properUl.find('li').length == 0) return
				_this.properUl.is(":hidden") ? _this.properUl.show() : _this.properUl.hide();
			});
		},
		provinceCity : function(){
			var _this = this;
			var temp_html = ''; //省份

			for(var i = 0; i < city_json.length; i++){
				temp_html += '<li aid='+city_json[i].id+'>'+city_json[i].name+'</li>';
			}
			_this.provinceUl.html(temp_html);

			_this.provinceUl.on('click', 'li', function() {
				var index = $(this).index();
				var text = $(this).text();
				var aid = $(this).attr('aid')
				_this.cityProper.find("input").attr('value',"请选择市/区");
				_this.cityProvince.find("input").attr({
					value: text,
					aid : aid
				})
				_this.provinceUl.hide();

				var temp_html2 = "";
				for(var i = 0; i < city_json[index].child.length; i++){
                    temp_html2+='<li aid='+ city_json[index].child[i].id +'>'+city_json[index].child[i].name+'</li>';
                }
                _this.properUl.html(temp_html2);
			});

			_this.properUl.on('click', 'li', function() {
				var text = $(this).text();
				var aid = $(this).attr('aid');
				_this.cityProper.find("input").attr({
					value: text,
					aid : aid
				})
				_this.properUl.hide();
			});
		},
		bodyEvent : function (){
			var _this = this;
			$('body').on('click',  function(e) {
			    if(!_this.elements.is(event.target) && (_this.elements.has(event.target).length ===0)){
			        _this.provinceUl.hide();
			        _this.properUl.hide();
			    }
			});
		}
	}
})(jQuery)
