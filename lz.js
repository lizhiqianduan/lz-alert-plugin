/*
Author : xiaohei 
Publish time : 2014年11月21日13:06:34
File code : utf8 without bom
*/

(function($) {

	// define some globle variables
	// can't be used in window,but can be used in my plugin anywhere
	var winH = $(window).height();
	var winW = $(window).width();


	// define some globle function 
	// can't be used in window,but can be used in my plugin anywhere
	function isString(str) {
		if (typeof(str) === "string")
			return true;
		else
			return false;
	}

	function isNum(str) {
		if (typeof(str) === "number")
			return true;
		else
			return false;
	}

	function isObj(str) {
		if (typeof(str) === "object")
			return true;
		else
			return false;
	}

	function isFn(str) {
		if (typeof(str) == "function")
			return true;
		else
			return false;
	}

	//合并两个对象
	function extend(obj1, obj2) {
		var newobj = {};
		for (var i in obj1) {
			newobj[i] = obj1[i];
			if (obj2 && obj2[i] != null) {
				newobj[i] = obj2[i];
			}
		}
		return newobj;
	}

	//myPluginName:lz
	// not use $.lz beacause of the sb ie7
	$['lz'] = {
		//@param userSetting: Object set by user.If undefined,param defaults will be used
		Alert: function(content, title, userSetting) {
			var defaults = {
				//@param type : "messageBox" "textInput",  default "messageBox"
				"type": "messageBox",
				"title": "lz弹出层",
				"content": "lz示例",
				"noMask": false,
				//@param "effect" : "none" "slideDown" "slideUp" "fadeIn" "slideLeft" "slideRight" can be used,"none" is default
				"effect": "none",
				"sure": function() {},
				"cancelCallback": function() {},
				"closeCallback": function() {}
			};
			var userSetting = isObj(userSetting) ? userSetting : {};
			var settings = $.extend( defaults, userSetting);
			var $body = $("body");
			

			//规定传参方式
			switch (arguments.length) {
				case 0:
					settings.content = '';
					break;
				case 1:
					if (isString(arguments[0]) || isNum(arguments[0])) {
						settings.content = arguments[0];
					} else if (isObj(arguments[0])) {
						settings = $.extend( settings, arguments[0]);
						settings.content = settings.content ? settings.content : "";
					} else
						settings.content = '参数格式不正确!';
					break;
				case 2:
					if ((isString(arguments[0]) || isNum(arguments[0])) && (isNum(arguments[1]) || isString(arguments[1]))) {
						settings.content = arguments[0];
						settings.title = arguments[1];
					} else {
						settings.content = '参数格式不正确!';
					}
					break;
				case 3:
					if ((isString(arguments[0]) || isNum(arguments[0])) && (isNum(arguments[1]) || isString(arguments[1])) && isObj(arguments[2])) {
						settings.content = arguments[0];
						settings.title = arguments[1];
						settings = $.extend( settings, arguments[2]);
						if (!(arguments[2].sure && isFn(arguments[2].sure) && arguments[2].cancelCallback && isFn(arguments[2].cancelCallback) && arguments[2].closeCallback && isFn(arguments[2].closeCallback))) {
							settings.content = '参数格式不正确!';
						}
					} else {
						settings.content = '参数格式不正确!';
					}
					break;
			}

			//增加dom
			addLayer();
			//自动居中
			this.autoMiddle(window, "#lz-alert");
			var $alert = $("#lz-alert");
			var $layer = $("#lz-layer");
			//显示效果
			showEffect(settings.effect);
			//绑定按钮事件
			bindEve();

			//进入效果渲染
			function showEffect(effect) {
				var alertW = $alert.width();
				var alertH = $alert.height();
				switch (effect) {
					case "fadeIn":
						$alert.fadeIn();
						break;
					case "slideDown":
						$alert.slideDown();
						break;
					case "slideLeft":
						$alert.css({"margin-left":"0","margin-right":"0",opacity:0}).show().animate({marginLeft:(winW - alertW)/2,opacity:1},300);
						break;
					case "slideUp":
						$alert.css({"margin-top":winH,opacity:0}).show().animate({marginTop:(winH - alertH)/2,opacity:1},300);
						break;
					case "slideRight":
						$alert.css({"margin-left":winW,"margin-right":"0",opacity:0}).show().animate({marginLeft:(winW - alertW)/2,opacity:1},300);
						break;
					case "bigger":
						$alert.show().addClass("bigger");
						break;
					default:
						$alert.show();
						break;
				}

			}
			//弹出弹窗

			function addLayer() {
				//按钮
				var sureBtn = '<span class="lz-sure">确定</span>';
				var cancelBtn = '<span class="lz-cancel">取消</span>' + '</div>';
				var btns;
				//遮罩
				if (!settings.noMask) {
					var dom1 = settings.noMask ? '' : '<div id="lz-layer"></div>';
					$body.append(dom1);
				}


				//按钮组
				switch (settings.type) {
					case "messageBox":
						btns = sureBtn;
						break;
					case "textInput":
						settings.content = '<textArea class="lz-text" ></textArea>';
						btns = sureBtn + cancelBtn;
						break;
					default:
						btns = sureBtn;
						break;

				}
				//框体
				var dom2 = '<div id="lz-alert" style="display:none;">' + '<h2 class="lz-alert-title">' + settings.title + '<span class="lz-close" style="float:right;cursor:pointer;">关闭</span>' + '</h2>' + '<div class="lz-alert-con">' + settings.content + '</div>' + '<div class="lz-btns">' + btns + '</div>';
				$("#lz-layer").css({
					"background-color": "#ccc",
					"opacity": "0.5",
					"position": "fixed",
					"left": "0",
					"top": "0",
					"width": 2 * $(window).width(),
					"height": 2 * $(window).height()
				});
				$body.append(dom2);

			}

			//清除弹窗

			function layerRemove() {
				$layer.remove();
				$alert.remove();
			}

			function bindEve() {
				$(document).on("click", function(e) {
					var tar = e.target;
				});
				$alert.on("click", ".lz-sure", function() {
					if (isFn(settings.sure))
						settings.sure();
					layerRemove();
				});
				$alert.on("click", ".lz-cancel", function() {
					if (isFn(settings.cancelCallback))
						settings.cancelCallback();
					layerRemove();
				});
				$("#lz-alert").on("click", ".lz-close", function() {
					if (isFn(settings.closeCallback))
						settings.closeCallback();
					layerRemove();
				});
			}

		},
		autoMiddle: function(faSelecter, sonSelecter) {
			//fixed 模式全屏居中
			if (faSelecter === window) {
				var sonH = $(sonSelecter).height();
				var sonW = $(sonSelecter).width();
				$(sonSelecter).css({
					left:0,
					top:0,
					"margin-top": (winH - sonH) / 2,
					"margin-left": (winW - sonW) / 2
				});
				return false;
			}
			//relative 模式高度居中(父级为jq对象集)
			$(faSelecter).each(function() {
				var thisH = $(this).height();
				var sonH = $(this).find(sonSelecter).height();
				$(this).find(sonSelecter).css("margin-top", (thisH - sonH) / 2);
			});
		}
	}

})($)