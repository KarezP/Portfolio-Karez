import { Link } from 'react-router-dom';
import { FiArrowRight, FiLayers, FiPenTool, FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const capabilityIcons = [FiLayers, FiPenTool, FiTrendingUp];

const HomeCapabilities = () => {
	const { t } = useTranslation();

	return (
		<section className="mt-24 sm:mt-28" aria-labelledby="capabilities-heading">
			<div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
				<div className="max-w-2xl">
					<p className="font-general-medium text-sm uppercase tracking-[0.28em] text-gray-500 dark:text-gray-300">
						{t('homeCapabilitiesEyebrow')}
					</p>
					<h2
						id="capabilities-heading"
						className="font-general-semibold mt-5 text-3xl sm:text-4xl text-ternary-dark dark:text-primary-light"
					>
						{t('homeCapabilitiesTitle')}
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
						{t('homeCapabilitiesIntro')}
					</p>

					<div className="mt-10 rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-secondary-dark dark:bg-secondary-dark/70">
						<p className="font-general-semibold text-lg text-ternary-dark dark:text-primary-light">
							{t('homeCapabilitiesApproachTitle')}
						</p>
						<ul className="mt-4 space-y-3 text-base leading-7 text-gray-600 dark:text-gray-300">
							{[1, 2, 3].map((item) => (
								<li key={item} className="flex gap-3">
									<span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-slate-900 dark:bg-primary-light" />
									<span>{t(`homeCapabilitiesApproach${item}`)}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="grid gap-4">
					{[1, 2, 3].map((item, index) => {
						const Icon = capabilityIcons[index];

						return (
							<article
								key={item}
								className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-secondary-dark dark:bg-secondary-dark/80"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-primary-light dark:text-primary-dark">
									<Icon className="h-5 w-5" />
								</div>
								<h3 className="font-general-semibold mt-5 text-xl text-ternary-dark dark:text-primary-light">
									{t(`homeCapability${item}Title`)}
								</h3>
								<p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
									{t(`homeCapability${item}Body`)}
								</p>
							</article>
						);
					})}

					<div className="rounded-3xl border border-gray-200 bg-slate-900 p-6 text-white shadow-sm dark:border-slate-700 dark:bg-primary-light dark:text-primary-dark">
						<p className="font-general-semibold text-xl">
							{t('homeCtaTitle')}
						</p>
						<p className="mt-3 text-base leading-7 text-slate-200 dark:text-slate-700">
							{t('homeCtaBody')}
						</p>
						<Link
							to="/contact"
							className="font-general-medium mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white transition duration-300 hover:opacity-80 dark:text-primary-dark"
							aria-label={t('homeCtaButton')}
						>
							{t('homeCtaButton')}
							<FiArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeCapabilities;
