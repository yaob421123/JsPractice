# 使用说明

用jquery 写的一个简单功能的日历插件 demo

这是个最基本功能的日历。

## html 部分:

```bash
<div class="date"></div>
```

## css:
```bash
a{ text-decoration:none; }
ul,ol,li{ list-style-type:none; }
em,i{ font-style:normal; }
.date{ border:1px solid #ccc;  margin:50px auto;}

.date-title{ height:40px; line-height:40px; background-color:#31c0e0; position:relative; text-align:center;}
.date-title a{color:#fff;position:absolute; display:inline-block; padding:0 20px;}
.prevMonth{  left:20px; }
.nextMonth{ right:20px; }
.date-title span{ color:#fff; }
.date-title .year{}
.date-week{ margin:0 10px;}
.date-week ul{ height:40px; clear:both; }
.date-week ul li{ width:14.28%; height:40px; line-height:40px; float:left; text-align:center; }
.date-Main{margin:0 10px;}
.date-Main ul li{width:14.28%; height:40px; line-height:40px; float:left; text-align:center;}
.date-Main ul li a{ color:#3a3937; display:block; width:30px; height:30px; line-height:30px; margin-top:5px; margin-left:5px;}
.date-Main ul li.active a{ background-color:#83d318; color:#fff; border-radius:100%;}
.date-Main ul li.active a:hover{background: #83d318;;}
.date-Main ul li a:hover{ background-color:#ccc; border-radius:100%;}
.date-Main .next-day a{ color:#ccc; }
.date-Main .next-day a:hover{ background: none; }
```

## js 部分：

导入`jquery`库和`calendar.js`

```bash
<script type="text/javascript" src="jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="calendar.js"></script>
$(function(){
	$(".date").calendar({
		//可选参数
		weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],  //week显示方式
		prevMonth : '&#60', //左箭头
		nextMonth : '&#62' //右箭头
	});
})
```

## API

-`weekDays` 可选。星期。默认`['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

-`prevMonth` 可选。上一月。默认 `'&#60'`

-`nextMonth` 可选。下一月。默认 `'&#62'`

-`callback` 可选。回调函数。返回点击当前日期的，年月日。


## 效果图：

![calendar](https://github.com/yaob421123/JsPractice/blob/master/calendar/calendar.gif)



