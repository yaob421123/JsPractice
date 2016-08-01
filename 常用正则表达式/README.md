# 常用正则表达式

## 手机号码验证

```bash
function isPhoneNo(phone) { 
    var pattern = /^1[34578]\d{9}$/; 
    return pattern.test(phone); 
}
```

## 数字验证

```bash
function isNum(num) { 
    var pattern = /^[0-9]*$/; 
    return pattern.test(num); 
}
```

## 数字及小数点验证

```bash
function isNumFloat(num) { 
    var pattern = /^[0-9.]*$/; 
    return pattern.test(num); 
}
```

## 中文验证

```bash
function isChina(str) { 
    var pattern = /[^u4E00-u9FA5]/g; 
    return pattern.test(str); 
}
```

## 身份证验证

```bash
function isSfz(num) { 
    var pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; 
    return pattern.test(num); 
}
```

## 邮箱验证

```bash
function isEmail(str) { 
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ; 
    return pattern.test(str); 
}
```

## 密码验证

```bash
function isPasswordNo(password) {
    var pattern = /\w$/;
    return pattern.test(password);
}
```










