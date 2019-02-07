function toUP() { 
	window.onscroll = function() { 
		var scrolled = window.pageYOffset;   //pageYOffset ( значение прокрутки в пикселях	)
		var toUpDisplay = document.getElementById("toUp"); 
	//console.log(scrolled,window.pageYOffset);
	//console.log(document.documentElement.scrollTop) // не во всех браузерах


		if (scrolled>350){ 
			toUpDisplay.style="visibility:visible; background: #000; transition-duration: 0.6s;"; 
			document.getElementById("colorToUp").style="color: #fff";
			toUpDisplay.onclick = function (){
				window.scrollTo(0,0);
			}
		}
		else
		{ 
			toUpDisplay.style="visibility:hidden"; 
		} 

	} 
} 
toUP();