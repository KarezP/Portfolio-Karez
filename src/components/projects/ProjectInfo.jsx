import { useSingleProject } from '../../context/SingleProjectContext';
import { useTranslation } from 'react-i18next';

const ProjectInfo = () => {
  const { t } = useTranslation();
  const { project } = useSingleProject();

  if (!project || !project.ProjectInfo) {
    return <div>{t('loadingProjectInfo')}</div>;
  }

  const {
    ClientHeading,
    CompanyInfo,
    ObjectivesHeading,
    ObjectivesDetails,
    Technologies,
    ProjectDetailsHeading,
    ProjectDetails,
  } = project.ProjectInfo;

  return (
    <div className="block sm:flex sm:gap-10 mt-14">
      <div className="w-full sm:w-1/2 bg-white dark:bg-ternary-dark p-6 rounded-lg shadow-md mb-10 sm:mb-0">
        <p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-4">
          {t(ClientHeading)}
        </p>

        <ul className="leading-loose mb-6">
          {CompanyInfo.map((info) => (
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
          {t(ObjectivesHeading)}
        </p>
        <p className="font-general-regular text-primary-dark dark:text-ternary-light mb-6">
          {t(ObjectivesDetails)}
        </p>

        <p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
          {t(Technologies[0].title)}
        </p>
        <p className="font-general-regular text-primary-dark dark:text-ternary-light mb-6">
          {Technologies[0].techs.join(', ')}
        </p>
      </div>

      <div className="w-full sm:w-1/2 bg-white dark:bg-ternary-dark p-6 rounded-lg shadow-md">
        <p className="font-general-regular text-2xl font-bold text-primary-dark dark:text-primary-light mb-5">
          {t(ProjectDetailsHeading)}
        </p>

        {ProjectDetails.map((details) => (
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
