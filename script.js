// script.js
// 이번 요청에서는 JavaScript 코드 변경이 필요하지 않습니다.
// 기존 언어 전환 및 슬라이더 기능은 그대로 유지됩니다.

// DOM 콘텐츠 로드가 완료되면 스크립트 실행
(() => {

    // --- 언어 전환 기능 ---
    const langToggleButton = document.getElementById('lang-toggle'); // 언어 전환 버튼 요소 가져오기
    const htmlTag = document.documentElement; // HTML 최상위 요소 가져오기

    /**
     * 페이지 언어를 설정하고 UI를 업데이트합니다.
     * @param {string} lang - 설정할 언어 코드 ('ko' 또는 'en').
     */
    function setLanguage(lang) {
        // <html> 태그의 lang 속성 설정
        htmlTag.setAttribute('lang', lang);

        // 버튼 텍스트를 현재 언어의 *반대* 언어로 업데이트
        if (langToggleButton) { // 버튼이 존재하는지 확인
             langToggleButton.textContent = lang === 'ko' ? 'English' : '한국어';
        }

        // 페이지 제목 업데이트 (선택 사항)
        const titleKo = '이노픽스 애니메이션 스튜디오';
        const titleEn = 'Innofix Animation Studio';
        document.title = lang === 'ko' ? titleKo : titleEn;

        // 한국어/영어 텍스트를 가진 모든 span 요소 가져오기
        const langSpansKo = document.querySelectorAll('[data-lang="ko"]');
        const langSpansEn = document.querySelectorAll('[data-lang="en"]');

        // 선택된 언어에 따라 요소 표시/숨김 처리
        if (lang === 'ko') {
            // 한국어 표시, 영어 숨김
            langSpansKo.forEach(span => span.style.display = ''); // 기본 display 속성으로 복원
            langSpansEn.forEach(span => span.style.display = 'none');
        } else {
            // 한국어 숨김, 영어 표시
            langSpansKo.forEach(span => span.style.display = 'none');
            langSpansEn.forEach(span => span.style.display = ''); // 기본 display 속성으로 복원
        }
    }

    /**
     * 언어를 한국어('ko')와 영어('en') 사이에서 전환합니다.
     */
    function toggleLanguage() {
        // 현재 언어 가져오기 (기본값 'ko')
        const currentLang = htmlTag.getAttribute('lang') || 'ko';
        // 새 언어 결정
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        // 새 언어 적용
        setLanguage(newLang);
    }

    // 언어 전환 버튼에 클릭 이벤트 리스너 추가
    if (langToggleButton) { // 버튼이 존재하는지 확인
        langToggleButton.addEventListener('click', toggleLanguage);
    }

    // 페이지 로드 시 초기 언어 설정 (HTML 태그의 lang 속성 기준, 기본값 'en')
    const initialLang = htmlTag.getAttribute('lang') || 'en';
    setLanguage(initialLang);


    // --- 스튜디오 이미지 슬라이더 기능 ---
    const sliderContainer = document.querySelector('.slider-container'); // 슬라이더 컨테이너 요소 가져오기

    // 슬라이더 컨테이너가 페이지에 존재하는 경우에만 슬라이더 로직 실행
    if (sliderContainer) {
        const slides = sliderContainer.querySelector('.slides'); // 슬라이드 래퍼 요소
        const slideElements = sliderContainer.querySelectorAll('.slide'); // 개별 슬라이드 요소들 (NodeList)
        const prevButton = sliderContainer.querySelector('.prev-btn'); // 이전 버튼
        const nextButton = sliderContainer.querySelector('.next-btn'); // 다음 버튼

        let currentIndex = 0; // 현재 보이는 슬라이드의 인덱스 (0부터 시작)
        const totalSlides = slideElements.length; // 전체 슬라이드 개수

        /**
         * 지정된 인덱스의 슬라이드를 보여줍니다.
         * @param {number} index - 보여줄 슬라이드의 인덱스.
         */
        function showSlide(index) {
            // translateX 값을 계산하여 슬라이드 이동 (-index * 100%)
            const translateValue = -index * 100;
            // slides 요소의 transform 스타일을 변경하여 슬라이드 이동 효과 적용
            slides.style.transform = `translateX(${translateValue}%)`;
        }

        /**
         * 다음 슬라이드로 이동합니다.
         */
        function nextSlide() {
            // 다음 인덱스 계산 (마지막 슬라이드면 처음으로 순환)
            currentIndex = (currentIndex + 1) % totalSlides;
            // 계산된 인덱스의 슬라이드 표시
            showSlide(currentIndex);
        }

        /**
         * 이전 슬라이드로 이동합니다.
         */
        function prevSlide() {
            // 이전 인덱스 계산 (첫 슬라이드면 마지막으로 순환)
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            // 계산된 인덱스의 슬라이드 표시
            showSlide(currentIndex);
        }

        // 네비게이션 버튼에 클릭 이벤트 리스너 추가
        if (nextButton) { // 다음 버튼이 존재하는지 확인
            nextButton.addEventListener('click', nextSlide);
        }
        if (prevButton) { // 이전 버튼이 존재하는지 확인
            prevButton.addEventListener('click', prevSlide);
        }

        // 슬라이더 초기화: 첫 번째 슬라이드를 표시 (슬라이드가 하나 이상 있을 경우)
        if (totalSlides > 0) {
             showSlide(currentIndex);
        }
    } // End of if (sliderContainer) check

    const portfolioGrid = document.getElementById("portfolio-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // 이미지 경로 설정
    const images = {
        all: [
            ...getImagesFromFolder("works/2D Animation [Oem]"),
            ...getImagesFromFolder("works/Cutout Animation [Oem]")
        ],
        D: getImagesFromFolder("works/2D Animation [Oem]"), 
        cutout: getImagesFromFolder("works/Cutout Animation [Oem]")
    };

    // 초기 로드: 전체 이미지 표시
    displayImages(images.all);

    // 필터 버튼 클릭 이벤트
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // 버튼 활성화 상태 업데이트
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 필터에 따라 이미지 표시
            displayImages(images[filter]);
        });
    });

    // 이미지 표시 함수
    function displayImages(imagePaths) {
        portfolioGrid.innerHTML = ""; // 기존 이미지 제거
        imagePaths.forEach(path => {
            const img = document.createElement("img");
            img.src = path;
            img.alt = "Portfolio Image";
            img.classList.add("portfolio-image");
            portfolioGrid.appendChild(img);
        });
    }

    function getImagesFromFolder(folder) {
        if (folder === "works/2D Animation [Oem]") {
            return [
                "works/2D Animation [Oem]/2009 Changcheon Route (蒼天航路).jpg",
                "works/2D Animation [Oem]/2010 Stitch.jpg",
                "works/2D Animation [Oem]/2012 Justice League.jpg",
                "works/2D Animation [Oem]/2013 Ben10.jpg",
                "works/2D Animation [Oem]/2015 Beast Saga (ビーストサーガ).jpg",
                "works/2D Animation [Oem]/2017 Castlevania.jpg",
                "works/2D Animation [Oem]/2019 Avengers.jpg",
                "works/2D Animation [Oem]/2020 The Haunted House.jpg",
                "works/2D Animation [Oem]/2023 Scavengers Reign.jpg",
                "works/2D Animation [Oem]/2024 Himitsu no AiPri (ひみつのアイプリ).jpg",
                "works/2D Animation [Oem]/2009 Dungeon & Fighter (ダンジョン＆ファイター).jpg",
                "works/2D Animation [Oem]/2010 Zevo.jpg",
                "works/2D Animation [Oem]/2012 Kaijudo.jpg",
                "works/2D Animation [Oem]/2013 Nagi no Asukara (凪のあすから).jpg",
                "works/2D Animation [Oem]/2015 Black Dynamite.jpg",
                "works/2D Animation [Oem]/2018 Free para (プリパラ).jpg",
                "works/2D Animation [Oem]/2019 Sparkling Free☆ Channel (キラッとプリ☆チャン).jpg",
                "works/2D Animation [Oem]/2021 Ark.jpg",
                "works/2D Animation [Oem]/2023 Spider Man.jpg",
                "works/2D Animation [Oem]/2024 Invincible.jpg",
                "works/2D Animation [Oem]/2009 Little Superhero.jpg",
                "works/2D Animation [Oem]/2011 Leafie, A Hen into the Wild.jpg",
                "works/2D Animation [Oem]/2012 Papa no Iukoto wo Kikinasai! (イウコトウキキナサイ！).jpg",
                "works/2D Animation [Oem]/2013 Turbo.jpg",
                "works/2D Animation [Oem]/2015 Mahou Shoujo Tokushusen Asuka (魔法少女特殊戦あすか).jpg",
                "works/2D Animation [Oem]/2018 Nobunaga-sensei no Osanazuma (ノブナガ先生の幼な妻).jpg",
                "works/2D Animation [Oem]/2019 Underdog.jpg",
                "works/2D Animation [Oem]/2023 Family Guy.jpg",
                "works/2D Animation [Oem]/2023 X-men.jpg",
                "works/2D Animation [Oem]/2024 Superman.jpg",
                "works/2D Animation [Oem]/2010 Heroman (ヒーローマン).jpg",
                "works/2D Animation [Oem]/2012 Detective Conan (名探偵コナン).jpg",
                "works/2D Animation [Oem]/2012 Wizard Boy Mutterl.jpg",
                "works/2D Animation [Oem]/2014 Yoo Hee Wang (遊 戯 王).jpg",
                "works/2D Animation [Oem]/2015 Plastic Memories (プラスティック・メモリーズ).jpg",
                "works/2D Animation [Oem]/2018 Scooby Doo.jpg",
                "works/2D Animation [Oem]/2020 Hulk.jpg",
                "works/2D Animation [Oem]/2023 Harley Quinn.jpg",
                "works/2D Animation [Oem]/2024 Betman.jpg"
            ];
        } else if (folder === "works/Cutout Animation [Oem]") {
            return [
                "works/Cutout Animation [Oem]/001 Larva.jpg",
                "works/Cutout Animation [Oem]/002 A Kind of Magic.jpg",
                "works/Cutout Animation [Oem]/003 Hero.jpg",
                "works/Cutout Animation [Oem]/005 Ninja Hottori County (忍者ハットリくん).jpg"
            ];
        }
        return [];
    }

    // ...existing code...
// Hamburger menu toggle
    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.getElementById('hamburger-menu');
        const nav = document.querySelector('nav');
        hamburger.addEventListener('click', function () {
            nav.classList.toggle('open');
        });

        // Optional: close menu when clicking outside or on a link
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('open');
            }
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    });
// ...existing code...

})(); // End of DOMContentLoaded event listener



