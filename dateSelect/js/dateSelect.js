$.fn.dateSelect = function(options){
	return this.each(function() {
		var _this = $(this);
		//单例模式
		var mydate = _this.data('date');
		if(!mydate){
			mydate = new date(_this, options);
			_this.data('date', mydate);
		}
	});
}
var date = function(elements, options){
	var obj = {
		year : '#year', //年月日
		month : '#month', 
		day : '#day'
	};
	this.elements = elements;
	this.options = $.extend(true, obj, options || {}); 

	this.year = this.elements.find(obj.year);
	this.month = this.elements.find(obj.month);
	this.day = this.elements.find(obj.day);

	this.yearUl = this.year.siblings('ul');
	this.monthUl = this.month.siblings('ul');
	this.dayUl = this.day.siblings('ul');

	this.nowYear = 0; //当前选择的年数
	this.nowMonth = 0;//当前选择的月份

	this.len = 0;

	this.init(); 
}
date.prototype = {
	init : function (){
		this.layerout();
		this.change();
		this.bodyEvent();
	},
	layerout : function (){
		var _this = this;

		var date = new Date();
		var thisYear = date.getFullYear();
		var yearList = ""; //年

		for(var i =1946; i < parseInt(thisYear) + 1; i++){
			yearList +=  "<li value='"+i+"'>"+i+"</li>";
		}
		_this.yearUl.html(yearList);


		var monthList = "";
		for(var i = 1; i < 13; i++){
			if(i < 10){
				i = "0" + i;
			}
			monthList += "<li value='"+i+"'>"+i+"</li>";
		}
		_this.monthUl.html(monthList);
	},
	change : function(){
		var _this = this;

		//年
		this.year.on('click', function(event) {
			_this.yearUl.show();
			_this.monthUl.hide();
			_this.dayUl.hide();
		});
		this.yearUl.on('click', 'li', function(event) {
			var text = $(this).text();
			var Id = $(this).attr("value");

			_this.nowYear = parseInt(text);

			_this.year.find('input').attr({
				value: text,
				yearId: Id
			});
			_this.yearUl.hide();
		});

		//月
		this.month.on('click', function(event) {
			_this.monthUl.show();
			_this.yearUl.hide();
			_this.dayUl.hide();
		});
		this.monthUl.on('click', 'li', function(event) {
			var text = $(this).text();
			var Id = $(this).attr("value");

			_this.nowMonth = parseInt(text);

			_this.month.find('input').attr({
				value: text,
				monthId: Id
			});
			_this.monthUl.hide();

			//点击月份后，初始化 '日' 的值 
			_this.day.find('input').attr({
				value: '01'
			});
			//日
			var d = new Date(_this.nowYear, _this.nowMonth, 0);
			var daysCountt = d.getDate();
			_this.len = daysCountt;
			var dayList = "";
			for(var i = 1; i <= daysCountt; i++){
				if(i < 10){
					i = "0" + i;
				}
				dayList += "<li value='"+i+"'>"+i+"</li>";
			}
			_this.dayUl.html(dayList);
		});

		//日
		this.day.on('click', function(event) {
			if(_this.len == 0)return;
			_this.dayUl.show();
			_this.yearUl.hide();
			_this.monthUl.hide();
		});
		this.dayUl.on('click', 'li', function(event) {
			var text = $(this).text();
			var Id = $(this).attr("value");

			_this.day.find('input').attr({
				value: text,
				dayId: Id
			});
			_this.dayUl.hide();
		});
	},
	bodyEvent : function (){
		var _this = this;
		$('body').on('click',  function(e) {
			if(!_this.elements.is(event.target) && (_this.elements.has(event.target).length ===0)){
				_this.dayUl.hide();
				_this.yearUl.hide();
				_this.monthUl.hide();
			}
		});
	}
}

