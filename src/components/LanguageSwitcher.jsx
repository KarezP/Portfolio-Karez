import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-4 mt-4 border-t pt-4">
        <label className="text-sm text-primary-dark dark:text-ternary-light">Language</label>
        <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white text-black border border-gray-300 rounded px-2 py-1"
            value={i18n.language}
        >
            <option value="en">EN</option>
            <option value="sv">SV</option>
        </select>
    </div>
  );
};

export default LanguageSwitcher;
