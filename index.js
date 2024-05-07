async function loadNames() {
    var propertyName = "id";
    const response = await fetch('content.json');
    const names = await response.json();
    
    console.log(names.users[0][propertyName]); 
}

loadNames();



var btn_open = document.querySelectorAll(".open");
var modal = document.querySelector(".modal");
var btn_close = document.querySelector(".close");
var i = 0;

while (i < btn_open.length)
{
    var btn_open_icon = btn_open[i].querySelector("i");
    btn_open[i].addEventListener("mouseover", function (e) {
        this.classList.add("fa-shake");
    });

    btn_open[i].addEventListener("mouseout", function (e) {
        this.classList.remove("fa-shake");
    });

    btn_open[i].addEventListener("click", function (e) {
        modal.style.display = "block";
    });
i++;
}

btn_close.addEventListener("click", function ()
{
    modal.style.display = "none";
})

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
                if (btn_menu[indx_menu].innerHTML == "ABOUT")
                {
                    while (indx_grid < grid_item.length)
                    {
                        if (!grid_item[indx_grid].classList.contains("about"))
                        {
                            console.log("nono");
                            grid_item[indx_grid].classList.add("grid-item-unselected");
                        }
                        indx_grid++;
                    }
                }
                else if (btn_menu[indx_menu].innerHTML == "WORK")
                {
                    while (indx_grid < grid_item.length)
                    {
                        if (!grid_item[indx_grid].classList.contains("work"))
                        {
                            console.log("nono");
                            grid_item[indx_grid].classList.add("grid-item-unselected");
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
