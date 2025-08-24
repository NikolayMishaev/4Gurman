const DB = {
  850: {
    Brunch: {
      собаки: {
        ягненок: {
          20.08: ["4 33 6", "4 29 4"],
          14.07: ["3 31 3", "4 39 2", "3 35 4"],
        },
        сердце: { 20.08: ["4 35 4", "3 33 2"] },
      },
    },
    Вкусмясина: {
      собаки: {
        говядина: {
          "06.07": ["4 16 3", "4 15 4", "3 13 5"],
          17.07: ["3 12 3"],
        },
        индейка: { 23.07: ["4 35 4", "3 33 2"] },
      },
      щенки: {},
    },
  },
  340: {
    МА: {
      кошки: {
        ягненок: {
          19.07: ["1 14 5", "2 14 5"],
          13.07: ["2 16 4", "1 19 3", "1 25 6"],
        },
        сердце: { 15.07: ["1 35 4", "2 33 2"] },
      },
      собаки: {
        потрошки: {
          10.08: ["1 13 6", "2 12 6"],
          14.07: ["2 15 3", "1 17 4", "2 16 3"],
        },
        сердце: { 20.08: ["4 35 4", "3 33 2"] },
      },
    },

    Вкусмясина: {
      собаки: {
        печень: { 14.06: ["2 11 5", "2 29 5", "2 29 6"], 27.06: ["1 22 4"] },
        потрошки: { "07.08": ["2 30 3", "1 40 4"] },
      },
    },
  },
  240: {
    "Платиновая линия": {
      собаки: {
        "желудочки куриные": {
          12.08: ["3 41 5", "4 38 2"],
          24.06: ["3 45 3", "4 39 2", "3 35 4"],
        },
        рубец: { "09.08": ["4 45 5", "3 43 3"] },
      },
    },
  },
  100: {
    "Золотая линия": {
      собаки: {
        утка: {
          11.07: ["3 41 5", "4 38 2"],
          22.08: ["3 45 3", "4 39 2", "3 35 4"],
        },
        страус: { "06.07": ["2 45 5", "3 43 3"] },
        индейка: { "04.08": ["4 45 5", "3 43 3"] },
      },
    },
    Вкусмясина: {
      щенки: {
        говядина: { 14.06: ["2 11 5", "2 29 5", "2 29 6"], 27.06: ["1 22 4"] },
        индейка: { "07.08": ["2 30 3", "1 40 4"] },
      },
    },
    МА: {
      кошки: {
        курица: {
          19.07: ["1 14 5", "2 14 5"],
          13.07: ["2 16 4", "1 19 3", "1 25 6"],
        },
        говядина: { 15.07: ["1 35 4", "2 33 2"] },
      },
      собаки: {
        потрошки: {
          10.08: ["1 13 6", "2 12 6"],
          14.07: ["2 15 3", "1 17 4", "2 16 3"],
        },
        сердце: { 20.08: ["4 35 4", "3 33 2"] },
      },
    },
  },
};

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

let currentUser = 0;
let obj = DB;
let adress = [];
let objCopy = [];
let cell = "";
let selectedPosition = [];
let cellDone = [];

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
  if (e.target.className === "progress") return;
  if (e.target.className === "exit") {
    app.classList.add("invisible");
    user.textContent = "Вы вошли в роли: ";
    loginPanel.classList.remove("invisible");
    currentUser = 0;
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
    if (currentUser === 2) {
      if (e.target.textContent === "нет") {
        posName.textContent = "";
        question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition.forEach((i) => obj.push(i[5]));
        displayButtons();
        return;
      }
      if (e.target.textContent === "да") {
        posName.textContent = "";
        question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition = selectedPosition.filter((i) => i[5] !== cellDone[5]);
        selectedPosition.forEach((i) => obj.push(i[5]));
        displayButtons();
        if (selectedPosition.length === 0) question.textContent = "Заданий нет";
        return;
      }
      cellDone = selectedPosition.find((i) => i[5] === e.target.textContent);
      cellDone.forEach((i) => (posName.textContent += i + "  >>  "));
      question.textContent = "Данная позиция снята ?";
      obj = ["да", "нет"];
      displayButtons();
      return;
    }
    if (e.target.className === "login") {
      if (inputLogin.value === "1") {
        queue.innerHTML = "";
        selectedPosition.forEach((i) => addButton(i[5], queue));
        loginPanel.classList.add("invisible");
        app.classList.remove("invisible");
        user.textContent += "кладовщик";
        butReset.classList.remove("invisible");
        currentUser = 1;
        obj = DB;
        question.textContent = "Введите параметы позиции:";
        displayButtons();
      }
      if (inputLogin.value === "2") {
        queue.innerHTML = "";
        loginPanel.classList.add("invisible");
        app.classList.remove("invisible");
        user.textContent += "водитель ричтрака";
        butReset.classList.add("invisible");
        currentUser = 2;
        if (selectedPosition.length === 0) {
          question.textContent = "Заданий нет";
        } else question.textContent = "Текущие задания:";
        obj = [];
        selectedPosition.forEach((i) => obj.push(i[5]));
        displayButtons();
      }
      return;
    }
    if (currentUser === 2) {
      return;
    }
    if (Array.isArray(obj)) {
      if (e.target.textContent === "да") {
        question.textContent = "Введите параметы позиции:";
        adress.push(
          ...objCopy.splice(
            objCopy.findIndex((i) => i === cell),
            1
          )
        );
        selectedPosition.push(adress);
        queue.innerHTML = "";
        selectedPosition.forEach((i) => addButton(i[5], queue));
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
      objCopy = obj;
      cell = e.target.textContent;
      question.textContent = "Проверьте и подтвердите выбор";
      obj = ["да", "нет"];
      posName.textContent += e.target.textContent;
      displayButtons();
      return;
    }
    obj = obj[e.target.textContent];
    displayButtons();
    adress.push(e.target.textContent);
    posName.textContent += e.target.textContent + "  >>  ";
  }
});

function addButton(text, parent) {
  const newBut = document.createElement("button");
  newBut.style.marginRight = "5px";
  newBut.innerHTML = text;
  if (parent) {
    newBut.className = "progress";
    parent.append(newBut);
  } else buttons.append(newBut);
}
