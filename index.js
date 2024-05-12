// lang switch
var selected_lang = "jp";
window.addEventListener("load", function () {
  setLang(selected_lang);
});

document.querySelector("input").addEventListener("change", function () {
  if (selected_lang == "jp") {
    selected_lang = "en";
  } else {
    selected_lang = "jp";
  }
  setLang(selected_lang);
});

async function setLang(selected_lang) {
  const response = await fetch("content.json");
  const contents = await response.json();
  var grid_item2 = document.querySelectorAll(".withtext");
  var toggle_lang = document.querySelector("#selected_lang");
  var indx_grid2 = 0;

  //design toggle
  toggle_lang.innerHTML = selected_lang.toUpperCase();

  //set content
  while (indx_grid2 < grid_item2.length) {
    var title = grid_item2[indx_grid2].getAttribute("id");
    var indx_content = 0;
    while (indx_content < grid_item2.length) {
      if (title == contents.overviews[indx_content].title) {
        grid_item2[indx_grid2].querySelector(".overview").innerHTML =
          contents.overviews[indx_grid2][selected_lang];
      }
      indx_content++;
    }
    indx_grid2++;
  }
}

//add open button interaction
var btn_open = document.querySelectorAll(".open");
var modal = document.querySelector(".modal");
var btn_close = document.querySelector(".close");
var indx_btn = 0;

function icon_hover() {
  this.classList.add("fa-shake", "open_hovered");
}

function icon_hover_bind() {
  icon_hover.bind(this)();
}

while (indx_btn < btn_open.length) {
  var btn_open_icon = btn_open[indx_btn].querySelector("i");
  btn_open[indx_btn].addEventListener("mouseover", icon_hover_bind);

  btn_open[indx_btn].addEventListener("mouseout", function (e) {
    this.classList.remove("fa-shake", "open_hovered");
  });

  btn_open[indx_btn].addEventListener("click", function (e) {
    modal.style.display = "block";
  });
  indx_btn++;
}

btn_close.addEventListener("click", function () {
  modal.style.display = "none";
});

//hover animation for grid-items

var work_grid_items = document.querySelectorAll(".work");
var work_grid_items_index = 0;

function grid_hover() {
  var children = this.querySelectorAll("*");
  var children_index = 0;
  while (children_index < children.length) {
    children[children_index].style.display = "block";
    children_index++;
  }
  this.style.backgroundImage = "none";
}

function grid_hover_bind() {
  grid_hover.bind(this)();
}

while (work_grid_items_index < work_grid_items.length) {
  work_grid_items[work_grid_items_index].addEventListener(
    "mouseover",
    grid_hover_bind
  );
  work_grid_items_index++;
}

/*
while (work_grid_items_index < work_grid_items.length) {
  work_grid_items[work_grid_items_index].addEventListener(
    "mouseover", 
    function () {
      var children = this.querySelectorAll("*");
      var children_index = 0;
      while (children_index < children.length) {
        children[children_index].style.display = "block";
        children_index++;
      }
      this.style.backgroundImage = "none";
    }
  );
  work_grid_items_index++;
}
*/

work_grid_items_index = 0;

while (work_grid_items_index < work_grid_items.length) {
  work_grid_items[work_grid_items_index].addEventListener(
    "mouseout",
    function () {
      var children = this.querySelectorAll(".content>*");
      var children_index = 0;
      while (children_index < children.length) {
        children[children_index].style.display = "none";
        children_index++;
      }
      this.style.backgroundImage = "";
    }
  );
  work_grid_items_index++;
}

/*
document.querySelector("#me").addEventListener("mouseout", function () {
    document.querySelector("#me>*").style.display = "none";
});
*/

//filtering

var btn_menu = document.querySelectorAll("#menu>*>.grid-item");
var grid_item_work = document.querySelectorAll(".work");
var grid_item_about = document.querySelectorAll(".about");
var grid_item = document.querySelectorAll("#main>.grid-item");
var indx_menu = 0;
var indx_grid = 0;
var indx_grid_item_work = 0;

while (indx_menu < btn_menu.length) {
  btn_menu[indx_menu].addEventListener("click", function () {
    var clicked = this;
    indx_menu = 0;
    indx_grid = 0;
    indx_grid_item_work = 0;

    while (indx_grid < grid_item.length) {
      grid_item[indx_grid].classList.remove("grid-item-unselected");
      var btn_open = grid_item[indx_grid].querySelector(".open");
      if (btn_open != null && btn_open.hasAttribute("disabled")) {
        btn_open.removeAttribute("disabled");
        btn_open.addEventListener("mouseover", icon_hover_bind);
      }
      indx_grid++;
    }
    while (indx_grid_item_work < grid_item_work.length) {
      grid_item_work[indx_grid_item_work].addEventListener(
        "mouseover",
        grid_hover_bind
      );
      indx_grid_item_work++;
    }

    while (indx_menu < btn_menu.length) {
      if (btn_menu[indx_menu] != clicked) {
        btn_menu[indx_menu].classList.remove("menu_item_active");
      } else {
        btn_menu[indx_menu].classList.add("menu_item_active");
        indx_grid = 0;
        indx_grid_item_work = 0;
        if (btn_menu[indx_menu].innerHTML != "ALL") {
          while (indx_grid < grid_item.length) {
            if (
              !grid_item[indx_grid].classList.contains(
                btn_menu[indx_menu].innerHTML.toLowerCase()
              )
            ) {
              grid_item[indx_grid].classList.add("grid-item-unselected");
              var btn_open_2 = grid_item[indx_grid].querySelector("button");
              if (btn_open_2 != null) {
                btn_open_2.setAttribute("disabled", "");
                btn_open_2.removeEventListener("mouseover", icon_hover_bind);
              }
            }
            indx_grid++;
          }
        }
        if (btn_menu[indx_menu].innerHTML == "ABOUT") {
          while (indx_grid_item_work < grid_item_work.length) {
            grid_item_work[indx_grid_item_work].removeEventListener(
              "mouseover",
              grid_hover_bind
            );
            indx_grid_item_work++;
          }
        }
      }
      indx_menu++;
    }
  });
  indx_menu++;
}
