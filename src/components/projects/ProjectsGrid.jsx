import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProjectSingle from './ProjectSingle';
import { ProjectsContext } from '../../context/ProjectsContext';
import ProjectsFilter from './ProjectsFilter';
import { useTranslation } from 'react-i18next';

const ProjectsGrid = ({
	limit,
	showControls = true,
	headingKey = 'projectsPortfolio',
	introKey = '',
	featured = false,
}) => {
	const { t } = useTranslation();
	const {
		projects,
		searchProject,
		setSearchProject,
		searchProjectsByTitle,
		selectProject,
		setSelectProject,
		selectProjectsByCategory,
	} = useContext(ProjectsContext);

	let displayedProjects = projects;

	if (selectProject) {
		displayedProjects = selectProjectsByCategory;
	} else if (searchProject) {
		displayedProjects = searchProjectsByTitle;
	}

	// Begränsa antalet projekt om limit är satt
	if (limit) {
		displayedProjects = displayedProjects.slice(0, limit);
	}

	return (
		<section className="py-5 sm:py-10 mt-5 sm:mt-10">
			<div className={showControls ? 'text-center' : 'max-w-2xl'}>
				<p className="font-general-medium text-sm uppercase tracking-[0.28em] text-gray-500 dark:text-gray-300">
					{t('selectedWorkEyebrow')}
				</p>
				<h2 className="font-general-semibold mt-4 text-3xl sm:text-4xl text-ternary-dark dark:text-ternary-light">
					{t(headingKey)}
				</h2>
				{introKey ? (
					<p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
						{t(introKey)}
					</p>
				) : null}
			</div>

			{showControls ? (
				<div className="mt-10 sm:mt-16">
					<h3
						className="font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        mb-3
                        "
					>
						{t('searchOrFilter')}
					</h3>
					<div
						className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
                        "
					>
						<div className="flex justify-between gap-2">
							<span
								className="
                                hidden
                                sm:block
                                bg-primary-light
                                dark:bg-ternary-dark
                                p-2.5
                                shadow-sm
                                rounded-xl
                                cursor-pointer
                                "
							>
								<FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5"></FiSearch>
							</span>
							<input
								onChange={(e) => {
									setSearchProject(e.target.value);
								}}
								className="font-general-medium 
                                pl-3
                                pr-1
                                sm:px-4
                                py-2
                                border 
                            border-gray-200
                                dark:border-secondary-dark
                                rounded-lg
                                text-sm
                                sm:text-md
                                bg-secondary-light
                                dark:bg-ternary-dark
                                text-primary-dark
                                dark:text-ternary-light
                                "
								id="name"
								name="name"
								type="search"
								required=""
								placeholder={t('searchProjects')}
								aria-label="Name"
							/>
						</div>

						<ProjectsFilter setSelectProject={setSelectProject} />
					</div>
				</div>
			) : null}

			<div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 xl:grid-cols-3 sm:gap-8">
				{selectProject
					? selectProjectsByCategory.map((project) => (
							<ProjectSingle
								id={project.id}
								title={project.title}
								category={project.category}
								description={project.description}
								tools={project.tools}
								image={project.image}
								featured={featured}
								key={project.id}
							/>
					  ))
					: searchProject
					? searchProjectsByTitle.map((project) => (
							<ProjectSingle
								id={project.id}
								title={project.title}
								category={project.category}
								description={project.description}
								tools={project.tools}
								image={project.image}
								featured={featured}
								key={project.id}
							/>
					  ))
					: displayedProjects.map((project) => (
							<ProjectSingle
								id={project.id}
								title={project.name}
								category={project.category}
								description={project.description}
								tools={project.tools}
								image={project.image}
								featured={featured}
								key={project.id}
							/>
					  ))}
			</div>
		</section>
	);
};

export default ProjectsGrid;
