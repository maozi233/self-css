(function(win,count,maxWidth){
	return new function(){
		var SetSize = win.SetSize = this,
			docHtml = document.documentElement,
			count = count || 7.5,
			maxWidth = maxWidth || 750,
			screenRatio,
			width,
			scale;
			
		this.fontSize = 0;
		
		var setup = function(){
			var isApp = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
			screenRatio = 1;
//			screenRatio = typeof win.screenRatio === 'undefined' ? (isApp? screenRatio >= 3 ? 3: screenRatio >= 2 ? 2: 1: 1): win.screenRatio;
			scale = 1/screenRatio;
			createMeta();
		}
		var createMeta = function(){
			document.write('<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale +', minimum-scale=' + scale + ', width=device-width, user-scalable=no" />');
			document.write('<style>body,input,textarea{font-size:'+10*screenRatio+'px;}</style>');
			maxWidth = screenRatio*maxWidth;
			readSize();
			bindEvents();
			setTimeout(readSize,200);
		}
		var readSize = function(){
			width = win.innerWidth || document.documentElement.clientWidth;
			if(!width && !!document.body){
				width = document.body.clientWidth;
			}else if(!width){
				return false;
			}
			width = Math.min(width,maxWidth);
			SetSize.fontSize = width/count;
			docHtml.style.fontSize = SetSize.fontSize+'px';
		}
		var bindEvents = function(){
			win.addEventListener('resize',function(){
				readSize();
			},false);
		}
		
		this.getFontSize = function(){
			return SetSize.fontSize;
		}
		
		this.getScreenRatio = function(){
			return screenRatio;
		}
		
		this.getEmSize = function(px){
			return Math.floor(px/SetSize.fontSize * 100)/100;
		}
		
		setup();
	}
})(window,6.5,650);