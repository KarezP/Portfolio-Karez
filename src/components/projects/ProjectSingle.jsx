import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjectSingle = ({ title, category, image, id, description, tools = [], featured = false }) => {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
		>
			<Link to={`/projects/${id}`} aria-label={t(title)} className="group block h-full">
				<article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-secondary-light shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-secondary-dark dark:bg-ternary-dark">
					<div className="overflow-hidden">
						<img
							src={Array.isArray(image) ? image[0] : image}
							className="aspect-[4/3] w-full border-none object-cover transition duration-500 group-hover:scale-[1.03]"
							alt={t(title)}
						/>
					</div>
					<div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
						<p className="font-general-medium text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
							{t(category)}
						</p>
						<h3 className="font-general-semibold mt-3 text-xl md:text-2xl text-ternary-dark dark:text-ternary-light">
							{t(title)}
						</h3>
						{description ? (
							<p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
								{t(description)}
							</p>
						) : null}
						{featured && tools.length ? (
							<div className="mt-6 flex flex-wrap gap-2">
								{tools.slice(0, 3).map((tool) => (
									<span
										key={tool}
										className="rounded-full bg-gray-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-600 dark:bg-primary-dark dark:text-gray-300"
									>
										{tool}
									</span>
								))}
							</div>
						) : null}
						<span className="font-general-medium mt-6 inline-flex items-center text-sm uppercase tracking-[0.22em] text-ternary-dark transition duration-300 group-hover:translate-x-1 dark:text-primary-light">
							{t('viewProject')}
						</span>
					</div>
				</article>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;
