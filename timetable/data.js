var SCHEDULE = {};

var data =
{
    "even": [{
        "mon": [
            {
                "title": "Облачные технологии для бизнеса. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Линник Иван Иванович"
            },
            {
                "title": "Системы поддержки принятия решений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "Имитационное моделирование бизнес-процессов в цифровой экономике. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "",
                "fio": ""
            }
        ],
        "tue": [
            {
                "title": "Облачные технологии для бизнеса. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Линник Иван Иванович"
            },
            {
                "title": "Современные программные средства разработки бизнес-приложений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Олейников Николай Николаевич"
            },
            {
                "title": "Системы поддержки принятия решений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "",
                "fio": ""
            }
        ],
        "thu": [
            {
                "title": "Нейронные сети. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Четырбок Петр Васильевич"
            },
            {
                "title": "Нейронные сети. ауд. 20, ул. Севастопольская 2-а",
                "fio": "Четырбок Петр Васильевич"
            },
            {
                "title": "Современные программные средства разработки бизнес-приложений. ауд. 20, ул. Севастопольская 2-а",
                "fio": "Олейников Николай Николаевич"
            },
            {
                "title": "",
                "fio": ""
            }
        ]
    }],
    "odd": [{
        "mon": [
            {
                "title": "Облачные технологии для бизнеса. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Линник Иван Иванович"
            },
            {
                "title": "ДПВ: Системы поддержки принятия решений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "Имитационное моделирование бизнес-процессов в цифровой экономике. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "",
                "fio": ""
            }
        ],
        "tue": [
            {
                "title": "Облачные технологии для бизнеса. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Линник Иван Иванович"
            },
            {
                "title": "Современные программные средства разработки бизнес-приложений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Олейников Николай Николаевич"
            },
            {
                "title": "ДПВ: Системы поддержки принятия решений. ауд. 23, ул. Севастопольская 2-а",
                "fio": "Таран Виктория Николаевна"
            },
            {
                "title": "",
                "fio": ""
            }
        ],
        "thu": [
            {
                "title": "ДПВ: Нейронные сети. ауд. 20, ул. Севастопольская 2-а",
                "fio": "Четырбок Петр Васильевич"
            },
            {
                "title": "ДПВ: Нейронные сети. ауд. 20, ул. Севастопольская 2-а",
                "fio": "Четырбок Петр Васильевич"
            },
            {
                "title": "Современные программные средства разработки бизнес-приложений. ауд. 20, ул. Севастопольская 2-а",
                "fio": "Олейников Николай Николаевич"
            },
            {
                "title": "",
                "fio": ""
            }
        ]
    }]
};

var time = {
    '1': '08:00 - 09:30',
    '2': '09:45 - 11:15',
    '3': '11:30 - 13:00',
    '4': '13:30 - 15:00',
    '5': '15:15 - 16:45',
    '6': '17:00 - 18:30',
    '7': '18:45 - 20:15',
}


window.SCHEDULE.getData = () => { return data }
window.SCHEDULE.getTime = () => { return time }

