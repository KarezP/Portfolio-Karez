import { useSingleProject } from '../../context/SingleProjectContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ProjectRelatedProjects = () => {
	const { project } = useSingleProject();
	const { t } = useTranslation();

	if (!project || !project.RelatedProject) {
		return <div>{t('loadingRelatedProjects')}</div>;

	}

	return (
		<div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
			<p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
				{t(project.RelatedProject.title)}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
			{project.RelatedProject.Projects.map((related) => (
				<Link to={`/projects/${related.id}`} key={related.id}>
				<img
				  src={related.img}
				  className="rounded-xl hover:opacity-90 transition duration-300"
				  alt={related.title}
				/>
			  </Link>
			))}

			</div>
		</div>
	);
};

export default ProjectRelatedProjects;
