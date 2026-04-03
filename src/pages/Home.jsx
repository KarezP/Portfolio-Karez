import { Link } from 'react-router-dom';
import AppBanner from '../components/shared/AppBanner';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import { ProjectsProvider } from '../context/ProjectsContext';
import HomeCapabilities from '../components/home/HomeCapabilities';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation();

	return (
		<div className="container mx-auto px-4 sm:px-0">
			<AppBanner />

			<section className="mt-16 sm:mt-20" aria-labelledby="proof-heading">
				<div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
					<div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-secondary-dark dark:bg-secondary-dark/70">
						<p className="font-general-medium text-sm uppercase tracking-[0.28em] text-gray-500 dark:text-gray-300">
							{t('homeProofEyebrow')}
						</p>
						<h2
							id="proof-heading"
							className="font-general-semibold mt-5 text-3xl text-ternary-dark dark:text-primary-light sm:text-4xl"
						>
							{t('homeProofTitle')}
						</h2>
						<p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
							{t('homeProofBody')}
						</p>
					</div>

					<div className="rounded-[2rem] border border-gray-200 bg-slate-900 p-7 text-white shadow-sm dark:border-slate-700 dark:bg-primary-light dark:text-primary-dark">
						<p className="font-general-medium text-sm uppercase tracking-[0.28em] text-slate-300 dark:text-slate-600">
							{t('homeAvailabilityEyebrow')}
						</p>
						<p className="font-general-semibold mt-5 text-2xl">
							{t('homeAvailabilityTitle')}
						</p>
						<p className="mt-4 text-base leading-7 text-slate-200 dark:text-slate-700">
							{t('homeAvailabilityBody')}
						</p>
					</div>
				</div>
			</section>

			<ProjectsProvider>
				<ProjectsGrid
					limit={3}
					showControls={false}
					headingKey="homeSelectedWorkTitle"
					introKey="homeSelectedWorkIntro"
					featured={true}
				/>
			</ProjectsProvider>

			<div className="mt-6 sm:mt-8 flex justify-center">
				<Link
					to="/projects"
					className="font-general-medium inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-base text-ternary-dark transition duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-secondary-dark dark:text-primary-light dark:hover:border-primary-light dark:hover:bg-secondary-dark"
					aria-label={t('moreProjects')}
				>
					{t('moreProjects')}
				</Link>
			</div>

			<HomeCapabilities />
		</div>
	);
};

export default Home;
