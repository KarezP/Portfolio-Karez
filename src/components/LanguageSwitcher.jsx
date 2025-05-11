import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-4 justify-center my-4 text-sm">
      <button onClick={() => i18n.changeLanguage('en')} className="hover:underline">
        🇬🇧 English
      </button>
      <button onClick={() => i18n.changeLanguage('sv')} className="hover:underline">
        🇸🇪 Svenska
      </button>
    </div>
  );
};

export default LanguageSwitcher;
