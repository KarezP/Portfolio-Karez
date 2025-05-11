import { useTranslation } from 'react-i18next';

const selectOptions = [
	'Frontend',
	'Fullstack',
	'UX/UI Design',
];

const ProjectsFilter = ({ setSelectProject }) => {
	const { t } = useTranslation();
	return (
		<select
			onChange={(e) => {
				setSelectProject(e.target.value);
			}}
			className="font-general-medium 
                px-4
                sm:px-6
                py-2
                border
                dark:border-secondary-dark
                rounded-lg
                text-sm
                sm:text-md
                dark:font-medium
                bg-secondary-light
                dark:bg-ternary-dark
                text-primary-dark
                dark:text-ternary-light
            "
		>
			<option value="" className="text-sm sm:text-md">
				{t('allProjects')}
			</option>

			{selectOptions.map((option) => (
				<option value={option} key={option} className="text-normal sm:text-md">
					{option}
				</option>
			))}
		</select>
	);
};

export default ProjectsFilter;

