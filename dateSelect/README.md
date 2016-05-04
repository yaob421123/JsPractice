# 使用说明

用jquery 写的一个日历下拉插件

## html部分：
```bash
<div id="myDate">
	<div>
		<div id="year">
			<input type="text" placeholder="2016" readonly="readonly">
		</div>
		<ul>
		</ul>
	</div>
	<div>
		<div id="month">
			<input type="text" placeholder="01" readonly="readonly">
		</div>
		<ul>
		</ul>
	</div>
	<div>
		<div id="day">
			<input type="text" placeholder="01" readonly="readonly">
		</div>
		<ul>
		</ul>
	</div>
</div>
```


## css部分：
...



## js部分：
导入`jquery`库和`select.js`
```bash
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/dateSelect.js"></script>
$(function(){
	$("#myDate").dateSelect();
})
```


## 可选参数：
```bash
$(function(){
	$("#myDate").dateSelect({
		year : '#year', //年月日默认id，可自定义
		month : '#month', 
		day : '#day'
	});
})
```