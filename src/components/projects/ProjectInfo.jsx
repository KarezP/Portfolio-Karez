import { useSingleProject } from '../../context/SingleProjectContext';
import { useTranslation } from 'react-i18next';

const ProjectInfo = () => {
	const { t } = useTranslation();
	const { project } = useSingleProject();

	const currentUrl = encodeURIComponent(window.location.href);

	// Funktion som returnerar rätt delningslänk
	const getShareUrl = (platform) => {
		switch (platform) {
			case 'facebook':
				return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
			case 'linkedin':
				return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
			case 'twitter':
				return `https://twitter.com/intent/tweet?url=${currentUrl}&text=Check%20out%20this%20project!`;
			default:
				return '#';
		}
	};

	if (!project || !project.ProjectInfo) {
		return <div>{t('loadingProjectInfo')}</div>;
	}

	return (
		<div className="block sm:flex sm:gap-10 mt-14">
			{/* Vänsterkolumn */}
			<div className="w-full sm:w-1/2 bg-white dark:bg-ternary-dark p-6 rounded-lg shadow-md mb-10 sm:mb-0">
				{/* ...andra sektioner... */}

				<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
					{t(project.ProjectInfo.SocialSharingHeading)}
				</p>
				<div className="flex items-center gap-3 mt-4">
					{project.ProjectInfo.SocialSharing.map((social) => (
						<a
							key={social.id}
							href={getShareUrl(social.platform)}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Share on ${social.platform}`}
							className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
						>
							<span className="text-lg lg:text-2xl">{social.icon}</span>
						</a>
					))}
				</div>
			</div>

			{/* Högerkolumn */}
			<div className="w-full sm:w-1/2 bg-white dark:bg-ternary-dark p-6 rounded-lg shadow-md">
				<p className="font-general-regular text-2xl font-bold text-primary-dark dark:text-primary-light mb-5">
					{t(project.ProjectInfo.ProjectDetailsHeading)}
				</p>

				{project.ProjectInfo.ProjectDetails.map((details) => (
					<p
						key={details.id}
						className="font-general-regular mb-4 text-lg text-ternary-dark dark:text-ternary-light"
					>
						{t(details.details)}
					</p>
				))}
			</div>
		</div>
	);
};

export default ProjectInfo;
