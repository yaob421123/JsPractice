# 使用说明

用jquery 写的一个城市联动插件

因js使用到`ajax` 有作用域，所以需要在服务器环境运行或者在`Firefox`上运行

## html部分：
```bash
<div class="city_select">
	<div class="select_prov">
		<span class="select_list_input">
			<span>请选择省份</span>
		</span>
		<ul></ul>
	</div>

	<div class="select_city city_input">
		<span class="select_list_input ">
			<span>请选择城市</span>
		</span> 
		<ul disabled="disabled"></ul>
	</div>
</div>
```


## css部分：
...



## js部分：
导入`jquery`库和`select.js`
```bash
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/select2.js"></script>
$(function(){
	$(".city_select").cityselect();
});
```


## 可选参数：
```bash
$(".city_select").cityselect({
	selectProv:".select_prov",  //左侧省份菜单下拉框
	selectProvInput:".select_list_input",  //左侧省份列表
	selectCity:".select_city",  //右侧市级菜单下拉框
	selectCityInput:".select_list_input",  //右侧市级列表
	url:"js/city.min.js"  //省、市json文件
});
```