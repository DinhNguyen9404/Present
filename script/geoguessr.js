let panorama;
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const reviewText = document.querySelector(".review");
const score = document.querySelector(".score");
const next = document.querySelector(".next");
let currScore = 0;
let currLocationIndex = 0;
let enableInput = true;

let places =[
    [{lat: 43.317272, lng: 11.328375}, {country: "Italy"}],
    [{lat: 48.860668, lng: 2.291631}, {country: "France"}],
    [{lat: 34.769052, lng: 135.311745}, {country: "Japan"}],
    [{lat: 40.759410, lng: -73.985056}, {country: "America"}],
    [{lat: 55.753850, lng: 37.620338}, {country: "Russia"}],
    [{lat: 29.974377, lng: 31.140075}, {country: "Egypt"}],
    [{lat: 10.778145, lng: 106.696470}, {country: "Vietnam"}],
]

let currLocation = places[currLocationIndex];
let coordinates = currLocation[0];
let Country = currLocation[1].country;

input.onfocus = ()=>{
    if(!enableInput){
        input.blur();
    }
}

function resetState(){
    input.value = '';
    next.style.display = "none";
    reviewText.innerHTML = '';
    currLocation = places[currLocationIndex];
    coordinates = currLocation[0];
    Country = currLocation[1].country;
    initialize();
}

submitBtn.addEventListener("click", ()=>{
    if(input.value == ''){
        reviewText.innerHTML = "Nhập đáp án chưa đấy?";
        return;
    }
    else if(input.value === Country){
        enableInput = false;
        submitBtn.disabled = true;
        reviewText.innerHTML = Math.random() > 0.5 ? "Ghê đấy" : "Chính xác!";
        currScore++;
        score.innerHTML = `${currScore}/7`;
        if(currScore == 7){
            score.style = "color: gold";
            reviewText.innerHTML = "Không thể tin được";
            setTimeout(()=>{
                document.querySelector(".continue-container").style.display = "block";
            }, 1000);
        }
        else{
            next.style.display = "block";
        }
    }
    else{
        reviewText.innerHTML = Math.random() > 0.5 ? "Sai rồi bạn êy" : "Tra google không chuẩn r";
    }
})

next.addEventListener("click", ()=>{
    submitBtn.disabled = false;
    currLocationIndex++;
    enableInput= true;
    resetState();
})


function initialize() {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view"),
    {
      position: coordinates,
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
    },
  );
}


window.initialize = initialize;