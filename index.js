function toggleMenu() {
  const menu = document.getElementById("fullScreenMenu");
  const menubtn = document.getElementByClass("menu-btn");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    menubtn.style.display = "block";
  } else {
    menu.style.display = "block";
    menu.style.display = "none";
  }
}
