const imgBtn = document.querySelector(".btn");
const key = document.querySelector(".secret span");

imgBtn.addEventListener("click", ()=>{
    key.classList.toggle("active");
})