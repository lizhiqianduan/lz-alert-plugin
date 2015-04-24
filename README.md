# lz-alert-plugin
# author : xiaohei
it's a plugin based on jquery or zepto that can replace alertBox.

弹出窗插件:

使用方法：
1、在head头部引入jQuery.js或者zepto.js
```js
<script type="text/javascript" src="./jquery-1.8.2.js"></script>
<script type="text/javascript" src="lz.js"></script>
```
2、再在head头部引入默认的样式lz.ui.css
```css
<link rel="stylesheet" href="lz.ui.css" />
```
3、直接调用
```js 
$.lz.Alert('i am a test');

```
这个插件对传入的参数个数进行了判断，具体的参数传递请参考源码。

另：
	欢迎访问我的个人网站：http://www.lizhiqianduan.com 
	更多资源，敬请关注
