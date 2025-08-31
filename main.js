const DB = {
  850: {
    Brunch: {
      собаки: {
        рубец: {},
        ягненок: {},
      },
    },
    Вкусмясина: {
      собаки: {
        говядина: {},
        индейка: {},
        потрошки: {},
      },
    }
  },
    340: {
    "Золотая_линия": {
      собаки: {
        страус: {},
        утка: {},
      },
    },
    Вкусмясина: {
      собаки: {
        печень: {},
        сердце: {},
      },
    }
  },
};

                                      // ЗАГРУЗКА EXCEL
async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const a = workbook.Sheets["Привет"];
  let adress = [];
  let position = [];
  let posDate = [];
  Object.entries(a).forEach((i, c) => {
    if (i[0].includes("A")) {
      adress.push(addSpaceToAdress(i[1]["w"]));
    }
    if (i[0].includes("B")) {
      position.push(i[1]["w"]);
    }
    if (i[0].includes("C")) {
      posDate.push(i[1]["w"]);
    }
  });
  // console.log([adress, position, posDate]);
  const arrayPos = []
  position.forEach((i,c)=> {
    if (c > 0) {
      const arrayPos = position[c].split(" ");
      if (DB[arrayPos[0]][arrayPos[1]][[arrayPos[2]]][arrayPos[3]][posDate[c]]) {
        DB[arrayPos[0]][arrayPos[1]][[arrayPos[2]]][arrayPos[3]][posDate[c]].push(adress[c])
      } else {
        DB[arrayPos[0]][arrayPos[1]][[arrayPos[2]]][arrayPos[3]][posDate[c]] = [adress[c]];
      }
    }
  })
  

  // console.log(DB);
}
const te2 = document.querySelector(".test");
te2.addEventListener("change", handleFileAsync, false);

const downloadEx = document.querySelector(".downloadEx");

downloadEx.addEventListener("click", () => {

                                        // СКАЧИВАНИЕ EXCEL
  var workbook = XLSX.utils.book_new();
  const rows = [];
        for (let key in DB['340']['Вкусмясина']['собаки']['печень']) {
    DB['340']['Вкусмясина']['собаки']['печень'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "340 Вкусмясина собаки печень",
      дата: key,
    }))
  }
      for (let key in DB['340']['Вкусмясина']['собаки']['сердце']) {
    DB['340']['Вкусмясина']['собаки']['сердце'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "340 Вкусмясина собаки сердце",
      дата: key,
    }))
  }
      for (let key in DB['340']['Золотая_линия']['собаки']['утка']) {
    DB['340']['Золотая_линия']['собаки']['утка'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "340 Золотая_линия собаки утка",
      дата: key,
    }))
  }
    for (let key in DB['340']['Золотая_линия']['собаки']['страус']) {
    DB['340']['Золотая_линия']['собаки']['страус'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "340 Золотая_линия собаки страус",
      дата: key,
    }))
  }
  for (let key in DB['850']['Вкусмясина']['собаки']['говядина']) {
    DB['850']['Вкусмясина']['собаки']['говядина'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "850 Вкусмясина собаки говядина",
      дата: key,
    }))
  }
    for (let key in DB['850']['Вкусмясина']['собаки']['индейка']) {
    DB['850']['Вкусмясина']['собаки']['индейка'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "850 Вкусмясина собаки индейка",
      дата: key,
    }))
  }
    for (let key in DB['850']['Вкусмясина']['собаки']['потрошки']) {
    DB['850']['Вкусмясина']['собаки']['потрошки'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "850 Вкусмясина собаки потрошки",
      дата: key,
    }))
  }
    for (let key in DB['850']['Brunch']['собаки']['ягненок']) {
    DB['850']['Brunch']['собаки']['ягненок'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "850 Brunch собаки ягненок",
      дата: key,
    }))
  }
      for (let key in DB['850']['Brunch']['собаки']['рубец']) {
    DB['850']['Brunch']['собаки']['рубец'][key].forEach(i=>rows.push({
      адрес: i.split(' ').join(''),
      название_позиции: "850 Brunch собаки рубец",
      дата: key,
    }))
  }
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Привет");
  XLSX.writeFile(workbook, "Report.xlsx");
});

const app = document.querySelector(".app");
const loginPanel = document.querySelector(".loginPanel");
const inputLogin = document.querySelector(".inputLogin");
const user = document.querySelector(".user");
const body = document.querySelector(".body");
const buttons = document.querySelector(".buttons");
const posName = document.querySelector(".posName");
const butReset = document.querySelector(".reset");
const question = document.querySelector(".question");
const queue = document.querySelector(".queue");
const progress = document.querySelector(".progress");
const adminPanel = document.querySelector(".adminPanel")
const listRemovedPanel = document.querySelector(".listRemovedPanel")
const listRemoved = document.querySelector('.listRemoved')

let listRemovedPositions = []
let currentUser = 0;
let obj = DB;
let adress = [];
let objCopy = [];
let cell = "";
let selectedPosition = [];
let cellDone = [];
const users = {
  0: "начальник склада",
  2: "Горелова А.С.",
  3: "Пигорев Д.В.",
  4: "Минакова О.А.",
  5: "Тарасеев А.С."
}

function deleteButtons() {
  buttons.innerHTML = "";
}

function displayButtons(text) {
  deleteButtons();
  if (text) {
    addButton(text);
    return;
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
  if (e.target.className === "progress") {
    obj = DB
    adress = [];
    objCopy = [];
    cell = "";
    displayButtons();
    posName.textContent = ''
    cellDone = selectedPosition.find((i) => i[7] === e.target.textContent);
    cellDone.forEach((i) => (posName.textContent += i + "  >>  "));
    return
  };
  if (e.target.className === "exit") {
    app.classList.add("invisible");
    adminPanel.classList.add("invisible");
    user.textContent = "Вы вошли в роли: ";
    loginPanel.classList.remove("invisible");
    currentUser = 0;
    obj = DB;
    adress = [];
    objCopy = [];
    cell = "";
    return;
  }
  if (e.target.className === "reset") {
    obj = DB;
    adress = [];
    posName.textContent = "";
    displayButtons();
    return;
  }
  if (e.target.tagName === "BUTTON") {
    if (inputLogin.value === '0') {
      if (e.target.className === 'but') {
        posName.textContent = ''
        posName.textContent = 'данный функционал в разработке'
        return
      }
    //   posName.textContent = ''
      // if (listRemovedPositions.length) {
    //     let removedAdress = listRemovedPositions.find(j=>j.find(i=>i[7] === e.target.textContent));
    //     console.log(removedAdress)
    //     if (removedAdress) removedAdress.forEach((i) => (posName.textContent += i + "  >>  "));
      // }
    }
    if (obj === DB) {
      posName.textContent = ''
    }
    if (currentUser === 1) {
      if (e.target.textContent === "нет") {
        posName.textContent = "";
        question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition.forEach((i) => obj.push(i[7]));
        displayButtons();
        return;
      }
      if (e.target.textContent === "да") {
        // listRemovedPositions.push(selectedPosition)
        // listRemovedPositions = Array.from(new Set(listRemovedPositions))
        // console.log(listRemovedPositions)
        posName.textContent = "";
        question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition = selectedPosition.filter((i) => i[7] !== cellDone[7]);
        
        selectedPosition.forEach((i) => obj.push(i[7]));
        displayButtons();
        if (selectedPosition.length === 0) question.textContent = "Заданий нет";
        return;
      }
      cellDone = selectedPosition.find((i) => i[7] === e.target.textContent);
      if (cellDone) cellDone.forEach((i) => (posName.textContent += i + "  >>  "))
      question.textContent = "Данная позиция снята ?";
      obj = ["да", "нет"];
      displayButtons();
      return;
    }
    if (e.target.className === "login") {
      if (users[inputLogin.value]) {
        posName.textContent = "";
        // progress.textContent = "Задания, ожидающие выполнения:";
        queue.innerHTML = "";
        selectedPosition.forEach((i) => addButton(i[7], queue));
        // if (selectedPosition.length === 0) progress.textContent = "";
        loginPanel.classList.add("invisible");
        app.classList.remove("invisible");
        if (inputLogin.value !== '0') user.textContent += `кладовщик ${users[inputLogin.value]}`;
        butReset.classList.remove("invisible");
        currentUser = users[inputLogin.value];
        obj = DB;
        question.textContent = "Введите параметы позиции:";
        displayButtons();
      }
      if (inputLogin.value === "1") {
        posName.textContent = "";
        progress.textContent = "";
        queue.innerHTML = "";
        loginPanel.classList.add("invisible");
        app.classList.remove("invisible");
        user.textContent += "водитель ричтрака Сергей";
        butReset.classList.add("invisible");
        currentUser = 1;
        if (selectedPosition.length === 0) {
          question.textContent = "Заданий нет";
        } else question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition.forEach((i) => obj.push(i[7]));
        displayButtons();
      }
      if (inputLogin.value === '0') {
        // listRemovedPanel.classList.remove("invisible")
        currentUser = users[inputLogin.value];
        user.textContent += `${users[inputLogin.value]}`;
        loginPanel.classList.add("invisible");
        adminPanel.classList.remove("invisible");
        app.classList.remove("invisible");
        posName.textContent = ''
        listRemovedPositions.forEach(i=>i.forEach(j=>addButton(j[7],listRemoved, 'but')))
      }
      return;
    }
    if (currentUser === 1) {
      return;
    }
    if (Array.isArray(obj)) {
      if (e.target.textContent === "да") {
        question.textContent = "Введите параметы позиции:";
        // progress.textContent = "Задания, ожидающие выполнения:";
        adress.push(
          ...objCopy.splice(
            objCopy.findIndex((i) => i === cell),
            1
          ), `${currentUser}`
        );
        selectedPosition.push(adress);
        queue.innerHTML = "";
        // console.log(selectedPosition)
        // console.log(selectedPosition)
        selectedPosition.forEach((i) => addButton(i[7], queue));
        if (!objCopy.length) {
          delete DB[adress[0]][adress[1]][adress[2]][adress[3]][adress[4]];
        }
        adress = [];
        obj = DB;
        cell = "";
        posName.textContent = "";
        displayButtons();
        return;
      }
      if (e.target.textContent === "нет") {
        question.textContent = "Введите параметы позиции:";
        adress = [];
        obj = DB;
        posName.textContent = "";
        displayButtons();
        return;
      }
      if ((Number(e.target.textContent) > 0) && (Number(e.target.textContent) < 9)) {
        question.textContent = "Куда привезти паллет? Выберите номер места: ";
        obj = ["1-6", "7-12", "13-18", "19-24", "25-30", "31-36", "37-42", "43-48"];
        posName.textContent += e.target.textContent + "  >>  ";
        adress.push(e.target.textContent)
        displayButtons();
      return;
      }
      if (obj[0] === '1-6') {
        question.textContent = "Проверьте и подтвердите выбор";
        obj = ["да", "нет"];
        adress.push(e.target.textContent)
        posName.textContent += e.target.textContent;
        displayButtons();
        return;
      }
      objCopy = obj;
      cell = e.target.textContent;
      question.textContent = "Куда привезти паллет? Выберите ряд: ";
      obj = ["1", "2", "3", "4", "5", "6", "7", "8"];
      posName.textContent += e.target.textContent + "  >>  ";
      displayButtons();
      return;
    }
    obj = obj[e.target.textContent];
    displayButtons();
    adress.push(e.target.textContent);
    posName.textContent += e.target.textContent + "  >>  ";
  }
});

function addButton(text, parent, className) {
  const newBut = document.createElement("button");
  newBut.style.marginRight = "5px";
  newBut.innerHTML = text;
  if (parent) {
    newBut.className = className || "progress";
    parent.append(newBut);
  } else buttons.append(newBut);
}

function addSpaceToAdress(adress) {
  return `${adress[0]} ${adress[1]}${adress[2]} ${adress[3]}`
}