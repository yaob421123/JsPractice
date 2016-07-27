# 使用说明

用jquery 封装的一个倒计时插件。

## 使用方法 :

```bash
<div class="count">点击我倒计时<i></i></div>
```

## js :

导入 `jquery` 和 `countdown.js`

```bash
$(function(){
	$('.count').CountDown(num, callback);
})
```

## 参数说明1

- `num` 可选。倒计时时间(秒),默认120秒。

- `callback`  可选。事件执行后要执行的函数。


## 参数说明2

导入 countdown2.js

- `data` 可选。input框类型，默认 data-count-down。

- `num` 可选。倒计时时间(秒),默认120秒。

- `callback`  可选。事件执行后要执行的函数。
