const hover_icons = document.querySelectorAll(".hover_icon");
const make_dark = function(){
    console.log(this.style.backgroundColor,"l");
    this.innerText="pp";
    let x=(window.getComputedStyle(this).backgroundColor);
    let y =((x).slice(0,-4));
    this.style.backgroundColor=y+" 1.0)";
    
}
hover_icons.forEach((item)=>item.addEventListener("onmouseenter",make_dark));

