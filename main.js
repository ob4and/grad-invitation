function getRnd(max, min = 0) {
    // return Math.floor(Math.random() * max) + min;
    return Math.floor(Math.random() * (max - min)) + min;
}

function ball(rnd_time, getColor) {
    const el = document.createElement("div");
    // console.log(rnd_color);
    const color = getColor();
    el.classList.add("ball");

     // 원래 색상을 데이터 속성으로 저장
    el.setAttribute("data-color", color);

    // 배경색을 linear-gradient로 설정
    el.style.backgroundImage = `linear-gradient(to bottom, ${color} 0%, rgba(0,0,0,0) 100%)`;

    const keyframes = [
        { bottom: "-10rem" },
        { bottom: "100%" },
    ];

    el.animate(keyframes, {
        duration: rnd_time,
        easing: "ease-in",
        iterations: Infinity,
    });

    // el.addEventListener("mouseenter", function(e) {
    //     document.body.style.backgroundColor = e.target.style.backgroundColor;
    // });

    // el.addEventListener("click", function(e) {
    //     document.body.style.backgroundColor = e.target.style.backgroundColor;
    // });

    // 이벤트 핸들러에서 데이터 속성의 색상을 참조
    el.addEventListener("mouseenter", function(e) {
        document.body.style.backgroundColor = e.target.getAttribute("data-color");
    });

    el.addEventListener("click", function(e) {
        document.body.style.backgroundColor = e.target.getAttribute("data-color");
    });

    return el;
}

function col() {
    const div = document.createElement("div");
    div.style.height = "100%";
    div.className = "column";
    return div;
}


function rnd_color(colorCounts) {
    const colors = [
        "#f4f4f4", // gray
        "#4DFF9D", // green1
        "#4DFF9D", // green2
        "#FFA0E0", // pink1
        "#FFA0E0", // pink2
        "#EFFF55", // yellow
        "#00D5FF", // blue
        "#a39dec", // violet
    ];

    let availableColors = colors.filter(color => colorCounts[color] < 4);
    if (availableColors.length === 0) {
        // 모든 색상이 4번 이상 선택된 경우 초기화
        colorCounts = {};
        availableColors = colors;
    }
    const rnd = getRnd(availableColors.length);
    const selectedColor = availableColors[rnd];
    colorCounts[selectedColor] = (colorCounts[selectedColor] || 0) + 1;
    return selectedColor;
}


const BALL_COUNT = 9;
const colorCounts = {}; // 색상 선택을 추적하기 위한 객체
const root = document.getElementById("balls-container");

for (let i = 0; i < BALL_COUNT; i++) {
    const rnd_time = getRnd(8000, 5000);

    const column = col();
    const _ball = ball(rnd_time, () => rnd_color(colorCounts));
    column.appendChild(_ball);
    root.appendChild(column);

    setInterval(() => {
        const r = getRnd(100);
        _ball.style.marginLeft = `${r}%`;
        

        // 새 색상을 무작위로 선택하고 데이터 속성 및 배경색을 업데이트
        const new_color = rnd_color(colorCounts);
        _ball.setAttribute("data-color", new_color);
        _ball.style.backgroundImage = `linear-gradient(to bottom, ${new_color} 0%, rgba(0,0,0,0) 100%)`;

        // 공의 크기를 무작위로 변경
        const sizes = [1.2, 1, 0.8, 0.6];
        const rnd_size = sizes[getRnd(sizes.length)];
        _ball.style.transform = `scale(${rnd_size})`;
    }, rnd_time);
}
