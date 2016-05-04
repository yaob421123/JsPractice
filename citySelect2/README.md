# 使用说明

加载城市数据js写的一个城市联动插件


## html部分：
```bash
<div id="city-select1">
	<div>
		<divid="province">
			<input type="text" placeholder="请选择省份" readonly="readonly">
		</div>
		<ul>
		</ul>
	</div>
	<div>
		<div id="proper">
			<input type="text" placeholder="请选择市/区" readonly="readonly">
		</div>
		<ul>
		</ul>
	</div>
</div>
```


css部分：
...



## js部分：
导入`jquery`库和`select.js`
```bash
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/city.min.js"></script>
<script type="text/javascript" src="js/citySelect.js"></script>

$(function(){
	$("#city-select1").CityScroll({
		cityProvince : "#province", //省份
		cityProper : "#proper" //市区
	});
});
```

