const sections = document.querySelectorAll(".section");
const secBtns = document.querySelectorAll(".controls");
const secBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

function PageTransitions(){
    //activate button on click
    for(let i=0 ; i<secBtn.length ; i++){
        // secBtn[i].addEventListener("click",(e)=>{
        //     let currentBtn = document.querySelector(".active-btn");
        //     currentBtn.className = currentBtn.className.replace("active-btn","");
        //     console.log(e);
        //     e.target.className += " active-btn";
        //     console.log("he");
        // })
        secBtn[i].addEventListener("click",function(e){
            let currentBtn = document.querySelector(".active-btn");
            currentBtn.className = currentBtn.className.replace(" active-btn","");
            console.log(e);
            this.className += " active-btn";
            console.log("he");
        })
    }

    //section activate
    allSections.addEventListener("click",e=>{
        const type = e.target.dataset.type;
        if(type){
            //remove selected from other buttons
            secBtns.forEach((btn)=>{
                btn.classList.remove("active");
            })
            e.target.classList.add("active"); 

            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove("active");
            })

            const element = document.getElementById(type);
            element.classList.add("active"); 

        }
    }) 

    //toggle themes
    const themeBtn=document.querySelector(".theme-btn");
    themeBtn.addEventListener("click",()=>{
        let element = document.body;
        element.classList.toggle("light-mode");
    })
}
PageTransitions();