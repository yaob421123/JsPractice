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

## 参数说明

- `num` 可选。倒计时时间(秒)

- `callback`  可选。事件执行后要执行的函数。

