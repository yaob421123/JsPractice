!(function($){
	$.fn.calendar = function(options){
		return this.each(function() {
            var _this = $(this);
            //单例模式
            var date = _this.data('myDate');
            if(!date){
                date = new myDate(_this, options);
                _this.data('myDate', date);
            }
        });
	}
	var myDate = function(elments,options){
        var obj = {
			width : 320,
			height : 330,
			weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			prevMonth : '&#60',
			nextMonth : '&#62',
			callback: function(){}
		};
		this.elments = elments;
		this.options = $.extend(true, obj, options || {});
		var nowDate = new Date();
		this.year = nowDate.getFullYear();
		this.month = nowDate.getMonth() + 1;
		this.getDateday = nowDate.getDate(); //获取当前日期
		this.callback = obj.callback;

		this.dateHtml = 
			'<div class="date-title">' +
				'<a class="prevMonth" href="javascript:;">'+ this.options.prevMonth +'</a>' +
				'<span><i class="year">'+ this.year +'</i>年<i class="month">'+ this.month +'</i>月</span>' +
				'<a class="nextMonth" href="javascript:;">'+ this.options.nextMonth +'</a>' +
			'</div>' +
			'<div class="date-week">' +
				'<ul>' +
				'</ul>' +
			'</div>' +
			'<div class="date-Main">'+
			'</div>';

		this.init();
    }
    myDate.prototype = {
    	init : function(){
    		this.layerout();
    		this.week();
    		this.dateMain(this.year, this.month);
			this.change();
    	},
    	layerout : function(){
    		this.elments.css({
    			width: this.options.width,
    			height: this.options.height
    		});
			this.elments.append(this.dateHtml);
			this.prevMonth();
			this.nextMonth();

    	},
    	week : function(){
    		var weekLi = ""
    		for(var i = 0; i < this.options.weekDays.length; i++){
    			weekLi += '<li>'+ this.options.weekDays[i] +'</li>'
    		}
    		this.elments.find('.date-week ul').append(weekLi);
    	},
    	prevMonth : function(){
    		//上一月
    		var _this = this;
    		this.elments.find('.prevMonth').on('click',  function() {
                var prevYear = parseInt(_this.elments.find('.year').html()) - 1;
    			var nowMonth = parseInt(_this.elments.find('.month').html()) - 1;
                if(nowMonth == 0){
                    _this.elments.find('.year').html(prevYear)
                    _this.elments.find('.month').html(12);
                }else{
                    _this.elments.find('.month').html(nowMonth);
                }
                var nowYear = parseInt(_this.elments.find('.year').html());
                _this.elments.find('.date-Main ul').remove();
                _this.dateMain(nowYear, nowMonth)
    		});
    	},
    	nextMonth : function(){
    		//下一月
    		var _this = this;
    		this.elments.find('.nextMonth').on('click',  function() {
    			var prevYear = parseInt(_this.elments.find('.year').html()) + 1;
                var nowMonth = parseInt(_this.elments.find('.month').html()) + 1;
                if(nowMonth == 13){
                    _this.elments.find('.year').html(prevYear)
                    _this.elments.find('.month').html(1);
                }else{
                    _this.elments.find('.month').html(nowMonth);
                }
                var nowYear = parseInt(_this.elments.find('.year').html());
                _this.elments.find('.date-Main ul').remove();
                _this.dateMain(nowYear, nowMonth)
    		});
    	},
    	dateMain : function(year, month){
            //核心逻辑，日历布局
    		var thisDay = this.getNowDay(year, month-1); //获取当月1号是星期几
    		var thisDate = this.getNowDate(year, month); //获取当月有多少天

    		var prevMonth = this.getNowDate(year, month-1); //获取上月有多少天
            var prevDay = this.getNowDay(year, month-1); //获取上月1号是星期几


    		var dateLi = "";
    		var prevArr = [],
    			nextArr = [],
                prev = null;

            for(var i = 1; i <= prevMonth; i++){
                prevArr.push(i); 
            }
            if(thisDay == 0){
                prev = prevArr.slice(-7);
            }else{
    		    prev = prevArr.slice(-thisDay);
            }

            var num = 42 - thisDate - prev.length;
            for(var i = 1; i <= num; i++){
                nextArr.push(i);
            }
    		
            for(var i = 0; i < prev.length; i++){
                dateLi += '<li class="next-day"><a href="javascript:;">' +prev[i]+ '</a></li>';
            }
            for(var i =1; i <= thisDate; i++){
                if(i == this.getDateday && this.year == year && this.month == month){
                    dateLi += '<li class="active" aid="'+ year+getNum(month) + getNum(i) +'"><a href="javascript:;">' +i+ '</a></li>';
                }else{
                    dateLi += '<li class="nowDate" aid="'+ year+getNum(month) + getNum(i) +'"><a href="javascript:;">' +i+ '</a></li>';
                }
                
            }
            for(var i = 1; i <= nextArr.length; i++){
                dateLi += '<li class="next-day"><a href="javascript:;">' +i+ '</a></li>';
            }
            $(".date-Main").append('<ul>'+dateLi+'</ul>');
    	},
		change:function(){
			var _this = this;
			this.elments.on("click",".nowDate", function(){
				var str = $(this).attr('aid');
				var nowYear = str.substring(0,4),
					nowMonth = str.substring(4,6),
					nowDay = str.substring(6,8) ;
				var arr = [nowYear,nowMonth,nowDay];
				_this.callback([nowYear,nowMonth,nowDay])
			});
		},
    	getNowDate : function(year, month){
    		//获取第N个月有多少天
    		var d = new Date(year, month, 0);
			var daysCountt = d.getDate();
			return daysCountt;
    	},
    	getNowDay : function(year, month){
    		//获取第N个月1号星期几
    		var d = new Date(year, month, 1);
			var daysCountt = d.getDay();
			return daysCountt;
    	}

    }
    function getNum(num){
    	if(num < 10){
    		num = "0" + num;
    	}
    	return num;
    }
})(jQuery)