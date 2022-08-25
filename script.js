var settingsmenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle(){
    settingsmenu.classList.toggle("settings-menu-height");
}
darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");
}

   if(localStorage.getItem("theme") == "light"){
    localStorage.setItem("theme", "light");
}
else{
     localStorage.setItem("theme", "light");
}

if(localStorage.getItem("theme") == "light"){
darkBtn.classList.remove("dark-btn-on");
document.body.classList.remove("dark-theme");
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
    }
 else{
    localStorage.setItem("theme", "light");
    }
function search() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('yoga');
   
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";                 
        }
    
    }
   
}







