// var evenWeek;//Четный
// var oddWeek;//Нечетный
document.addEventListener('DOMContentLoaded', week);
function week() {
    var oddTable = document.getElementById('odd-table');
    var evenTable = document.getElementById('even-table');

    function tdNbsp(table) {
        for (var i = 0; i < table.getElementsByTagName('td').length; i++) {
            if (table.getElementsByTagName('td')[i].innerText === '') {
                table.getElementsByTagName('td')[i].innerHTML = '&nbsp;'
            }
        }
    }

    tdNbsp(oddTable);
    tdNbsp(evenTable);

    var day_of_week = new Date().getDay();
    if(day_of_week > 4) day_of_week = 0;
    // var evenTr = evenTable.querySelectorAll(['tr[class]:not(.space)']);
    // var oddTr = oddTable.querySelectorAll(['tr[class]:not(.space)']);
    var time = new Date();
    var min = new Date(), max = new Date();
    var minMax;

    var lastClass = new Date();//"Последняя" пары
    var firstClass = new Date();//"Первая" пара
    lastClass.setHours(20, 0, 0);//Время окончания последней пары
    firstClass.setHours(13, 20, 0);//Время начала первой пары

    var year = new Date().getFullYear(); //Год
    var month = new Date().getMonth();  //Месяц
    var today = new Date(year, month, 0).getTime();// Год месяц 0 (-1 день от текущего месяца) в миллисекундах
    var now = new Date().getTime(); //Сегодняшние год месяц день в миллисекундах
    var week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7)); //(Сегодняшняя дата - начальная неделя) / неделю в миллисекундах = номер недели
    if (week % 2) {
        //even - четная неделя
        oddEven(evenTable, oddTable);
        document.getElementsByTagName('main')[0].style = "flex-direction: column-reverse;";

        f(evenTable, oddTable);
    } else {
        //odd - нечетная неделя
        oddEven(oddTable, evenTable);
        document.getElementsByTagName('main')[0].style = "flex-direction: column;";

        f(oddTable, evenTable);
    }

    /*--------------------------------------------------------------------------------------------------------------*/
    //Функции
    
    //Функция стилизирует недели, четная или нечетная определенным цветом
    //Дополнение к Основной функции
    function oddEven(_table, _table2){
        var evenTr = _table.querySelectorAll(['tr[class]:not(.space)']);
        var oddTr = _table2.querySelectorAll(['tr[class]:not(.space)']);

        _table.getElementsByTagName('h2')[0].style.color = 'green';
        _table.getElementsByTagName('h2')[0].style.textDecoration = 'underline';
        _table2.getElementsByTagName('h2')[0].style.color = 'red';
        _table2.getElementsByTagName('h2')[0].style.textDecoration = 'none';

        //Выделяет День недели
        _table.querySelectorAll('tr[class]:not(.space)')[day_of_week - 1];
        evenTr[day_of_week - 1].getElementsByTagName('td')[0].classList.add('this-class');
        oddTr[day_of_week - 1].getElementsByTagName('td')[0].classList.remove('this-class');
    }

    //Функция ищет текущий день и пару по времени, если пара найдена на текущее время, значит красит ее в зеленый цвет.
    //Дополнение к Основной функции
    function classTime(i, _minMax, _table) {
        var __i = i + 3;
        var _min = new Date(), _max = new Date();
        var __minMax;
        var __table = _table;
        if (__table === undefined || __table == '') {
            console.error(_table);
        } else {
            _minMax = _table.getElementsByTagName('td')[__i].innerText;
            __minMax = _minMax;
            if (_minMax.length !== 0 || _minMax != '') {
                _minMax = _minMax.split(' - ');
                _min.setHours(_minMax[0].split(':')[0], _minMax[0].split(':')[1], 0);
                _max.setHours(_minMax[1].split(':')[0], _minMax[1].split(':')[1], 0);
                time.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
                if (time > _min && time > _max) {
                    classTime(__i, __minMax, _table);
                }
                else if (time > _min && time < _max ) {
                    searchClass(_table);
                    // _table.getElementsByTagName('td')[__i - 1].classList.add('this-class');
                    // _table.getElementsByTagName('td')[__i].classList.add('this-class');
                    // _table.getElementsByTagName('td')[__i + 1].classList.add('this-class');
                }
            }
        }
    }

    //Функция рисует желтым цветом бэкграунд у следующего дня, где есть пары - если в этот день нет пар. 
    //Дополнение к Основной функции
    //В Четверг пар нет, значит смотрит следующий, Пятница. Пары есть, значит рисует.
    function wClass(i, _table) {
        let _i = i - 3;
        console.log(i);
        // if()
        for (i; i > _i; i--) {
            _table.querySelectorAll('tr:not(.space) td')[i+3].classList.add('last-class');
        }
        _table.querySelectorAll('tr[class]:not(.space)')[day_of_week].classList.add('last-class');
    }

    //Основная функция, которая по времени определяет какая пара, есть ли она и тд.
    function f(_table, _table2){
        for (var i = 0; i < _table.getElementsByTagName('td').length; i++) {
            if (_table.getElementsByTagName('td')[i].className !== 'this-class') {
                continue;
            }
            else if (_table.getElementsByTagName('td')[i].className === 'this-class') {
                var _i = i + 2;
                minMax = _table.getElementsByTagName('td')[_i].innerText;
                var _minMax = minMax;
                if (minMax.length !== 0 || minMax != '') {
                    minMax = minMax.split(' - ');
                    min.setHours(minMax[0].split(':')[0], minMax[0].split(':')[1], 0);
                    max.setHours(minMax[1].split(':')[0], minMax[1].split(':')[1], 0);
                    time.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
                    
                    if (time > min && time < max) {
                        if(_table.querySelectorAll('td')[i].innerHTML === "&nbsp;"){
                            _table.querySelectorAll('tr[class]:not(.space)')[day_of_week - 1].classList.add('this-class');
                        }
                        else
                        {
                            searchClass(_table);
                        }
                    }
                    else if (time > min && time > max) {
                        if(_table.querySelectorAll('td')[_i].innerHTML !== "&nbsp;"){
                            classTime(_i, _minMax, _table);
                        }
                        else
                        {
                            searchClass(_table);
                        }
                            
                    }
                    else if (time > lastClass || time < firstClass) {
                        if (day_of_week > 4) {
                            _table2.querySelectorAll('tr[class]:not(.space)')[0].classList.add('last-class');
                        }
                        if(time > lastClass)
                            _table.querySelectorAll('tr[class]:not(.space)')[day_of_week].classList.add('last-class');
                            
                        searchClass(_table);
                    }
                }
                break;
            }
        }
    }

    function searchClass(__table){
        let currDay, currIndex;
        for (var i = 0; i < __table.querySelectorAll('tr:not(.space)>td').length; i++) {
            if(__table.querySelectorAll('tr:not(.space) :not(th)')[i].innerText === __table.querySelectorAll('tr[class]:not(.space)')[day_of_week-1].getElementsByTagName('td')[0].innerText){
                currIndex = i;
                //39
            }
            else 
            {
                continue;
            }
            for(var j = 0; j < 5; j++){
                let thisDay = __table.querySelectorAll('tr[class]:not(.space)')[day_of_week-1].getElementsByTagName('td')[0];
                if(__table.querySelectorAll('tr:not(.space) td')[i] === thisDay && __table.querySelectorAll('tr:not(.space)>td:last-child')[j].innerHTML !== '&nbsp;'){
                    if(__table.querySelectorAll('tr:not(.space) :not(th)')[currIndex+(j+3)].innerHTML === "&nbsp;" && j < 4){
                        searchClass(__table);
                    }
                    else
                    {
                        wClass(i+j*3, __table);
                    }
                }
                else
                {
                    continue;
                }
            }
        }
    }

/*=================================================================================================================*/
}

//for testing
// var oddTable = document.getElementById('odd-table');
// var evenTable = document.getElementById('even-table');
// evenTable.querySelectorAll('tr[class]:not(.space)')[4]
// evenTable.querySelectorAll('tr:not(.space) :not(th)')[39+(0*3)]
// evenTable.querySelectorAll('tr:not(.space) td')[39+3*3]