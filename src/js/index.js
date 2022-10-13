let itemsArray = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];
localStorage.setItem("todoList", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("todoList"));

const ulDom = document.querySelector("ul");
const inputDom = document.getElementById("myInput");

const liMaker = (text) => {
  const li = document.createElement("li");
  li.textContent = text.text;
  li.className = text.class;
  const span = document.createElement("SPAN");
  span.className = "close";
  li.appendChild(span);
  ulDom.appendChild(li);

  var closeDom = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < closeDom.length; i++) {
    closeDom[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      let textContent = div.textContent;
      let index = itemsArray.findIndex((x) => x.text === textContent);
      itemsArray.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(itemsArray));
    };
  }
  localStorage.setItem("todoList", JSON.stringify(itemsArray));
};
data.forEach((item) => {
  liMaker(item);
});

// Create a new list item when clicking on the "Add" button
const addNewTask = () => {
  const inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    itemsArray.push({ text: inputValue, class: "" });
    liMaker({ text: inputValue, class: "" });
  }
  document.getElementById("myInput").value = "";
};

// Trigger a button click on keyboard "enter"
inputDom.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTask();
  }
});

// Add a "checked" symbol when clicking on a list item
ulDom.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {      
      let textContent = ev.target.textContent;
      if (ev.target.className === "") {
        ev.target.classList.toggle("checked");
        let index = itemsArray.findIndex((x) => x.text === textContent);
        itemsArray[index].class = "checked";
        localStorage.setItem("todoList", JSON.stringify(itemsArray));
      } else {
        ev.target.classList.toggle("checked");
        let index = itemsArray.findIndex((x) => x.text === textContent);
        itemsArray[index].class = "";
        localStorage.setItem("todoList", JSON.stringify(itemsArray));
      }
    }
  },
  false
);
