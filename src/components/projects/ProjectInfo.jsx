import { useSingleProject } from '../../context/SingleProjectContext';
import { useTranslation } from 'react-i18next';

const ProjectInfo = () => {
	const { t } = useTranslation();
	const { project } = useSingleProject();

	if (!project || !project.ProjectInfo) {
		return <div>{t('loadingProjectInfo')}</div>;
	}

	return (
		<div className="block sm:flex sm:gap-10 mt-14">
			{/* Vänsterkolumn: Om projektet */}
			<div className="w-full sm:w-1/2 bg-white dark:bg-ternary-dark p-6 rounded-lg shadow-md mb-10 sm:mb-0">
				<p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-4">
					{t(project.ProjectInfo.ClientHeading)}
				</p>

				<ul className="leading-loose mb-6">
					{project.ProjectInfo.CompanyInfo.map((info) => (
						<li
							key={info.id}
							className="font-general-regular text-ternary-dark dark:text-ternary-light"
						>
							<span>{t(info.title)}:</span>{' '}
							{['Website', 'GitHub (frontend)', 'GitHub (backend)', 'Phone'].includes(info.title) ? (
								<a
									href={info.details}
									target="_blank"
									rel="noopener noreferrer"
									className="break-words text-blue-600 underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
									aria-label={`Link to ${info.title}`}
								>
									{info.details}
								</a>
							) : (
								<span className="break-words">{t(info.details)}</span>
							)}
						</li>
					))}
				</ul>

				<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
					{t(project.ProjectInfo.ObjectivesHeading)}
				</p>
				<p className="font-general-regular text-primary-dark dark:text-ternary-light mb-6">
					{t(project.ProjectInfo.ObjectivesDetails)}
				</p>

				<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
					{t(project.ProjectInfo.Technologies[0].title)}
				</p>
				<p className="font-general-regular text-primary-dark dark:text-ternary-light mb-6">
					{project.ProjectInfo.Technologies[0].techs.join(', ')}
				</p>

				<p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
					{t(project.ProjectInfo.SocialSharingHeading)}
				</p>
				<div className="flex items-center gap-3 mt-4">
					{project.ProjectInfo.SocialSharing.map((social) => (
						<a
							key={social.id}
							href={social.url}
							target="__blank"
							aria-label="Share Project"
							className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
						>
							<span className="text-lg lg:text-2xl">{social.icon}</span>
						</a>
					))}
				</div>
			</div>

			{/* Högerkolumn: Designbeskrivning */}
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
