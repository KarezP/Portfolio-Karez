import { useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import HireMeModal from '../HireMeModal';
import { motion } from 'framer-motion';
import Button from '../reusable/Button';
import { useTranslation } from 'react-i18next';

const AppHeader = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeTheme, setTheme] = useThemeSwitcher();
	const { t, i18n } = useTranslation();

	const toggleMenu = () => setShowMenu(!showMenu);

	const showHireMeModal = () => {
		document.documentElement.classList.toggle('overflow-y-hidden');
		setShowModal(!showModal);
	};

	const handleLanguageChange = (lang) => {
		i18n.changeLanguage(lang);
	};

	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			id="nav"
			className="sm:container sm:mx-auto"
		>
			<div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
				{/* Logo + mobile controls */}
				<div className="flex justify-between items-center px-4 sm:px-0">
					<Link to="/" className="flex items-center space-x-2">
						<span className="text-white bg-indigo-500 dark:bg-indigo-400 rounded-lg px-2 py-1 text-xl font-bold">
							K
						</span>
						<span className="text-xl font-semibold text-ternary-dark dark:text-ternary-light">
							arez
						</span>
					</Link>

					{/* Theme switcher small screen */}
					<div
						onClick={() => setTheme(activeTheme)}
						aria-label="Theme Switcher"
						className="block sm:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
					>
						{activeTheme === 'dark' ? (
							<FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
						) : (
							<FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
						)}
					</div>

					{/* Hamburger menu */}
					<div className="sm:hidden">
						<button onClick={toggleMenu} type="button" className="focus:outline-none" aria-label="Hamburger Menu">
							{showMenu ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				<div className={`${showMenu ? 'block' : 'hidden'} sm:hidden mt-4 px-4 overflow-y-auto max-h-[calc(100vh-80px)]`}>

					{['projects', 'about', 'contact', 'skills'].map((key) => (
						<Link
							key={key}
							to={key === 'skills' ? '/Skills' : `/${key}`}
							className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light mb-2"
							aria-label={t(key)}
						>
							{t(key)}
						</Link>
					))}

					{/* Hire Me (mobile) */}
					<div className="border-t-2 pt-3 mt-3 border-primary-light dark:border-secondary-dark">
						<span
							onClick={showHireMeModal}
							className="font-general-medium block text-left text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300 w-28"
							aria-label="Hire Me Button"
						>
							<Button title={t('hireMe')} />
						</span>
					</div>

					{/* Theme + Language (mobile) */}
					<div className="flex items-center gap-4 mt-4">
						<div
							onClick={() => setTheme(activeTheme)}
							aria-label="Theme Switcher"
							className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
						>
							{activeTheme === 'dark' ? (
								<FiMoon className="text-ternary-dark dark:text-ternary-light text-xl" />
							) : (
								<FiSun className="text-gray-200 text-xl" />
							)}
						</div>

						<select
							onChange={(e) => handleLanguageChange(e.target.value)}
							className="bg-transparent border text-sm dark:text-white border-gray-300 dark:border-gray-600 rounded px-2 py-1"
							value={i18n.language}
						>
							<option value="en">EN</option>
							<option value="sv">SV</option>
						</select>
					</div>
				</div>

				{/* Desktop menu */}
				<div className="font-general-medium hidden sm:flex p-0 items-center justify-center">
					{['projects', 'about', 'contact', 'skills'].map((key) => (
						<Link
							key={key}
							to={key === 'skills' ? '/Skills' : `/${key}`}
							className="text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light mx-4"
							aria-label={t(key)}
						>
							{t(key)}
						</Link>
					))}
				</div>

				{/* Desktop right side */}
				<div className="hidden sm:flex justify-between items-center space-x-4">
					{/* Hire Me */}
					<span
						onClick={showHireMeModal}
						className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
						aria-label="Hire Me Button"
					>
						<Button title={t('hireMe')} />
					</span>

					{/* Theme Switcher */}
					<div
						onClick={() => setTheme(activeTheme)}
						aria-label="Theme Switcher"
						className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
					>
						{activeTheme === 'dark' ? (
							<FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
						) : (
							<FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
						)}
					</div>

					{/* Language Switcher */}
					<select
						onChange={(e) => handleLanguageChange(e.target.value)}
						className="bg-transparent border text-sm dark:text-white border-gray-300 dark:border-gray-600 rounded px-2 py-1"
						value={i18n.language}
					>
						<option value="en">EN</option>
						<option value="sv">SV</option>
					</select>
				</div>
			</div>

			{/* Hire Me Modal */}
			{showModal && <HireMeModal onClose={showHireMeModal} />}
		</motion.nav>
	);
};

export default AppHeader;
