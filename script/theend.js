endBtn = document.querySelector(".theend");
body = document.querySelector("body");
endBox = document.querySelector(".end");
endBackground = document.querySelector(".end-container");
p = document.querySelector(".end-message p");
messages = ['Dẫu cho quá khứ là điều ta không thể quay lại.',
    'Ký ức của mỗi con người là khác nhau.',
    'Nhưng giữa chúng ta sẽ lưu giữ có một phần nào đấy tốt đẹp về người kia.',
    'Và những thứ tốt đẹp nhất',
    'Sẽ trở thành kỉ niệm.',
    'Đây có lẽ là món quà cuối cùng.',
    'Cảm ơn bà vì quãng thời gian qua mà tôi không còn cảm thấy cô đơn nữa.',
    'Thank you.',
]

const duration = 3000;
let index = 0;

function displayText(){
    p.textContent = messages[index];
    if(index == messages.length - 1){
        endBackground.classList.add("active");
        return;
    }
    index++;
    setTimeout(displayText, duration);
}

endBtn.addEventListener("click", ()=>{
    body.classList.add("active");
    endBox.classList.add("active");
    setTimeout(()=>{
        displayText();
    }, 3000);
})