import React from 'react';
import { useTranslation } from 'react-i18next';


const Skills = () => {
    const { t } = useTranslation();

  return (
    <section className="bg-gray-100 dark:bg-primary-dark py-12 px-6 transition duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-primary-light mb-8">
           
            {t('skillsTitle')}
            
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {/* Skill Item */}
          <div className="flex flex-col items-center">
            <i className="devicon-html5-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">HTML</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-css3-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">CSS</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-javascript-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">JavaScript</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-react-original colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">React</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-tailwindcss-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">Tailwind CSS</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-nodejs-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">Node.js</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-express-original colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">Express</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-mysql-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">MySQL</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-figma-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">Figma</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-git-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">Git</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-github-original colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">GitHub</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="devicon-vscode-plain colored text-4xl mb-2"></i>
            <p className="text-lg font-medium text-gray-800 dark:text-primary-light">VS Code</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
