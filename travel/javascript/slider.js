var URLs = ['images/news/dol-priv.jpg','images/news/likiiskaya_tropa.jpg', 'images/news/peshernie-goroda.jpg','images/news/svanetia1.jpeg','images/news/voshojdenie_na_kazbek.jpg', 'images/news/anapurni.jpg']; 
var currentImage=0; 

function SlideShow(){ 
	if (currentImage>=URLs.length){ 
		currentImage=0; 
	} 

	document.getElementById('slider').style.backgroundImage = 'url(' +URLs[currentImage] + ')';
	document.getElementById('slider').style.transition = '2s';
	currentImage++; 
} 

setInterval('SlideShow()',4500); 