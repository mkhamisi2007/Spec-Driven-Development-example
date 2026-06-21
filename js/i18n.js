// i18n Module - Translation Engine for English/French

const i18n = (() => {
    let currentLanguage = 'en';
    let translations = {};

    // Load translation file for the specified language
    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`/data/translations/${lang}.json`);
            if (!response.ok) {
                console.warn(`Failed to load translations for ${lang}, falling back to English`);
                if (lang !== 'en') {
                    return loadTranslations('en');
                }
                return {};
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            if (lang !== 'en') {
                return loadTranslations('en');
            }
            return {};
        }
    };

    // Get translation by dot-notation key (e.g., "form.nameLabel")
    const getTranslation = (key, defaultValue = key) => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }

        return typeof value === 'string' ? value : defaultValue;
    };

    // Set active language and load translations
    const setLanguage = async (lang) => {
        if (!['en', 'fr'].includes(lang)) {
            console.warn(`Invalid language '${lang}', defaulting to English`);
            lang = 'en';
        }

        currentLanguage = lang;
        translations = await loadTranslations(lang);
        return translations;
    };

    // Get current language
    const getCurrentLanguage = () => currentLanguage;

    // Apply translations to all elements with data-i18n attribute
    const applyTranslations = () => {
        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;

        // Apply text content translations
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);
            element.textContent = translation;
        });

        // Apply placeholder translations
        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = getTranslation(key);
            element.placeholder = translation;
        });
    };

    // Initialize i18n with specified language
    const init = async (lang = 'en') => {
        await setLanguage(lang);
        applyTranslations();
    };

    return {
        loadTranslations,
        getTranslation,
        setLanguage,
        getCurrentLanguage,
        applyTranslations,
        init
    };
})();
