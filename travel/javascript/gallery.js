var URLs = [
				'images/news/dol-priv.jpg',
				'images/news/likiiskaya_tropa.jpg',
				'images/news/peshernie-goroda.jpg',
				'images/news/svanetia1.jpeg',
				'images/news/voshojdenie_na_kazbek.jpg',
				'images/news/anapurni.jpg'
			]; 
var currentImage = 0, countDivImg = 0, s = 0;


function Show(dirrection){
	var countImg = URLs.length;
	var slider = document.getElementById('slider');
	var div = document.getElementById("img-slide");
	var img = div.getElementsByTagName("img");
	var countDivImg = document.getElementById('img-slide').getElementsByTagName('img').length-1;
	var i = 0, s = 0, k = 0;

	currentImage+=dirrection; 

	if(currentImage<(-countImg+1) || currentImage>(countImg-1))
	{
		currentImage=0;
	}

	//ƒл¤ правой кнопки
	if(dirrection>0)
	{
		if(currentImage==0){
			slider.style = "background-image: url("+(URLs[0])+")";
		}
		slider.style = "background-image: url("+(URLs[currentImage])+")";
		for (i=0; i<=countDivImg; i++){
			s=currentImage-i;
			if(s<0){
				k=URLs.length;
				img[i].setAttribute('src', URLs[k+currentImage-i]);
			}else{
				img[i].setAttribute('src', URLs[s]);	
				//console.log(img[s],URLs[s], s)
				//console.log(s, URLs[s],i)
			}
			//console.log('k+currentImage-i = ' + (k+currentImage-i), ',      s = ' + s)
		}	
			//console.log(' ')
	}

	//ƒл¤ левой
	if(dirrection<0)
	{ 
		if(currentImage==0){
			slider.style = "background-image: url("+(URLs[0])+");";
		}
		if(currentImage<0){
			currentImage=countImg-1;
		}
		slider.style = "background-image: url("+(URLs[currentImage])+"); ";
		for (i=0; i<=countDivImg; i++){
			s=currentImage-i;
			if(s<0){
				k=URLs.length;
				img[i].setAttribute('src', URLs[k+currentImage-i]);
			}else{
				img[i].setAttribute('src', URLs[s]);	
				//console.log(img[s],URLs[s], s)
				//console.log(s, URLs[s],i)
			}
			//console.log('k+currentImage-i = ' + (k+currentImage-i), ',      s = ' + s)
		}	
			//console.log(' ')
	}
}