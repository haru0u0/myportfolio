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
    const response = await fetch('content.json');
    const contents = await response.json();
    var grid_item2 = document.querySelectorAll(".withtext");
    var indx_grid2 = 0;
    
    while (indx_grid2 < grid_item2.length) {
        var title = grid_item2[indx_grid2].getAttribute("id");
        var indx_content = 0;
        while (indx_content < grid_item2.length) {
            if (title == contents.overviews[indx_content].title)
            {
                grid_item2[indx_grid2].querySelector(".overview").innerHTML = contents.overviews[indx_grid2][selected_lang];
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
    console.log("icon_hover:"+this);
    this.classList.add("fa-shake", "open_hovered");
}

function icon_hover_bind() {
    icon_hover.bind(this)();
}

while (indx_btn < btn_open.length)
{
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

btn_close.addEventListener("click", function ()
{
    modal.style.display = "none";
})

//filtering

var btn_menu = document.querySelectorAll("#menu>*>.grid-item");
var grid_item_work = document.querySelectorAll(".work");
var grid_item_about = document.querySelectorAll(".about");
var grid_item = document.querySelectorAll("#main>.grid-item");
var indx_menu = 0;
var indx_grid = 0;

while (indx_menu < btn_menu.length)
{
    btn_menu[indx_menu].addEventListener("click", function ()
    {
        var clicked = this;
        indx_menu = 0;
        indx_grid = 0;

        while (indx_grid < grid_item.length)
        {
            grid_item[indx_grid].classList.remove("grid-item-unselected");
            var btn_open = grid_item[indx_grid].querySelector(".open");
            if (btn_open != null && btn_open.hasAttribute("disabled")) {
                btn_open.removeAttribute("disabled");
                btn_open.addEventListener("mouseover", icon_hover_bind);
            }
            indx_grid++;
        }

        while (indx_menu < btn_menu.length)
        {
            if (btn_menu[indx_menu] != clicked)
            {
                btn_menu[indx_menu].classList.remove("menu_item_active");
            }
            else
            {
                btn_menu[indx_menu].classList.add("menu_item_active");
                indx_grid = 0;
                if (btn_menu[indx_menu].innerHTML != "ALL")
                {
                    while (indx_grid < grid_item.length)
                    {
                        if (!grid_item[indx_grid].classList.contains(btn_menu[indx_menu].innerHTML.toLowerCase()))
                        {
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
            }
            indx_menu++;
        }
    })
    indx_menu++;
}
