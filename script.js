// script.js

// DOM 콘텐츠 로드가 완료되면 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {

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

    // 페이지 로드 시 초기 언어 설정 (HTML 태그의 lang 속성 기준, 기본값 'ko')
    const initialLang = htmlTag.getAttribute('lang') || 'ko';
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

}); // End of DOMContentLoaded event listener
