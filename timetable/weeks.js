document.addEventListener('DOMContentLoaded', week);
function week() {
    var oddTable = document.getElementById('odd-table');//Нечетная
    var evenTable = document.getElementById('even-table');//Четная

    //=================================================================================================//
    //Функция добавления пробелов
    function tdNbsp(table) {
        for (var i = 0; i < table.getElementsByTagName('td').length; i++) {
            if (table.getElementsByTagName('td')[i].innerText === '') {
                table.getElementsByTagName('td')[i].innerHTML = '&nbsp;'
            }

        }
    }

    tdNbsp(oddTable);
    tdNbsp(evenTable);

    var day_of_week = new Date().getDay();//День недели
    //if (day_of_week > 5) day_of_week = 1;//Если суббота - то день недели будет ПН

    var time = new Date();//Текущее время
    var min = new Date(), max = new Date();//Начало пары, конец пары
    var minMax;//Строка начала и конца пары

    var lastClass = new Date();//"Последняя" пара
    var firstClass = new Date();//"Первая" пара
    lastClass.setHours(20, 15, 0);//Время окончания последней пары
    firstClass.setHours(13, 30, 0);//Время начала первой пары

    var year = new Date().getFullYear(); //Год
    var month = new Date().getMonth();  //Месяц
    var today = new Date(year, month, 0).getTime();// Год месяц 0 (-1 день от текущего месяца) в миллисекундах
    var now = new Date().getTime(); //Сегодняшние год месяц день в миллисекундах
    var week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7)); //(Сегодняшняя дата - начальная неделя) / неделю в миллисекундах = номер недели (чет/нечет)
    if (week % 2) {
        //even - четная неделя
        document.getElementsByTagName('main')[0].style = "flex-direction: column-reverse;";//Если четная, то нечетную меняем местами с четной
        checkTime(evenTable);
    }
    else {
        //odd - нечетная неделя
        document.getElementsByTagName('main')[0].style = "flex-direction: column;";//Если нечетная, то меняем местами с четной
        checkTime(oddTable);

    }
    //=================================================================================================//
    //Проверка времени
    function checkTime(table) {
        var endClass = new Date();//последнияя пара
        var startClass = new Date();//первая пара
        endClass.setHours(20, 0, 0);//Время окончания последней пары
        startClass.setHours(13, 20, 0);//Время начала первой пары
        // console.log(day_of_week);
        //Если день недели = пятница, после учебы, суббота или воскресенье, то идем на следующую неделю
        //Если будние дни, то получаем список времени пар
        if (weekend(table)) {
            //Поулчаем список времени пар
            var arrayMinMax = timeClass(table)[0];//Начало пары, конец, текущее время, строка времени.
            var thisDay = timeClass(table)[1];//объект, строка tr в таблицы таблицы (пара)
            //Проходимся по всем парам (4)
            var s = countClass(table);
            // console.log(s);
            for (var i = s; i < arrayMinMax.length; i++) {
                if (!searchClass(table)) {
                    var next = searchWeekClass(table)[1];
                    wClass(table, next);
                    //changeWeek(table);
                    //Если текущее время > начала пары и < конца пары, т.е. идет пара
                    //Пример: 13:51 > 13:20 && 13:51 < 14:50
                } else if (searchClass(table)) {
                    //  console.log(arrayMinMax[i][2]);
                    //  console.log(arrayMinMax[i-1][1])
                    //  console.log(arrayMinMax[i-1][0])
                    if (arrayMinMax[i][2] > arrayMinMax[i-1][0] && arrayMinMax[i][2] < arrayMinMax[i-1][1]) {
                        //Красим зеленым
                        //console.log('Идет урок');
                        gClass(table, thisDay[i-1]);
                        //break;
                    }
                    else if (arrayMinMax[i][2] < arrayMinMax[i][0] && arrayMinMax[i][2] > arrayMinMax[(i-1)][0]) {
                        //console.log('lalala');
                        wClass(table, thisDay[i]);
                    }
                    //Если текущее время > начала пары и > конца пары, т.е. перемена
                    //Пример: 14:51 > 13:20 && 14:51 > 14:50
                    else if (arrayMinMax[i][2] > arrayMinMax[i][0] && arrayMinMax[i][2] > arrayMinMax[i][1] && arrayMinMax[i][2] < endClass) {
                        //проверяем, есть ли следующая пара
                        // console.log('Перемена');
                        //console.log(thisDay[i])
                        wClass(table, thisDay[i]);
                        //Если пара нашлась, прекращаем проходить по циклу.
                        break;
                        //continue;
                    }
                    //Если пары закончились или не начались. 
                    //Пример: 20:00 > 19:51 || 12:00 < 13:20
                    else if (arrayMinMax[i][2] > endClass || arrayMinMax[i][2] < startClass) {
                        //Если пары еще не начались
                        if (arrayMinMax[i][2] < startClass) {
                            //То проверяем, есть ли пары в этот день
                            //console.log('Пар еще небыло');
                        }
                        //Если пары закончились
                        else if (arrayMinMax[i][2] > endClass) {
                            //console.log('Пары закончились');
                            //То проверяем какой сегодня день недели
                            //Если сегодня пятница, то меняем таблицу => неделю, и день недели меняем на Пн
                            if (day_of_week == 5) {
                                // console.log('Пятница')
                                table = changeWeek(table);//замена таблиц
                                day_of_week = 1;
                                let nextWeek = searchWeekClass(table)[1];//[1][a,b]. a - День недели найденой пары, b - строка табилцы
                                wClass(table, nextWeek);
                            }
                            //Если другой день недели, т.е. !=5 (не Пт)
                            else {
                                // console.log('Другой день недели')
                                searchWeekClass(table, day_of_week - 1);
                            }
                        }
                    }
                    // else console.log('kek');
                }

                // else {
                //     console.error('error');
                // }
            }
        }
        //minMax = arrayTime[i].innerText//Строка времени n-ой пары
    }
    //=================================================================================================//
    //Функция возврата начала, конца пары и текущего времени.
    function timeClass(table) {
        var currDay = table.querySelectorAll('tr[class]:not(.space)')[(day_of_week - 1) * 4].getElementsByTagName('td')[0];//Ячейка текущего дня недели
        var _className = table.querySelectorAll('tr[class]:not(.space)')[4 * day_of_week - 1].className.substr(0, 3);//Имя класса ячейки текущего дня недели
        var thisDay = table.querySelectorAll('tr[class^=' + _className + ']');//список строк таблицы текущего дня недели (список пар от 4-7)
        var arrayTime = [];//Массив времени начала и конца каждой пары текущего дня
        var arrayMinMax = [];//Двумерный массив каждой строки времени n-ой пары

        currDay.classList.add('this-class');//Текущий день помечаем зеленым

        for (var i = 0; i < thisDay.length; i++) {
            arrayTime[i] = thisDay[i].querySelectorAll('td:nth-last-child(2)')[0];//Время каждой пары
            arrayMinMax[i] = splitTime(arrayTime[i].innerText);
            //arrayMinMax[a][b]. a - список элемента массива. b[0-3] - _min, _max, _time, _minMax
        }

        return [arrayMinMax, thisDay];
    }
    //=================================================================================================//
    //Разделенеи времени на начало и конец пары
    function splitTime(_minMax) {
        _minMax = _minMax.split(' - ');//Разделяем строку по символу ' - '
        let _min = new Date(), _max = new Date(), _time = new Date();//_min - начало пары, _max - конец пары, _time - текущее время
        _min.setHours(_minMax[0].split(':')[0], _minMax[0].split(':')[1], 0);//Разделяем строку времени пары на время начала пары
        _max.setHours(_minMax[1].split(':')[0], _minMax[1].split(':')[1], 0);//Разделяем строку времени пары на время конца пары
        _time.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());//Задаем текущее время
        // console.log(_time.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
        return [_min, _max, _time, _minMax.join(' - ')];//Возвращаем начало пары, конец пары, текущее время и строку времени пары
    }
    //=================================================================================================//
    //Поиск следующей пары текущего дня
    function searchClass(table, k = 0) {
        var _className = table.querySelectorAll('tr[class]:not(.space)')[day_of_week - 1].className.substr(0, 3);//Если стоит два или больше класса, делаем подстроку из 3 символов
        var thisDay = table.querySelectorAll('tr[class^=' + _className + ']');//список строк таблицы текущего дня недели (список пар от 4-7)
        var arrayInfo = [];//Массив наименования пар
        var arrayMinMax = [];//Двумерный массив каждой строки времени n-ой пары
        var arrayTime = [];
        

        for (var i = k; i < thisDay.length; i++) {
            arrayInfo[i] = thisDay[i].querySelectorAll('td:nth-last-child(1)')[0];//Наименование пары
            arrayTime[i] = thisDay[i].querySelectorAll('td:nth-last-child(2)')[0];//Время
            arrayMinMax[i] = splitTime(arrayTime[i].innerText);
            //arrayMinMax[a][b]. a - список элемента массива. b[0-3] - _min, _max, _time, _minMax
        }
        //Если пар нет, отправляем false
        for (var i = 0; i < thisDay.length; i++) {
            if (thisDay[i].querySelectorAll('td:nth-last-child(1)')[0].innerHTML === "&nbsp;") {
                if (i === thisDay.length - 1) { return false; }
                else { return true; }
                // searchWeekClass(table, 0);
                // return false;
                //continue;
            }
            else {
                return true;
            }
        }


    }
    //=================================================================================================//
    //Если пара идет
    function gClass(table, _thisDay) {
        _thisDay.classList.add('this-class');
    }
    //=================================================================================================//
    //Если пара не идет (перемена/закончились пары/еще не начинались)
    function wClass(table, _thisDay, k = 0) {
        //Если _thisDay массив, то закрашиваем строку + день
        if (_thisDay.length > 1) {
            for (var i = k; i < _thisDay.length; i++) {
                for (var j = 0; j < _thisDay[i].length; j++) {
                    _thisDay[i][j].classList.add('last-class');
                }
            }
        }
        else {
            _thisDay.classList.add('last-class');
        }



    }
    //=================================================================================================//
    //Функция смены недели
    function changeWeek(table) {
        //Если таблица четная - меняем ее на нечетную
        if (table === oddTable) {
            table = evenTable;
            document.getElementsByTagName('main')[0].style = "flex-direction: column-reverse;";//Если четная, то нечетную меняем местами с четной
        }
        //Если таблица нечетная - меняем на четную
        else {
            table = oddTable;
            document.getElementsByTagName('main')[0].style = "flex-direction: column;";//Если четная, то нечетную меняем местами с четной
        }
        return table;
    }
    //=================================================================================================//
    //Поиск пар по каждому дню
    function searchWeekClass(table, k = 0) {
        let size = table.querySelectorAll('tr[class]:not(.space)').length;//Количество всех пар, имеющихся и неимеющихся.
        for (var i = k * 4; i < size; i++) {
            //Если пары нет, то идем к следующей
            if (table.querySelectorAll('tr[class]:not(.space)')[i].querySelectorAll('td:last-child')[0].innerHTML === "&nbsp;") {
                continue;
            }
            else {
                // console.log(i);
                let _className = table.querySelectorAll('tr[class]:not(.space)')[i].className.substr(0, 3);//Имя класса ячейки следующего дня недели, где есть пары
                let thisDay = [table.querySelectorAll('tr[class^=' + _className + ']')[0].getElementsByTagName('td')[0]];//Ячейка дня, где есть пары
                let row = table.querySelectorAll('tr[class]:not(.space)')[i].querySelectorAll('td:nth-last-child(n)');//Строка дня
                let both = [row, thisDay];
                return [i, both];//a,b. [a] - индекс пары из всей недели.  [b] - День, когда будут пары
                //[b] = table.querySelectorAll('tr[class]:not(.space)')[i].querySelectorAll('td:last-child')[0]
                //[b] - объект (строка) с найденной парой
            }
        }
    }
    //=================================================================================================//
    //Если пары закончились в Пт, Сб, Вс.
    function weekend(table) {
        if (day_of_week >= 5 || day_of_week === 0) {
            // console.log('Пятница')
            table = changeWeek(table);//замена таблиц
            day_of_week = 1;
            let nextWeek = searchWeekClass(table)[1];//[1][a,b]. a - День недели найденой пары, b - строка табилцы
            wClass(table, nextWeek);//выделяем желтым цветом строку и день пары, которая будет
            return false;//
        }
        //Если другой день недели, т.е. !=5 (не Пт)
        else {
            // console.log('Другой день недели')
            //Ищем следующую пару в будни
            searchWeekClass(table, day_of_week - 1);
            return true;
        }

    }
    //=================================================================================================//
    //Подсчет индекса пары
    function countClass(table) {
        var _className = table.querySelectorAll('tr[class]:not(.space)')[day_of_week - 1].className.substr(0, 3);//Если стоит два или больше класса, делаем подстроку из 3 символов
        var thisDay = table.querySelectorAll('tr[class^=' + _className + ']');//список строк таблицы текущего дня недели (список пар от 4-7)
        var arrayTime = [];
        var arrayMinMax = timeClass(table)[0];
        //var now = new Date().getTime();
        // var endClass = new Date();//последнияя пара
        // var startClass = new Date();//первая пара
        // endClass.setHours(20, 0, 0);//Время окончания последней пары
        // startClass.setHours(13, 20, 0);//Время начала первой пары

        for (var i = 0; i < thisDay.length; i++) {
            arrayTime[i] = thisDay[i].querySelectorAll('td:nth-last-child(2)')[0];//Время
            arrayMinMax[i] = splitTime(arrayTime[i].innerText);
            //arrayMinMax[a][b]. a - список элемента массива. b[0-3] - _min, _max, _time, _minMax
        }

        for(var i = 0; i < thisDay.length; i++){
            if (arrayMinMax[i][2] > arrayMinMax[i][0] && arrayMinMax[i][2] < arrayMinMax[i+1][0] ) {
                // console.log(arrayMinMax[i][0] + '\n' + arrayMinMax[i][1] + '\n' + arrayMinMax[i+1][2])
                // console.log(arrayMinMax[i][2] + ' > ' + arrayMinMax[i][0] + ' && ' + arrayMinMax[i][2] + ' < ' + arrayMinMax[i+1][0])
                // console.log(i);
                var k = i+1;
                // console.log('k = '+k)
                return k;
            }
            else if(i == thisDay.length-1) {
                return 0;
            }
        }
    }
    //=================================================================================================//
    


}