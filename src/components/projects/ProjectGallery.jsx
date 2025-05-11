import { useSingleProject } from '../../context/SingleProjectContext';
import { useTranslation } from 'react-i18next';

const ProjectGallery = () => {
	const { project } = useSingleProject();
	const { t } = useTranslation();

	if (!project || !project.ProjectImages) {
		return <div>{t('loadingGallery')}</div>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
			{project.ProjectImages.map((image) => (
				<div className="mb-10 sm:mb-0" key={image.id}>
					<img
						src={image.img}
						className="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
						alt={t(image.title)}
					/>
				</div>
			))}
		</div>
	);
};

export default ProjectGallery;

