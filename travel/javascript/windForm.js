function btnOrder(){
	var inputName = document.getElementsByName('fname')[0];
	var inputLastName = document.getElementsByName('lname')[0];
	var inputMail = document.getElementsByName('mail')[0];
	
	// Валидация E-MAIL
	var lang = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i; // i - независим от регистра.
    var dog = inputMail.value.indexOf("@");
    var dot = inputMail.value.lastIndexOf(".");
    var name = /^[а-я]{1,16}$/i;

    if(!name.test(inputName.value) || !name.test(inputLastName.value) || !lang.test(inputMail.value)){
    	if(!name.test(inputName.value)){
    		alert('В поле "Имя", нужно вводить текст кириллицей');
    	}else if(!name.test(inputLastName.value)){
    		alert('В поле "Фамилия", нужно вводить текст кириллицей');
    	}else if(!lang.test(inputMail.value)){
    		alert('Введите корректный E-Mail');
    	}
    }else{
    	alert(inputName.value + ', Ваша заявка отправлена. Ожидайте ответа на электронной почте');
    }
    
	// Валидация окончена	
}
     
//}

function formShow() {
	document.getElementById('f-order').style.display = 'block';
}



