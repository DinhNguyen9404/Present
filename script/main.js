let wrongCnt= 0;
const pass = document.getElementById("entrance-pass");
const verify = document.querySelector(".verify");
const popup = document.querySelectorAll(".pop-up");
const fake = document.querySelector(".fake-continue");
const real = document.querySelector(".continue");

verify.addEventListener("click", ()=>{
    if(pass.value != "0112358" || pass.value == ""){
        popup.forEach((pop) =>{
            pop.classList.remove("active");
        })
        popup[wrongCnt].classList.add("active");
        wrongCnt++;
        if(wrongCnt == 6){
            fake.classList.add("active");
            verify.style = "display : none";
        }
    }
    else{
        real.classList.add("active");
        popup.forEach((pop) =>{
            pop.classList.remove("active");
        })
        verify.style = "display : none";
    }
})




