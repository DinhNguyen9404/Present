const gates = document.querySelectorAll(".gate");
const input = document.querySelector(".key");
const verify = document.querySelector(".verify");
const text = document.querySelector(".Text");
const secret = document.querySelector(".reminder-gate");
let keys =['50021141', 'englishorspanish', '1890-1969', 'iDidNotCheat', 'ThereIsNoKey', 'aaaaaaaa', 'capybara', 'AIzaSyDhAb-_r3NZLE', 'finalchallenge'];

verify.addEventListener("click", ()=>{
    let find = false;
    console.log(input.value);
    if(input.value == ''){
        text.innerHTML = "Nhập key cái đã bạn ơi";
        setTimeout(()=>{
            text.innerHTML = '';
        }, 3000);
        return;
    }
    else{
        if(input.value == 'hiddenConfession'){
            secret.classList.add("active");
            return;
        }
        keys.forEach((key, index) =>{
            if(input.value == key){
                find = true;
                gates[index + 1].classList.add("active");
                return;
            }
        });
        if(!find){
            text.innerHTML = Math.random() > 0.5 ? 'Nhập sai rồi' : 'Trật lất!';
            setTimeout(() =>{
                text.innerHTML = '';
            }, 3000);
            input.value = '';
        }
    }
})
