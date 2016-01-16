"use strict";
/* global $, console*/

$( function () { hovertest.init(); });

var hovertest;

	(function ($) {
	   'use strict';

	   // t is the internal module identifier
	   var t = {

		hints: [],
	   
		init: function () {
				
			this.getNavigator();
			this.getWindowSize();
			this.addEventButtonEvents();
			this.addWindowEvents();
		
			$(".windowsize").on("click", function (e) {t.getWindowSize() });
			
			$(".log-hints").on("click", function() { 
			
				t.hints.forEach( function (hint) {
					
					// no log to avooid the br
					$(".logarea").prepend(hint);
					
				});
			});
		},
		

		log: function (msg,e) {
				
					$(".logarea").prepend(msg+"<br>");
					if (e) {console.log(e); }		

		},
		
		hint: function (hint, size) {
	
			if (!size) { size = "p";}
			console.log("hint:"+hint+" size:"+size);
			t.hints.unshift("<"+size+">"+hint+"</"+size+">");
		},
		
		addEventButtonEvents: function () {
			$(".events").on("click touchstart touchmove touchend touchcancel touchleave hover mouseenter mouseleave mouseover mouseout mousemove mousedown mouseup pointerenter pointerleave pointermove pointerout pointerover pointerup", function (e) {
				e.preventDefault();
				console.log(e);
				t.log(e.type,e);
			});
			
			
			t.hint("window resize & orientationchange & devicechange","h2");
			t.hint("window resize wird vom android chrome und iOS safari gefeuert, wenn der Inhalt gescrollt wird und Tabs und URL ausgeblendet werden.");
			t.hint("Der Android Firefox feuert beim scrollen kein resize.");
			t.hint("Der Win8 Kachel IE feuert kein orientationchange, aber beim richtungswechsel feuert er resize -> window resize -> resize -> window resize");
			t.hint("Win8 Firefox und win8 Chrome feueren auch kein orientationchange und nur 1x resize -> window resize");
			t.hint("Win10 Edge feuert auf surfcace3 feuert permanent deviceorientation events ab, auch wenn sich das Gerät ruhig auf dem Tisch steht. Orientationchange wird nicht gefeuert. Eine Drehung feuert resize -> window resize");
								 			 
			$(window).on("orientationchange resize", function (e) {
				console.log(e);
				t.log(e.type,e);
			});
			
			$(window).one("deviceorientation", function (e) {
				console.log(e);
				t.log(e.type,e);
			});
		},
		
		getNavigator: function() {
			
			t.log("NAVIGATOR");
			t.log("appCodeName:"+navigator.appCodeName);
			t.log("appName:"+navigator.appName);
			t.log("agent:"+navigator.agent);
			t.log("language:"+navigator.language);
			t.log("platform:"+navigator.platform);
			t.log("oscpu:"+navigator.oscpu);
			t.log("product:"+navigator.product);
			t.log("userAgent:"+navigator.userAgent);
			t.log(" ");
			
		},
		
		getWindowSize: function() {
			
			t.hint("WindowSize","h2");
			t.hint('Das gibt jQuery als Größe des Dokuments aus. Das ist die erscrollbare Fläche des Viewports.');
			t.hint('Beim Android Chrome ist das Fix, bei Windows werden die Viewportmaße nach dem Zoomen aktualisiert und damit auch die $(document).width und mit dem neu floatenden Text auch die Höhe.');
			t.hint('Manche Android Browser bieten bieten dem Nutzer Optionen wie "Auto Font Size". Das macht nichts anderes als die Viewportgröße nach dem Zoomen auf die gewünschte Textgröße.');
			t.hint('zu aktualisieren. Dort verändert sich $(document).width() auf Androiden.');
							
			t.log("$(document).width():"+$(document).width());
			t.log("$(document).height():"+$(document).height());
			
			t.hint('$(document).width() und $(document).height()',"h3");
			t.hint('Dieser Wert ändert sich beim zoomen in Android. Wenn man auf die doppelte Größe zoomt, bleibt die Screen.width gleich, aber die Window.width beträgt die Hälfte der Screen.width . ');
			t.hint('In Windows ändert sich beim Zoomen auch die Screen.width und die screen.availWidth');
			
			
			t.hint('window.innerWidth und window.innerHeight',"h3");
			t.hint('window.innerWidth und .innerHeight sind die innere Größe des Browserfensters. Bei iOS Safari und Android Chrome ändert sich das mit einem ');
			t.hint('resize event beim scrollen, wenn die Tabs ausgeblendet/verkleinert werden. ');
						
			t.log("window.innerWidth:"+window.innerWidth);
			
			t.hint("screen.width","h3");
			t.hint("meist entspricht das der screen.availWidth. Außer wenn der Firefox Dev Tools die innere Fenstergröße verkleinert");
			t.hint("Dann ist die Screen.width die Breite des virtuellen Fensters");
			
			t.log("screen.width:"+screen.width);
			
			// die Bildschirmgröße, in Windows die Monitorauflösung, im Android Chrome und Android Firefox die 
			// geräteunabhängige Bildschirmgröße, in Android UC die geräteabhängige Bildschirmgröße
			t.log("screen.availWidth:"+screen.availWidth);
			
			// Das sollte die Breite des Documents sein, Im Android FF unterscheidet sich im Querformat die Breite aber von der Fensterbreite, obwohl keine Android Toolbars im Weg sind
			// Im Hochformat stimmen beide Werte überein.
			// Im Android Chrome stimmen beide Werte überein
			t.log("document.body.clientWidth:"+document.body.clientWidth);
			
			// In IE9 und älter ist dieser Wert 16px größer als document.body.clientWidth, wohl wegen der Breite der Scrollleiste
			// In neueren IEs sind die Werte gleich.
			t.log("document.documentElement.clientWidth:"+document.documentElement.clientWidth);
			
			
			t.log("window.innerHeight:"+window.innerHeight);
			t.log("screen.height:"+screen.height);
			t.log("screen.availHeight:"+screen.availHeight);
			t.log("document.documentElement.clientHeight:"+document.documentElement.clientHeight);
			t.log("document.body.clientHeight:"+document.body.clientHeight);
			t.log(" ");
			
	
		},
		
		addWindowEvents: function (){
		
			// Windows7 Browser senden nur das resize, selbst wenn ich mit dem Grafiktreiber den Bildschirm drehe
			// Die iOS Safari sendet ein window.resize -> window.orientationchange und zoomt dann und verschiebt den Screen in merkwürdige Regionen
			// Android Chrome verhält sich hier wie der iOS Safari, außer dass das zoomen und verschieben dezenter wirkt
			// Android Firefox sendet nur das window.resize
			// Android UC sendet window.resize -> window.orientationchange -> screen.orientationchange
			$(window).on("orientationchange", function (e) {t.log("window orientationchange",e);});
			$(screen).on("orientationchange", function (e) {t.log("screen orientationchange",e);});
			$(window).on("resize", function (e) {t.log("window resize",e);});
		}
	};

   hovertest = t;
 

}(jQuery));

