# 使用说明

用jquery 写的一个下拉插件


## html部分：
```bash
<div class="select_box">
	<div class="select_showbox">职位</div>
	<ul class="select_option">
		<li>前台</li>
		<li>前端</li>
		<li>后台</li>
		<li>c++</li>
	</ul>
</div>
```


## css部分：
...



## js部分：
导入`jquery`库和`select.js`
```bash
$(function(){
	//搜索区域的下拉框
	$(".select_box").select({
	    /*参数必带*/
	    "selectShowbox":"select_showbox",  /*显示区域class*/
	    "selectOption":"select_option",  /*下拉框区域*/
	    /*下参数可写可不写*/
	    "showboxClass":"active",  /*显示区域点击后class,默认active*/
	    "optionClass":"hover"  /*下拉列表鼠标移入class，,默认hover*/
	});
});
```



## API

- `selectShowbox`  显示区域class(非id)

- `selectOption` 下拉框区域class(非id)

- `showboxClass` 可选参数。显示区域点击后class

- `optionClass` 可选参数。下拉列表鼠标移入状态class

- `callback` 可选参数。返回当前选择的内容

