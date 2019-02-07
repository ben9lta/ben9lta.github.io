function startDateTime(){
	curDate();
	Time();
}

function Time(){
	var t_hours, t_min, t_sec, t_time, obj_time;
	obj_time = document.getElementById("theTime");
	time = new Date();
	t_hours = time.getHours();
	t_min = time.getMinutes();
	t_sec = time.getSeconds();
	if (t_hours < 10){
		t_hours = "0" + t_hours;
	}
	if (t_min < 10){
		t_min = "0" + t_min;
	}
	if (t_sec < 10){
		t_sec = "0" + t_sec;
	}
	t_time = "&nbsp&nbsp&nbsp&nbsp&nbsp" + t_hours + ":" + t_min + '<b id="sec_points">:</b>' + t_sec + "&nbsp&nbsp&nbsp&nbsp&nbsp";
	obj_time.innerHTML = t_time;
}

setInterval('Time()',1000);

function curDate(){
	date = new Date();
	obj_date = document.getElementById("theDate");
	date_month = new Array ("Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря");
	date_day = new Array ("Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота");
	dayOfWeek = date.getDay(); //День недели
	dayOfMonth = date.getDate(); // Число месяца
	d_month = date.getMonth(); // Месяц
	d_year = date.getFullYear(); //Год

	var d_date;
	d_date = date_day[dayOfWeek] + ", " + dayOfMonth + " " + date_month[d_month] + " " + d_year;
	obj_date.innerHTML = d_date;
}
