function toggleMenu() {
  const menu = document.getElementById("fullScreenMenu");
  const menubtn = document.querySelector(".menu-btn");
  const menuopenbtn = document.getElementById("menu-open-btn")
  if(getComputedStyle(menu).display === "block") {
    menu.style.display = "none";
    menubtn.style.display = "block";
    menuopenbtn.style.display = "block";
  } else {
    menu.style.display = "block";
    menubtn.style.display = "none";
    menuopenbtn.style.display = "none";
  }
}
