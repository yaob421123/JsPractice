(function($){
	$.fn.Suspension = function(location){
		var _this = $(this);
		var windW,windH;
		windW = $(window).width();
		windH = $(window).height();
		
		var leftCenter = (windW - _this.width()) / 2 + 'px';
		var topCenetr = (windH - _this.height()) / 2 + 'px';

		return _this.each(function() {
			var loc;
			var $div = $('<div></div>'); //创建一个新div
			if(location == undefined || typeof location == "string"){
				switch(location){
					case "leftbottom": //左下
						loc = {left:'0px', 'bottom':'0px'};
						break;
					case "rightbottom"://右下
						loc = {right:'0px', 'bottom':'0px'};
						break;
					case "lefttop"://左上
						loc = {left:'0px', 'top':'0px'};
						break;
					case "righttop"://右上
						loc = {right:'0px', 'top':'0px'};
						break;
					case "righttop"://右上
						loc = {right:'0px', 'top':'0px'};
						break;
					case "middletop"://居中置顶
						loc = {left:leftCenter, 'top':'0px'};
						break;
					case "middlebottom"://居中置顶
						loc = {left:leftCenter + 'px', 'bottom':'0px'};
						break;
					case "middleleft"://左边居中
						loc = {left:'0px', 'top':topCenetr};
						break;
					case "middleright"://右边居中
						loc = {right:'0px', 'top':topCenetr};
						break;
					case "middle"://右边居中
						loc = {left:leftCenter, 'top':topCenetr};
						break;
					default:
						location = "middleright";
						loc = {right:'0px', 'top':topCenetr};
						break;
				}
			}else{
				//如果传的是object
				loc = location;
			}
			$('body').append($div);
			$div.css(loc).css({
				position: 'fixed',
				z_index: '9999'
			});
			_this.appendTo($div);
		});
	}
})(jQuery);