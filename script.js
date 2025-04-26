document.addEventListener('DOMContentLoaded', () => {
    const langToggleButton = document.getElementById('lang-toggle');
    const htmlTag = document.documentElement;

    // Function to set the language and update UI
    function setLanguage(lang) {
        htmlTag.setAttribute('lang', lang);

        // Update button text based on the *other* language
        langToggleButton.textContent = lang === 'ko' ? 'English' : '한국어';

        // Update page title (optional)
        const titleKo = '이노픽스 애니메이션 스튜디오';
        const titleEn = 'Innofix Animation Studio';
        document.title = lang === 'ko' ? titleKo : titleEn;

        // Show/hide language-specific spans
        const langSpansKo = document.querySelectorAll('[data-lang="ko"]');
        const langSpansEn = document.querySelectorAll('[data-lang="en"]');

        if (lang === 'ko') {
            langSpansKo.forEach(span => span.style.display = ''); // Show Korean
            langSpansEn.forEach(span => span.style.display = 'none'); // Hide English
        } else {
            langSpansKo.forEach(span => span.style.display = 'none'); // Hide Korean
            langSpansEn.forEach(span => span.style.display = ''); // Show English
        }
    }

    // Function to toggle language
    function toggleLanguage() {
        const currentLang = htmlTag.getAttribute('lang') || 'ko'; // Default to Korean if not set
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        setLanguage(newLang);
    }

    // Add event listener to the button
    if (langToggleButton) {
        langToggleButton.addEventListener('click', toggleLanguage);
    }

    // Set initial language based on the HTML tag's lang attribute
    const initialLang = htmlTag.getAttribute('lang') || 'ko';
    setLanguage(initialLang);

});