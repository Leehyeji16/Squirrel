
let particlesRunning = false;

function randomBetween(min, max) { return Math.random() * (max - min) + min; }

function startParticles() {
    if (particlesRunning) return;
    particlesRunning = true;

    const wrap = document.getElementById('particleOverlay');
    wrap.classList.remove('particles-paused');
    wrap.innerHTML = '';

    // 화면 크기에 따라 개수 자동 조절(자유롭게 조정)
    const area = window.innerWidth * window.innerHeight;
    const count = Math.max(60, Math.min(160, Math.floor(area / 20000)));

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');

        // 타입 랜덤
        const t = ['firefly', 'dust', 'magic'][Math.floor(Math.random() * 3)];
        el.className = `particle ${t}`;

        // 크기
        const size = randomBetween(3, 8); // px
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;

        // 시작 x, y
        el.style.left = `${Math.random() * 100}vw`;
        // 위쪽/중간 다양한 위치에서 시작하도록 음수~양수
        el.style.top = `${randomBetween(-15, 30)}vh`;

        // 낙하 지속시간 / 지연 랜덤 => 꾸준히 분산되어 떨어짐
        const dur = randomBetween(6, 12); // 초
        const delay = -randomBetween(0, dur); // 음수 delay로 즉시 디스퍼스
        el.style.animationDuration = `${dur}s`;
        el.style.animationDelay = `${delay}s`;

        // 좌우 바람(드리프트)
        el.style.setProperty('--drift', `${randomBetween(-80, 80)}px`);

        wrap.appendChild(el);

        // 각 반복이 끝날 때 시작점 랜덤 재할당(무한 변주)
        el.addEventListener('animationiteration', () => {
            el.style.left = `${Math.random() * 100}vw`;
            el.style.setProperty('--drift', `${randomBetween(-80, 80)}px`);
            el.style.animationDuration = `${randomBetween(6, 12)}s`;
        });
    }

    // 리사이즈 시 부드럽게 리빌드
    window.addEventListener('resize', restartParticles, { once: true });
}

function stopParticles() {
    if (!particlesRunning) return;
    particlesRunning = false;

    const wrap = document.getElementById('particleOverlay');
    // 애니메이션 즉시 멈춤(퍼포먼스 절약)
    wrap.classList.add('particles-paused');
    wrap.innerHTML = '';
}

function restartParticles() {
    stopParticles();
    startParticles();
}

/* 섹션 전환: 1이면 파티클 켜고, 그 외는 끄기 */
function goToSection(n) {
    document.querySelector('.daram_box').classList.add('active');

    setTimeout(function(){                
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section' + n).classList.add('active');

        if (n === 1) {
            restartParticles();   // 다시 시작
        } else {
            stopParticles();      // 다른 섹션에서는 중지
        };

        $('#section1').fadeOut()
        $('#section2').fadeIn()
    },4000);
}

/* 최초 section1 진입 시 시작 */
window.addEventListener('load', startParticles);


let part2 = 0
$('#section2 .circle_box li').mouseover(function(){
    part2++
    if(part2 >= 3){
        $('.dotory2').addClass('on')
    }
    let part2Img = $(this).find('img').attr('src');
    let partImgAlt = $(this).find('img').attr('alt');
    $('#section2 .thumb').hide().fadeIn(500);
    $('#section2 .thumb').find('img').attr('src',part2Img);
    $('#section2 .thumb').find('figcaption').text(partImgAlt);
    $('#section2').addClass('on');
})
$('#section2 li').mouseout(function(){
    $('#section2').removeClass('on');
});



window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (
      e.key === '+' || 
      e.key === '-' || 
      e.key === '=' || 
      e.key === '0'
    )) {
      e.preventDefault();
    }
  });

