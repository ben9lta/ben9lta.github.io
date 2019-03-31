
var data = [
    {
        "even":[{
            "tue":[
                {
                    "title":"Информационная безопасность в цифровой экономике. ауд. 11",
                    "fio":"Гришин Игорь Юрьевич"
                },
                {
                    "title":"Информационная безопасность в цифровой экономике. ауд. 11",
                    "fio":"Гришин Игорь Юрьевич"
                },
                {
                    "title":"Информационная безопасность в цифровой экономике. ауд. 11",
                    "fio":"Гришин Игорь Юрьевич"
                },
                {
                    "title":"",
                    "fio":""
                }                
            ],
            "wed":[
                {
                    "title":"Межкультурное взаимодействие в современном мире. ауд. 17",
                    "fio":"Корсунский А.Г"
                },
                {
                    "title":"Проектный менеджмент. ауд. 20",
                    "fio":"Рындач М.А (Линник И.И.)"
                },
                {
                    "title":"Разработка интернет-приложений и сервисов. ауд. 20",
                    "fio":"Олейников Николай Николаевич"
                },
                {
                    "title":"",
                    "fio":""
                }
            ],
            "fri":[
                {
                    "title":"Профессионально ориентированный курс иностранного языка. ауд. 37",
                    "fio":"Осадчая Т.Ю."
                },
                {
                    "title":"Технологии цифрового общества. ауд. 23",
                    "fio":"Репкин Роман Вячеславович"
                },
                {
                    "title":"",
                    "fio":""
                },
                {
                    "title":"",
                    "fio":""
                }
            ]
        }],
        "odd":[{
            "tue":[
                {
                    "title":"Технология анализа и обработки больших данных (Вig Data). ауд. 11",
                    "fio":"Четырбок Петр Васильевич"
                },
                {
                    "title":"Межкультурное взаимодействие в современном мире. ауд. 1",
                    "fio":"Атик А.А"
                },
                {
                    "title":"Технология анализа и обработки больших данных (Вig Data). ауд. 11",
                    "fio":"Четырбок Петр Васильевич"
                },
                {
                    "title":"Технология анализа и обработки больших данных (Вig Data). ауд. 11",
                    "fio":"Четырбок Петр Васильевич"
                }
            ],
            "wed":[
                {
                    "title":"Проектный менеджмент. ауд. 1",
                    "fio":"Лукьянова Е.Ю."
                },
                {
                    "title":"Разработка интернет-приложений и сервисов. ауд. 20",
                    "fio":"Олейников Николай Николаевич"
                },
                {
                    "title":"Разработка интернет-приложений и сервисов. ауд. 20",
                    "fio":"Олейников Николай Николаевич"
                },
                {
                    "title":"",
                    "fio":""
                }
            ],
            "fri":[
                {
                    "title":"Профессионально ориентированный курс иностранного языка. ауд. 37",
                    "fio":"Осадчая Т.Ю."
                },
                {
                    "title":"Технологии цифрового общества. ауд. 23",
                    "fio":"Репкин Роман Вячеславович"
                },
                {
                    "title":"Технологии цифрового общества. ауд. 23",
                    "fio":"Репкин Роман Вячеславович"
                },
                {
                    "title":"",
                    "fio":""
                }
            ]
        }]
    }
];

let evenTable = document.querySelectorAll('#even-table .t-even tbody')[0];
let tue = evenTable.querySelectorAll("[class*='tue']");
let wed = evenTable.querySelectorAll("[class*='wed']");
let fri = evenTable.querySelectorAll("[class*='fri']");
let weekHtml = [tue, wed, fri];

let oddTable = document.querySelectorAll('#odd-table .t-odd tbody')[0];
let _tue = oddTable.querySelectorAll("[class*='tue']");
let _wed = oddTable.querySelectorAll("[class*='wed']");
let _fri = oddTable.querySelectorAll("[class*='fri']");
let _weekHtml = [_tue, _wed, _fri];


var dataItems = [];
data.forEach(function(items){
    dataItems = items;
});

//weekHtml[0]; день недели
//weekHtml[0][0]; //день недели, пара по счету
//dataItems.even[0][weekHtml[0][0].className][2]["title"]; // className][2]["title"] = 2 - это пара
function showOdd(arrHtml){
    for(let i = 0; i < arrHtml.length; i++){
        for(let j = 0; j < arrHtml[i].length; j++){
            arrHtml[i][j].querySelector('td:last-child').innerHTML = dataItems["odd"][0][arrHtml[i][0].className][j]["title"];
            arrHtml[i][j].addEventListener("click", function rec(){
                arrHtml[i][j].querySelector('td:last-child').innerHTML = dataItems["odd"][0][arrHtml[i][0].className][j]["fio"];
                recTitle(arrHtml[i][j], dataItems["odd"][0][arrHtml[i][0].className][j]);
            });
        }
    }
}

function showEven(arrHtml){
    for(let i = 0; i < arrHtml.length; i++){
        for(let j = 0; j < arrHtml[i].length; j++){
            arrHtml[i][j].querySelector('td:last-child').innerHTML = dataItems["even"][0][arrHtml[i][0].className][j]["title"];
            arrHtml[i][j].addEventListener("click", function rec(){
                arrHtml[i][j].querySelector('td:last-child').innerHTML = dataItems["even"][0][arrHtml[i][0].className][j]["fio"];
                recTitle(arrHtml[i][j], dataItems["even"][0][arrHtml[i][0].className][j]);
            });
        }
    }
}


function recFio(arrHtml, el){
    return new Promise((resolve, reject)=>{
        arrHtml.addEventListener("click", function(){
            arrHtml.querySelector('td:last-child').innerHTML = el["fio"];
            resolve(recTitle(arrHtml, el));
        }, {once: true});
    })
}

function recTitle(arrHtml, el){
    return new Promise((resolve, reject)=>{
        arrHtml.addEventListener("click", function(){
            arrHtml.querySelector('td:last-child').innerHTML = el["title"];
            resolve(recFio(arrHtml, el));
        }, {once: true});
    });
}

showEven(_weekHtml);
showOdd(weekHtml)

