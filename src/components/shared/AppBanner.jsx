import { FiArrowDownCircle, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import profileImage from '../../images/karez2.jpeg';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AppBanner = () => {
	const { t } = useTranslation();

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="mt-10 sm:mt-14"
		>
			<div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
				<div className="max-w-3xl">
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeInOut',
							duration: 0.9,
							delay: 0.05,
						}}
						className="font-general-medium text-sm uppercase tracking-[0.32em] text-gray-500 dark:text-gray-300"
					>
						{t('bannerEyebrow')}
					</motion.p>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeInOut',
							duration: 0.9,
							delay: 0.1,
						}}
						className="font-general-semibold mt-6 text-4xl leading-tight text-ternary-dark dark:text-primary-light sm:text-5xl lg:text-6xl"
					>
						{t('bannerTitle')}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeInOut',
							duration: 0.9,
							delay: 0.2,
						}}
						className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl"
					>
						{t('bannerSummary')}
					</motion.p>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							ease: 'easeInOut',
							duration: 0.9,
							delay: 0.3,
						}}
						className="mt-8 flex flex-col gap-4 sm:flex-row"
					>
						<Link
							to="/projects"
							className="font-general-medium inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-base text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-primary-light dark:text-primary-dark dark:hover:bg-white"
							aria-label={t('bannerPrimaryCta')}
						>
							{t('bannerPrimaryCta')}
							<FiArrowRight className="h-4 w-4" />
						</Link>
						<a
							download="Karez.CV.pdf"
							href="/Karez.CV.pdf"
							className="font-general-medium inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 text-base text-ternary-dark transition duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-secondary-dark dark:text-primary-light dark:hover:border-primary-light dark:hover:bg-secondary-dark"
							aria-label={t('downloadCV')}
						>
							<FiArrowDownCircle className="h-4 w-4" />
							{t('downloadCV')}
						</a>
					</motion.div>

					<div className="mt-10 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3 dark:border-secondary-dark">
						{[1, 2, 3].map((item) => (
							<div key={item}>
								<p className="font-general-semibold text-2xl text-ternary-dark dark:text-primary-light">
									{t(`bannerStat${item}Value`)}
								</p>
								<p className="mt-2 text-sm uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
									{t(`bannerStat${item}Label`)}
								</p>
							</div>
						))}
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: -60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
					className="w-full"
				>
					<div className="relative mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-secondary-dark dark:bg-secondary-dark">
						<div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-ternary-dark">
							<img
								src={profileImage}
								alt={t('bannerImageAlt')}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/60 bg-white/92 p-5 shadow-lg backdrop-blur dark:border-slate-600 dark:bg-primary-dark/88">
							<p className="font-general-medium text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400">
								{t('bannerCardEyebrow')}
							</p>
							<p className="font-general-semibold mt-3 text-xl text-ternary-dark dark:text-primary-light">
								{t('bannerCardTitle')}
							</p>
							<p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
								{t('bannerCardBody')}
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default AppBanner;
