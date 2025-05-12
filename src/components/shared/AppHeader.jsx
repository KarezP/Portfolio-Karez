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
			<div className="max-w-screen-xl mx-auto flex justify-between items-center py-6 px-4 sm:px-0">
				{/* Logo */}
				<Link to="/" className="flex items-center space-x-2">
					<span className="text-white bg-indigo-500 dark:bg-indigo-400 rounded-lg px-2 py-1 text-xl font-bold">K</span>
					<span className="text-xl font-semibold text-ternary-dark dark:text-ternary-light">arez</span>
				</Link>

				{/* Desktop Menu with spacing */}
				<div className="font-general-medium hidden sm:flex items-center">
					{['projects', 'about', 'contact', 'skills'].map((key) => (
						<Link
							key={key}
							to={key === 'skills' ? '/Skills' : `/${key}`}
							className="text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4"
							aria-label={t(key)}
						>
							{t(key)}
						</Link>
					))}
				</div>

				{/* Desktop Right Side */}
				<div className="hidden sm:flex items-center gap-x-4">
					<span
						onClick={showHireMeModal}
						className="text-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300 cursor-pointer"
						aria-label="Hire Me Button"
					>
						<Button title={t('hireMe')} />
					</span>

					<div
						onClick={() => setTheme(activeTheme)}
						className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
						aria-label="Theme Switcher"
					>
						{activeTheme === 'dark' ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
					</div>

					<select
						onChange={(e) => handleLanguageChange(e.target.value)}
						value={i18n.language}
						className="border rounded px-2 py-1 text-sm dark:text-white dark:border-gray-600"
					>
						<option value="en">EN</option>
						<option value="sv">SV</option>
					</select>
				</div>

				{/* Mobile menu toggle */}
				<div className="sm:hidden flex items-center space-x-3">
					<div
						onClick={() => setTheme(activeTheme)}
						className="bg-primary-light dark:bg-ternary-dark p-3 rounded-xl"
					>
						{activeTheme === 'dark' ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
					</div>
					<button onClick={toggleMenu} aria-label="Toggle Menu">
						{showMenu ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`${showMenu ? 'block' : 'hidden'} sm:hidden px-4 pb-6`}>
				{['projects', 'about', 'contact', 'skills'].map((key) => (
					<Link
						key={key}
						to={key === 'skills' ? '/Skills' : `/${key}`}
						onClick={toggleMenu}
						className="block text-lg text-primary-dark dark:text-ternary-light py-2"
					>
						{t(key)}
					</Link>
				))}

				<div className="mt-4">
					<span
						onClick={showHireMeModal}
						className="block bg-indigo-500 hover:bg-indigo-600 text-white text-center rounded px-4 py-2 duration-300"
					>
						<Button title={t('hireMe')} />
					</span>
				</div>

				<div className="flex items-center gap-4 mt-4">
					<select
						onChange={(e) => handleLanguageChange(e.target.value)}
						value={i18n.language}
						className="border rounded px-2 py-1 text-sm dark:text-white dark:border-gray-600"
					>
						<option value="en">EN</option>
						<option value="sv">SV</option>
					</select>
				</div>
			</div>

			{/* Modal */}
			{showModal && <HireMeModal onClose={showHireMeModal} />}
		</motion.nav>
	);
};

export default AppHeader;
