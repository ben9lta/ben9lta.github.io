if('serviceWorker' in navigator){
    // Register service worker
    navigator.serviceWorker.register('/timetable/sw.js', { scope: '/timetable/'}).then(function(reg){
        console.log("SW registration succeeded. Scope is "+reg.scope);
    }).catch(function(err){
        console.error("SW registration failed with error "+err);
    });
}

const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const week_rus = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const header = ['День недели', 'Пара', 'Время', 'Инфо']
let daysOddTable = [], daysEvenTable = [];
let dataItems = {}, dataTime = {};

let oddTable, evenTable;
const days = 6, pairs = 4, cols = 4, start_pairs = 4;


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

    
    // console.log(document.querySelectorAll('.'+parity+' tr[class*="0"]'))

    // console.log(document.querySelectorAll('div.even tr[class*="odd-0"] .day-of-week'))

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
        for (let i = 0; i < days; i++) {
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
            addWeek(i, parity);
            addNumbers();
            addHeader();
            addDates(parity)

        }
        addSubj(daysOddTable, daysEvenTable)
    }

    function createWeek() {
        for (let d = -1; d < days; d++) {
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
        for (let d = 0; d < days; d++) {
            for (let p = 0; p < pairs; p++) {
                for (let c = 0; c < cols; c++) {
                    let tr = document.querySelectorAll('tr.' + week[d] + '-' + parity + '-' + p)[0];
                    let td = document.createElement('td');
                    td.innerHTML = '&nbsp;';
                    if (p == 0 && c == 0) {
                        td.innerHTML ='';
                        tr.appendChild(td);
                        tr.children[0].rowSpan = '4';
                    } else {
                        if (c == cols - 1 && p != 0)
                            continue;
                        else {
                            tr.appendChild(td);
                        } 
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

    function addWeek(index, parity) {
        for (let d = 0; d < days; d++) {
            let day = document.querySelectorAll('.' + table.className + ' [class*="0"]')[d].firstElementChild;
            let div = document.createElement('div');
            div.classList.add('day-of-week')
            let b = document.createElement('b');
            b.innerText = week_rus[d];
            day.appendChild(div);
            div.appendChild(b);
            
        }
    }

    function addNumbers() {
        for (let d = 0; d < days; d++) {
            for (let p = 0; p < pairs; p++) {
                let row = document.querySelectorAll('.' + week[d] + '-' + parity + '-' + p)[0];
                if (row.firstChild.getAttribute('rowspan') == null) {
                    row.firstChild.innerText = getKeyByValue(dataTime, dataTime[start_pairs + p]);
                    row.children[1].innerText = dataTime[start_pairs + p];
                } else {
                    row.children[1].innerText = getKeyByValue(dataTime, dataTime[start_pairs + p]);
                    row.children[2].innerText = dataTime[start_pairs + p];

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
        // console.log(getCurrDay())
    }
}


function coloredTable() {
    fillCurrDay();
    let curr_time = getCurrTime();
    fillCurrPair();

    function fillCurrDay() {
        let td = getCurrDay();
        let c_day = currDate().getDay();
        c_day = c_day == 0 ? 7 : c_day;
        // console.log(c_day)
        // if (c_day > days){
        //     td.firstElementChild.classList.add('yellow');
        // }
        // else
        // {
        //     td.firstElementChild.classList.add('green');
        // }       
        if(c_day <= days) {
            td.firstElementChild.classList.add('green');
        }
    }

    function splitPairsTime(pair_time) {
        start = pair_time.substring(0, pair_time.indexOf(' '));
        end = pair_time.substring(pair_time.lastIndexOf(' ') + 1);
        return [start, end];
    }


    function getPairsByDay(cday = getCurrDay()) {
        if(!cday) {
            cday = getNextDay()
        }
        let classname = cday.className.substring(0, cday.className.length-1);
        let arr = []
        for(let i = 0; i < pairs; i++) {
            arr.push(document.getElementsByClassName(''+ classname +i)[0])
        }
        return arr;
    }

    function hasPairs(pairs) {
        let arr = pairs.map(function (a) {
            if(a.lastElementChild.innerText == '' || a.lastElementChild.innerHTML == '&nbsp;') {
                return false
            }
            else return true
        })
        if(arr.indexOf(true) !== -1) {
            return true;
        }
        else return false; 
    }

    function getTimeOfPair(pair) {

        return pair.lastElementChild.previousSibling.innerText;
    }

    function fillCurrPair() {

        let fptime = document.querySelector('.mon-odd-0').children[document.querySelector('.mon-odd-0').children.length - 2].innerText;
        dataTime = Object.values(dataTime);
        let j = 0;
        for (let i = 0; i < dataTime.length; i++) {
            if (dataTime[i] == fptime) {
                j = i;
                break;
            }
            else
                continue;
        }
        
        let pairs_day = getPairsByDay();
        let time_pairs = [];
        let start_pairs = [];
        let end_pairs = [];
        getTimeOfPair(pairs_day[0]);
        for(let i = 0; i < pairs_day.length; i++) {
            time_pairs.push(pairs_day[i].lastElementChild.previousSibling.innerText);
        }

        for(let i = 0; i < time_pairs.length; i++) {
            let spair = splitPairsTime(time_pairs[i])[0];
            let epair = splitPairsTime(time_pairs[i])[1];
            start_pairs.push(spair);
            end_pairs.push(epair);
        }

        c_day = currDate().getDay();
        c_day = c_day == 0 ? 7 : c_day;
        for(let i = 0; i < start_pairs.length; i++) {
            
            if(c_day > days) { 
                let divTable = document.querySelector('h2[class*=yellow]').parentElement;
                let next_week = divTable.querySelector('tr.' + week[0] + '-' + divTable.className + '-0');
                return nextPair(next_week);
            }
            if(!hasPairs(pairs_day)) {
                if(c_day == days) { 
                    let divTable = document.querySelector('h2[class*=yellow]').parentElement;
                    let next_week = divTable.querySelector('tr.' + week[0] + '-' + divTable.className + '-0');
                    return nextPair(next_week);
                }

                let pairs_next_day = getPairsByDay(getNextDay());
                return nextPair(pairs_next_day[i])
            }
            else            
            if(curr_time >= start_pairs[0] && curr_time < end_pairs[end_pairs.length-1]) {
                //В пределах занятий. Перемены или пары
                
                if(curr_time >= start_pairs[0] && curr_time < end_pairs[i+1]) {
                    //Перемены или пары
                    if(curr_time >= start_pairs[i] && curr_time < end_pairs[i]) {
                        //Пара
                        console.log('Пара')
                        return thisPair(pairs_day[i])
                    }
                    
                    if(curr_time >= end_pairs[i] && curr_time < start_pairs[i+1]) {
                        //Перемена
                        console.log('Перемена')
                        return nextPair(pairs_day[i+1])
                    }
                    
                }
                else
                {
                    if(pairs_day[i].lastElementChild.innerHTML == '&nbsp;' || 
                    pairs_day[i].lastElementChild.innerText == ''){
                        // console.log(curr_time, start_pairs[0], end_pairs[end_pairs.length-1])
                        return nextPair(pairs_day[i])
                    }
                    continue;
                }
                
            }
            else 
            {                
                if(curr_time < start_pairs[0]) 
                {
                    //Будут пары
                    console.log('скоро пары')
                    return nextPair(pairs_day[0])
                }
                if(curr_time >= end_pairs[end_pairs.length-1])
                {
                    //Пары закончились
                    console.log('пары закончились')
                    return nextPair(pairs_day[pairs_day.length-1])
                }
            }

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
        // console.log(tr);
        if (tr.children[tr.children.length - 1].innerHTML == '&nbsp;' || tr.children[tr.children.length - 1].innerHTML == '') {
            index = getIndexPair(tr);
            let row = getAllPairs();
            index + 1 > row.length-1 ? index = 0 : index += 1;
            return nextPair(row[index]);
        } else {
            let row = document.getElementsByClassName(tr.className.substring(0, tr.className.lastIndexOf('-')) + '-0')[0];
            if(row.childElementCount !== cols) {
                row.children[0].classList.add('yellow');
            }
            tr.classList.add('yellow');
            return;
        }
    }

    function getCurrTime() {
        let currTime = currDate();
        let h = currTime.getHours() < 10 ? '0' + currTime.getHours() : currTime.getHours();
        let m = currTime.getMinutes() < 10 ? '0' + currTime.getMinutes() : currTime.getMinutes();
        let string = h + ':' + m;
        // string = '13:30'
        console.log(string)
        return string;
    }

    function getCurrDay(index = 0) {
        let day = currDate().getDay();
        day = day == 0 ? nextDate().getDay() : day;
        if (day > days) {
            let divTable = document.querySelector('h2[class*=yellow]').parentElement;
            return divTable.querySelector('tr.' + week[0] + '-' + divTable.className + '-'+index);
        }
        else {
            let divTable = document.querySelector('h2[class*=green]').parentElement;
            return divTable.querySelector('tr.' + week[day-1] + '-' + divTable.className + '-'+index);
        }
    }

    function getNextDay(index = 0) {
        let n_day = nextDate().getDay();
        n_day = n_day == 0 ? 7 : n_day;
        if (n_day > days) {
            let divTable = document.querySelector('h2[class*=yellow]').parentElement;
            return divTable.querySelector('tr.' + week[0] + '-' + divTable.className + '-'+index);
        }
        else {
            // console.log('qwe')
            let divTable = document.querySelector('h2[class*=green]').parentElement;
            return divTable.querySelector('tr.' + week[n_day-1] + '-' + divTable.className + '-'+index);
        }
    }
}


function getDates(date = currDate()) {
    // let currdate = currDate();
    let currdate = date;
    let monday = new Date();
    let day = currdate.getDay() == 0 ? 7 : currdate.getDay();
    let mon = currdate.getDate() - day;
    monday.setDate(mon);
    let arr = [];
    if(monday.getDay() == 0) {
        
        arr.push(new Date(monday.setDate(monday.getDate()+1)))
    }
    for(let i = 1; i < days; i++) {
        
        arr.push(new Date(monday.setDate(monday.getDate()+1)))
    }
    arr.push(new Date(monday.setDate(arr[0].getDate() + 7)));
    return arr;
}

function addDates(parity) {
    dates = getDates();
    dates2 = getDates(dates[dates.length-1])
    if(getWeekNum() % 2 == 0) {
        let tr = document.querySelectorAll('div.'+parity+' tr[class*="'+parity+'-0"] .day-of-week');
        if(parity == 'even') {
            for(let i = 0; i < tr.length; i++){
                let span = document.createElement('span');
                span.innerText = dates[i].toLocaleDateString();
                tr[i].appendChild(span);
            }
        } 
        else
        {
            // console.log(dates2)
            for(let i = 0; i < tr.length; i++){
                let span = document.createElement('span');
                span.innerText = dates2[i].toLocaleDateString();
                tr[i].appendChild(span);
            }
        } 
    }
    else 
    {
        if(currDate().getDay() == 0) {
            let tr = document.querySelectorAll('div.'+parity+' tr[class*="'+parity+'-0"] .day-of-week');
            // console.log(tr);
            if(parity == 'even') {
                for(let i = 0; i < tr.length; i++){
                    let span = document.createElement('span');
                    span.innerText = dates2[i].toLocaleDateString();
                    tr[i].appendChild(span);
                }
            } 
            else
            {
                // console.log(dates2)
                for(let i = 0; i < tr.length; i++){
                    let span = document.createElement('span');
                    span.innerText = dates[i].toLocaleDateString();
                    tr[i].appendChild(span);
                }
            } 
        }
        else 
        {
            let tr = document.querySelectorAll('div.'+parity+' tr[class*="'+parity+'-0"] .day-of-week');
            if(parity != 'even') {
                for(let i = 0; i < tr.length; i++){
                    let span = document.createElement('span');
                    span.innerText = dates[i].toLocaleDateString();
                    tr[i].appendChild(span);
                }
            } 
            else
            {
                // console.log(dates2)
                for(let i = 0; i < tr.length; i++){
                    let span = document.createElement('span');
                    span.innerText = dates2[i].toLocaleDateString();
                    tr[i].appendChild(span);
                }
            } 
        }
    }

}

/*==============================================*/


function getWeekNum() {
    let date, newYear, newYearDay, wNum;
    date = currDate(); // сегодняшнее число
    newYear = new Date(date.getFullYear(), 0, 1); //Год Месяц число
    newYearDay = newYear.getDay(); //день недели начала года
    wNum = Math.floor(((date.getTime() - newYear.getTime()) / 1000 / 60 / 60 / 24 + newYearDay) / 7);// (текущий день года + день начала недели) / неделю = неделя текущего дня
    if(date.getDay() == 1)
        return wNum;
    else
        return wNum+1;
}

function currDate() {
    // let date = new Date().setDate(23);
    // return new Date(date);
    let date = new Date();
    return date
}

function nextDate(curr_date = currDate()) {
    let date = new Date(curr_date);
    let day = date.getDate() == 0 ? 7 : date.getDate();
    date.setDate(day + 1)
    return new Date(date);
    // return new Date
}

function getParityOfWeek() {
    let week = getWeekNum();
    if (week % 2 == 0) {
        return 'even'
    } else return 'odd';
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

function arrayDaysInWeek(parity) {
    let arraydate = [];
    let now = currDate();
    let dayofweek = now.getDay();
    if(dayofweek !== 1) {
        now.setDate(now.getDate() - (dayofweek > 1 ? dayofweek : dayofweek - getDays()));
    }

    for(let i = 0, d = days; i < 14; i++, d--) {               
        if(d == 0){
            d = 7;
        } else
        if(d > days){
            continue;
        } else {
            arraydate.push(new Date(now.getFullYear(), now.getMonth(), now.getDate() + i));
        }
    }
    let result = arraydate.map((a,b) => new Date(a).toLocaleDateString());
    if(parity === 0) {
        return result.splice(0, getDays());
    } else {
        return result.splice(getDays());
    }
}

// Scroll to currday or next
document.addEventListener('readystatechange', function() {
    if(document.readyState == 'complete') {
        if(document.querySelector('tr.yellow')){
            setTimeout(() => {
                let tr = document.querySelector('tr.yellow');
                let len = tr.classList[0].indexOf('-')
                let day = tr.classList[0].substring(0, len)
                let parity = tr.parentElement.parentElement.className;
                document.getElementsByClassName(''+day+'-'+parity +'-'+0)[0].scrollIntoView({behavior: "smooth"})
            }, 100);
        }
        else 
        {
            setTimeout(() => {
                let tr = document.querySelector('tr.green');
                let len = tr.classList[0].indexOf('-')
                let day = tr.classList[0].substring(0, len)
                let parity = tr.parentElement.parentElement.className;
                document.getElementsByClassName(''+day+'-'+parity +'-'+0)[0].scrollIntoView({behavior: "smooth"})
            }, 100);
        }
        
       
    } 
})

