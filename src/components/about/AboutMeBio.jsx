import profileImage from '../../images/Karez.jpeg';

import { useTranslation } from 'react-i18next';

const AboutMeBio = () => {
  const { t } = useTranslation();

  const aboutMeData = [
    { id: 1, bio: t('aboutMe.1') },
    { id: 2, bio: t('aboutMe.2') },
    { id: 3, bio: t('aboutMe.3') },
    { id: 4, bio: t('aboutMe.4') },
  ];

  return (
    <div className="block sm:flex sm:gap-10 mt-10 sm:mt-20">
      <div className="w-full sm:w-1/4 mb-7 sm:mb-0">
        <img src={profileImage} className="rounded-lg w-96" alt="Profile" />
      </div>

      <div className="font-general-regular w-full sm:w-3/4 text-left">
        {aboutMeData.map((bio) => (
          <p
            key={bio.id}
            className="mb-4 text-ternary-dark dark:text-ternary-light text-lg"
          >
            {bio.bio}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutMeBio;
