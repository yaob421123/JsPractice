# 使用说明

用jquery 封装的一个倒计时插件。



## js :

导入 `jquery`


## countdown.js
导入 countdown.js

```bash
<div class="count">点击我倒计时<i></i></div>
```

```bash
$(function(){
	$('.count').CountDown(num, callback);
})
```

- `num` 可选。倒计时时间(秒),默认120秒。

- `callback`  可选。事件执行后要执行的函数。




## countdown2.js

导入 countdown2.js

```bash

<input type="text" data-count-mail>
<div class="account_code_2">点击我倒计时<i></i></div>
```

```bash
$(function(){
	$('.account_code_2').CountDown({
		type:'mail',
		data:'data-count-mail',
		dataErr:'.modify_err_3',
		num:5,
		validateback:function(info, content){
		    //info   当前手机号码 或者邮箱 
		    //验证手机是否存在的回调函数，数组 [true/false, 错误提示]
		    console.log(info);
		    state = true;
		    err = '邮箱不正确!!!!!!!!';
		    content = [state, err];
		    return content;
		},
		callback:function(){
		    //发送验证码逻辑
		}
	});
})
```


- `type` 可选。插件类型，默认 phone， 可选mail。

- `data` 可选。input框类型，默认 data-count-down。

- `dataErr` 错误提示 class或者id。

- `num` 可选。倒计时时间(秒),默认120秒。

- `validateback`  可选。验证手机或者邮箱是否正确的回到函数。

- `callback`  可选。事件执行后要执行的函数。
