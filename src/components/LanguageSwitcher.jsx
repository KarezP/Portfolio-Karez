import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleLanguageChange}
      value={i18n.language}
      className="border border-gray-300 rounded px-2 py-1 bg-white dark:bg-ternary-dark text-sm text-primary-dark dark:text-ternary-light"
      aria-label="Language selector"
    >
      <option value="en">EN</option>
      <option value="sv">SV</option>
    </select>
  );
};

export default LanguageSwitcher;
