# 使用说明

用jquery 写的一个简单功能的日历插件 demo

这是个最基本功能的日历。

## html 部分:

```bash
<div class="date"></div>
```

## css:
...

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
