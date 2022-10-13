let itemsArray = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [
      {
        text: "Take kids from school.",
        class: "",
      },
      {
        text: "Don't forget to watch the new episode of Rings of Power.",
        class: "checked",
      },
      {
        text: "Pay house tax. It has until the 15th day of the month.",
        class: "checked",
      },
      {
        text: "Make preparations for the meeting to be held at 4 o'clock for the company to recruit workers.",
        class: "",
      },
      {
        text: "Buy 1kg of apples and 500g of carrots from the market.",
        class: "",
      },
      {
        text: "All the burdens pf the world will be placed on them",
        class: "",
      },
      {
        text: "Set notifications close time interval in slack",
        class: "checked",
      },
    ];
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
