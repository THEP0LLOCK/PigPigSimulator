// script.js

const animalImage = document.getElementById("animal-image");
const feedButton = document.getElementById("FeedButton");
const playButton = document.getElementById("PlayButton");
const hitButton = document.getElementById("HitButton");
const statusTitle = document.getElementById("Status");
const feedSound = document.getElementById("feed-sound"); // 먹이 주기 버튼용 소리
const playSound = document.getElementById("play-sound"); // 놀아주기 버튼용 소리
const hitSound = document.getElementById("hit-sound");   // 존나 패기 버튼용 소리\
const endSound = document.getElementById("end-sound");   // 존나 패기 버튼용 소리
const hungerGauge = document.getElementById("hunger-gauge");
const hungerC = document.getElementById("hunger-container");

const animal = {
    name: "주용이",
    hunger: 0,
    happiness: 50,
    health: 100
};

function hideButtons() {
    feedButton.style.display = "none";
    playButton.style.display = "none";
    hitButton.style.display = "none";
    hungerC.style.display = "none";
}
// 화면 흔들기 함수
function shakeScreen() {
    const container = document.getElementById("container");
    container.classList.add("shake-animation");

    setTimeout(() => {
        container.classList.remove("shake-animation");
    }, 1000); // 3초 동안 흔들리는 효과를 유지
}

// 동물 상태 업데이트 함수
function updateAnimalStatus() {
    if (animal.hunger < 30) {
        animalImage.src = "./hungry.jpg"; // Change to a happy image
        statusTitle.innerText = "아기 주용이는 배가 고파요..ㅠㅠ";
    } else if (31 < animal.hunger && animal.hunger < 80) {
        animalImage.src = "./normal.jpg"; // Change to an angry image
        statusTitle.innerText = "아기 주용이는 배가 조금 찼어요..!";
    } else if (81 < animal.hunger && animal.hunger < 89){
        animalImage.src = "./happy.jpg"; // Default to normal image
        statusTitle.innerText = "아기 주용이는 행복하노@!!!!";
    }
    else if (animal.hunger==100){
        animalImage.src = "./realpig.png"; // Default to normal image
        statusTitle.innerText = "주용이는 진화했다!!!!!!!!!!!!!!!!!";
        endSound.play();
        shakeScreen(); // 화면 흔들기 효과 적용
        document.body.style.backgroundColor = "pink";
        shakeScreen();
        
    }


    hungerGauge.style.width = `${animal.hunger}%`;

    // 존나 패기 버튼 클릭 시 배경색 변경 및 화면 흔들기 효과
    if (event.target === hitButton) {
        shakeScreen(); // 화면 흔들기 효과 적용
        hitSound.play(); // 소리 재생
    }
}

// 먹이 주기 버튼 클릭 이벤트 처리
feedButton.addEventListener("click", () => {
    if (animal.hunger < 100) {
        animal.hunger += 5;
        updateAnimalStatus();
        feedSound.play();
        
    }
    if (animal.hunger >= 100) {
        hideButtons();
    }
});

playButton.addEventListener("click", () => {
    if (animal.happiness < 100) {
        // Check if the animation is not already running
        if (!animalImage.style.animation) {
            animalImage.style.animation = "rotateImage 2s linear"; // 2초 동안 회전 애니메이션 적용
            playSound.play();
            animalImage.addEventListener("animationend", () => {
                animalImage.style.animation = ""; // Reset the animation
            });
        }
        animal.hunger -= 20;
        updateAnimalStatus();
    }
});

// 존나 패기 버튼 클릭 이벤트 처리
hitButton.addEventListener("click", () => {
    if (animal.health > 0) {
        animal.hunger = 0;
        updateAnimalStatus();
    }
});

// 초기 상태 업데이트
updateAnimalStatus();
