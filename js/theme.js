// Theme & Language Persistence Module

const theme = (() => {
    const LANGUAGE_KEY = 'siteLanguage';

    // Initialize language preference from localStorage or browser language
    const initLanguagePreference = async () => {
        let language = localStorage.getItem(LANGUAGE_KEY);

        if (!language) {
            // Detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.startsWith('fr')) {
                language = 'fr';
            } else {
                language = 'en';
            }
        }

        // Validate language
        if (!['en', 'fr'].includes(language)) {
            language = 'en';
        }

        // Initialize i18n with selected language
        await i18n.init(language);
        updateLanguageDisplay();
    };

    // Set language and persist to localStorage
    const setLanguagePersistent = async (lang) => {
        if (!['en', 'fr'].includes(lang)) {
            console.warn(`Invalid language '${lang}'`);
            return;
        }

        // Set language in i18n
        await i18n.setLanguage(lang);
        i18n.applyTranslations();

        // Persist to localStorage
        localStorage.setItem(LANGUAGE_KEY, lang);

        // Update language display
        updateLanguageDisplay();
    };

    // Update language display in switcher
    const updateLanguageDisplay = () => {
        const currentLang = i18n.getCurrentLanguage();
        const langDisplay = document.getElementById('langDisplay');
        if (langDisplay) {
            langDisplay.textContent = currentLang.toUpperCase();
        }
    };

    // Setup language switcher event listeners
    const setupLanguageSwitcher = () => {
        const switcher = document.getElementById('languageSwitcher');
        if (!switcher) return;

        switcher.addEventListener('click', () => {
            const currentLang = i18n.getCurrentLanguage();
            const newLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguagePersistent(newLang);
        });

        // Optional: Add keyboard support for language switcher
        switcher.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switcher.click();
            }
        });
    };

    return {
        initLanguagePreference,
        setLanguagePersistent,
        setupLanguageSwitcher
    };
})();
