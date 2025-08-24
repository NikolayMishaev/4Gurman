const DB = {
  '850': {
    'Brunch': {
      'собаки': { 'ягненок': { '20.08': ["4 33 6", "4 29 4"],
                               '14.07': ["3 31 3", "4 39 2", "3 35 4"]
       }, 
                  'сердце': {'20.08': ["4 35 4", "3 33 2"]} }
    },
    'Вкусмясина': { 'собаки': { 
        'говядина': { '06.07': ["4 16 3", "4 15 4", "3 13 5"],
                      '17.07': ["3 12 3"]
                    }, 
        'индейка': {'23.07': ["4 35 4", "3 33 2"]} }}
  },
  '340': {
    'МА': {
      'кошки': { 'ягненок': { '19.07': ["1 14 5", "2 14 5"],
                               '13.07': ["2 16 4", "1 19 3", "1 25 6"]
       }, 
                  'сердце': {'15.07': ["1 35 4", "2 33 2"]} },
      'собаки': { 'потрошки': { '10.08': ["1 13 6", "2 12 6"],
                '14.07': ["2 15 3", "1 17 4", "2 16 3"]
}, 
    'сердце': {'20.08': ["4 35 4", "3 33 2"]} }
    },
    'Вкусмясина': 
    { 'собаки': {}}
  },
  '240' : {
    'Платиновая линия': {
      'собаки': { 'желудочки куриные': { '12.08': ["3 41 5", "4 38 2"],
                               '24.06': ["3 45 3", "4 39 2", "3 35 4"]
       }, 
                  'рубец': {'09.08': ["4 45 5", "3 43 3"]} }
    }
  }
};

const app = document.querySelector(".app");
const loginPanel = document.querySelector(".loginPanel");
const inputLogin = document.querySelector(".inputLogin");
const user = document.querySelector(".user");
const body = document.querySelector(".body");
const buttons = document.querySelector(".buttons");
const posName = document.querySelector(".posName");
const butReset = document.querySelector(".reset");
const question = document.querySelector(".question")

let currentUser = 0;
let obj = DB;
let adress = []
let objCopy = []
let cell = ''
let selectedPosition = []

function deleteButtons() {
  buttons.innerHTML = "";
}

function displayButtons(text) {
    deleteButtons();
    if (text) {
        addButton(text)
        return
    }
  if (Array.isArray(obj)) {
    obj.forEach((i) => addButton(i));
    return;
  }
  for (let key in obj) {
    addButton(key);
  }
}

body.addEventListener("click", (e) => {
    if (e.target.className === 'exit') {
        app.classList.add('invisible')
        user.textContent = 'Вы вошли в роли: '
        loginPanel.classList.remove('invisible')
        currentUser = 0
        return
    }
    if (e.target.className === 'reset') {
        obj = DB
        adress = []
        posName.textContent = ''
        displayButtons()
        return
    }
    if (e.target.tagName === "BUTTON") {
        if (currentUser === 2) {
            selectedPosition.find(i=>i[5] === e.target.textContent).forEach(i=>posName.textContent += i + '  >>  ')
            question.textContent = 'Данная позиция снята ?'
            obj = ['да', 'нет']
            displayButtons()
            return
        }
        if (e.target.className === 'login') {
            if (inputLogin.value === '1') {
                loginPanel.classList.add('invisible')
                app.classList.remove('invisible')
                user.textContent += 'кладовщик'
                currentUser = 1
                obj = DB
                question.textContent = 'Введите параметы позиции:'
                displayButtons();
            }
            if (inputLogin.value === '2') {
                loginPanel.classList.add('invisible')
                app.classList.remove('invisible')
                user.textContent += 'водитель ричтрака'
                currentUser = 2
                question.textContent = 'Текущие задания:'
                obj = []
                selectedPosition.forEach(i => obj.push(i[5]))
                displayButtons()
            }
            return
        }
        if (currentUser === 2) {
            return
        }
        if (Array.isArray(obj)) {
            if (e.target.textContent === 'да') {
                adress.push(...objCopy.splice(objCopy.findIndex(i=>i===cell),1))
                selectedPosition.push(adress)
                console.log(selectedPosition)
                if (!objCopy.length) {
                    delete DB[adress[0]][adress[1]][adress[2]][adress[3]][adress[4]]
                }
                adress = []
                obj = DB
                cell = ''
                posName.textContent = ''
                displayButtons()
                return
            }
            if (e.target.textContent === 'нет') {
                adress = []
                obj = DB
                posName.textContent = ''
                displayButtons()
                return
            }
            objCopy = obj
            cell = e.target.textContent
            obj = ['да', 'нет']
            posName.textContent += e.target.textContent
            displayButtons()
            return
        }
        obj = obj[e.target.textContent];
        displayButtons();
        adress.push(e.target.textContent)
        posName.textContent += e.target.textContent + '  >>  '
    }
});

function addButton(text) {
  const newBut = document.createElement("button");
  newBut.style.marginRight = "5px";
  newBut.innerHTML = text;
  buttons.append(newBut);
}
