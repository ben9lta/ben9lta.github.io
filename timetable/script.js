if('serviceWorker' in navigator){
    // Register service worker
    navigator.serviceWorker.register('/timetable/sw.js', { scope: '/timetable/'}).then(function(reg){
        console.log("SW registration succeeded. Scope is "+reg.scope);
    }).catch(function(err){
        console.error("SW registration failed with error "+err);
    });
}

let week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
let week_rus = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
let header = ['День недели', 'Пара', 'Время', 'Инфо']
let daysOddTable = [], daysEvenTable = [];
let dataItems = {}, dataTime = {};

let oddTable, evenTable;
let days = 5, pairs = 4, cols = 4;


document.addEventListener("DOMContentLoaded", function (event) {
    let odd = document.getElementById('odd');
    let even = document.getElementById('even');

    let table_odd = document.createElement('table');
    let table_even = document.createElement('table');
    table_odd.className = 'odd-table';
    table_even.className = 'even-table';

    odd.appendChild(table_odd);
    even.appendChild(table_even);

    tables = getTablesOfWeek(table_odd, table_even);
    createTables(tables);
    checkWeek(tables);
    coloredTable();

});

function init(days) {
    initData();
    initTables();
    initDaysOfTables(days);

    function initData() {
        dataItems = window.SCHEDULE.getData();
        dataTime = window.SCHEDULE.getTime();
    }

    function initTables() {
        oddTable = document.querySelector('table.odd-table');
        evenTable = document.querySelector('table.even-table')
    }

    function initDaysOfTables(days) {
        daysOddTable = [];
        daysEvenTable = [];
        for (let i = 0; i <= days; i++) {
            for (let j = 0; j < pairs; j++) {
                daysOddTable.push(document.querySelectorAll('[class*=' + week[i] + '-odd]')[j]);
                daysEvenTable.push(document.querySelectorAll('[class*=' + week[i] + '-even]')[j]);
            }
        }
    }
}


function createTables(tables) {
    let parity, table;
    create();

    function create() {
        for (let i = 0; i < tables.length; i++) {
            table = tables[i];
            parity = getParityOfTable(table);

            createWeek();
            init(days);
            addPairs();
            addSpace();
            addWeek();
            addNumbers();
            addHeader();
        }
        addSubj(daysOddTable, daysEvenTable)
    }

    function createWeek() {
        for (let d = -1; d <= days; d++) {
            for (let p = 0; p < pairs; p++) {
                let tr = document.createElement('tr');
                table.appendChild(tr);
                if (d == -1 && p == 0) {
                    tr.classList.add('header');
                    break;
                }
                else {
                    tr.classList.add(week[d] + '-' + parity + '-' + p);
                }
            }
        }
    }

    function addPairs() {
        for (let d = 0; d <= days; d++) {
            for (let p = 0; p < pairs; p++) {
                for (let c = 0; c < cols; c++) {
                    let tr = document.querySelectorAll('tr.' + week[d] + '-' + parity + '-' + p)[0];
                    let td = document.createElement('td');
                    td.innerHTML = '&nbsp;';
                    if (p == 0 && c == 0) {
                        tr.appendChild(td);
                        tr.children[0].rowSpan = '4';
                    } else {
                        if (c == cols - 1 && p != 0)
                            continue;
                        else
                            tr.appendChild(td);
                    }
                }
            }
        }
    }

    function addSpace() {
        for (let d = 0; d < days; d++) {
            let tr = document.querySelectorAll('tr[class*=' + week[d] + ']');
            let space = document.createElement('tr');
            space.className = 'space';
            tr[tr["length"] - 1].insertAdjacentElement('afterend', space);

        }
    }

    function addWeek() {
        for (let d = 0; d <= days; d++) {
            let day = document.querySelectorAll('.' + table.className + ' [class*="0"]')[d].firstElementChild;
            day.innerText = week_rus[d];
        }
    }

    function addNumbers() {
        for (let d = 0; d <= days; d++) {
            for (let p = 0; p < pairs; p++) {
                let row = document.querySelectorAll('.' + week[d] + '-' + parity + '-' + p)[0];
                if (row.firstChild.getAttribute('rowspan') == null) {
                    row.firstChild.innerText = getKeyByValue(dataTime, dataTime[4 + p]);
                    row.children[1].innerText = dataTime[4 + p];
                } else {
                    row.children[1].innerText = getKeyByValue(dataTime, dataTime[4 + p]);
                    row.children[2].innerText = dataTime[4 + p];

                }
            }
        }
    }

    function addHeader() {
        for (let c = 0; c < cols; c++) {
            let tr = document.querySelector('#' + parity + ' .header');
            let th = document.createElement('th');
            tr.appendChild(th);
            th.innerText = header[c];
        }

    }

}

function addSubj(daysOddTable, daysEvenTable) {
    let arr = [[...daysOddTable], [...daysEvenTable]];

    showSubj();

    function showSubj() {
        for (let a = 0; a < arr.length; a++) {
            for (let i = 0; i < arr[a].length; i++) {
                let className = arr[a][i].className;
                let weekName = className.substring(0, className.indexOf('-')); //Из названия класса забираю название недели
                let parity = className.substring((className.indexOf('-') + 1), className.lastIndexOf('-'));
                if (dataItems[parity][0][weekName] != undefined) {
                    let tr = arr[a][i].querySelectorAll('td:last-child')[0].parentElement;
                    let index = parseInt(tr.className.substr(tr.className.length - 1));
                    let td = arr[a][i].querySelectorAll('td:last-child')[0];
                    let objText = dataItems[parity][0][weekName][index];
                    td.innerHTML = objText['title'];
                    arr[a][i].addEventListener("click", function change() {
                        td.innerHTML = objText['fio'];
                        changeText(arr[a][i], objText, true);
                    });
                }
            }
        }
    }

    function changeText(daysOddTable, objText, bool) {
        return new Promise(resolve => {
            daysOddTable.addEventListener('click', () => {
                if (bool == true) {
                    daysOddTable.querySelector('td:last-child').innerHTML = objText['title'];
                } else {
                    daysOddTable.querySelector('td:last-child').innerHTML = objText['fio'];
                }
                resolve(changeText(daysOddTable, objText, !bool));
            }, { once: true }); //once: true => вызывается только 1 раз, не более. Для того чтобы не зависала страница
        })
    }

}

function checkWeek(tables) {
    let week = getWeekNum();
    if (week % 2 == 0) {
        //even - четная неделя
        document.getElementsByTagName('main')[0].style = "flex-direction: column-reverse;";//Если четная, то нечетную меняем местами с четной
        let odd = tables[0].parentElement.getElementsByTagName('h2')[0];
        let even = tables[1].parentElement.getElementsByTagName('h2')[0];
        odd.style = 'color: #efcc00;';
        odd.className = 'odd-yellow';
        even.style = 'color: rgb(40, 197, 22); text-decoration: underline;';
        even.className = 'even-green';


    }
    else if (week % 2 != 0) {
        //odd - нечетная неделя
        document.getElementsByTagName('main')[0].style = "flex-direction: column;";//Если нечетная, то меняем местами с четной
        let odd = tables[0].parentElement.getElementsByTagName('h2')[0];
        let even = tables[1].parentElement.getElementsByTagName('h2')[0];
        odd.style = 'color: rgb(40, 197, 22); text-decoration: underline;';
        odd.className = 'odd-green';
        even.style = 'color: #efcc00;';
        even.className = 'even-yellow';
    }
}

function coloredTable() {
    fillCurrDay();
    let currTime = checkCurrTime();
    fillCurrPair(currTime);
    // checkPair(getCurrDay());

    function fillCurrDay() {
        let td = getCurrDay();
        if (new Date().getDay() > days)
            td.firstElementChild.classList.add('yellow');
        else
            td.firstElementChild.classList.add('green');
    }

    function fillCurrPair(time) {
        let strTime = document.querySelector('.mon-odd-0').children[document.querySelector('.mon-odd-0').children.length - 2].innerText;
        dataTime = Object.values(dataTime);
        let j = 0;
        for (let i = 0; i < dataTime.length; i++) {
            if (dataTime[i] == strTime) {
                j = i;
                break;
            }
            else
                continue;
        }

        
        let a = dataTime[j].substring(0, dataTime[j].indexOf(' ')); //Начало пары
        let b = dataTime[j].substring(dataTime[j].lastIndexOf(' ') + 1); //Конец пары
        let row = getCurrDay();
        if (time > dataTime[j] && time < dataTime[j + 1] && time < b) {
            //Если текущее время находится в пределах времени пары, то красить зеленым
            thisPair(row);
        }
        else {
            //Если текущее время не находится в рамках пары, то некст
            document.querySelectorAll('tr[class*=' + row.className + '] ~ tr')[0];
            nextPair(row);
        }

    }

    function getAllPairs(){
        return document.querySelectorAll('tr:not(.space):not(.header)');
    }

    function getIndexPair(tr){
        let rows = getAllPairs();
        arr = Array.from(rows);
        let index = arr.indexOf(tr);
        return index;
    }

    function thisPair(tr) {
        tr.classList.add('green');
    }

    function nextPair(tr) {
        if (tr.children[tr.children.length - 1].innerHTML == '&nbsp;') {
            index = getIndexPair(tr);
            let row = getAllPairs();
            index + 1 > row.length ? index = 0 : index += 1;
            nextPair(row[index]);
        } else {
            let row = document.getElementsByClassName(tr.className.substring(0, tr.className.lastIndexOf('-')) + '-0')[0];
            row.children[0].classList.add('yellow');
            tr.classList.add('yellow');
        }
    }

    function checkCurrTime() {
        let currTime = new Date();
        let h = currTime.getHours() < 10 ? '0' + currTime.getHours() : currTime.getHours();
        let m = currTime.getMinutes() < 10 ? '0' + currTime.getMinutes() : currTime.getMinutes();
        let string = h + ':' + m;
        return string;
    }

    function getCurrDay() {
        let day = new Date().getDay();
        if (day > days) {
            let divTable = document.querySelector('h2[class*=yellow]').parentElement;
            return divTable.querySelector('tr.' + week[0] + '-' + divTable.className + '-0');
        }
        else {
            let divTable = document.querySelector('h2[class*=green]').parentElement;
            return divTable.querySelector('tr.' + week[day-1] + '-' + divTable.className + '-0');
        }
    }
}




/*==============================================*/

function getWeekNum() {
    let date, newYear, newYearDay, wNum;
    date = new Date(); // сегодняшнее число
    newYear = new Date(date.getFullYear(), 0, 1); //Год Месяц число
    newYearDay = newYear.getDay(); //день недели начала года
    wNum = Math.floor(((date.getTime() - newYear.getTime()) / 1000 / 60 / 60 / 24 + newYearDay) / 7);// (текущий день года + день начала недели) / неделю = неделя текущего дня
    return wNum + 1;
}


function getTablesOfWeek(odd, even) {
    return [odd, even]
}

function getParityOfTable(table) {
    return table.className.substring(0, table.className.indexOf('-'));
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


document.addEventListener("DOMContentLoaded", function(){ 
    let elem = document.getElementsByClassName("yellow"); 
    if(document.getElementsByClassName('green')[0] === undefined) { 
        document.getElementsByClassName('yellow')[0].scrollIntoView(true); 
    } 
    else 
    { 
        document.getElementsByClassName('green')[0].scrollIntoView(); 
    } 
});