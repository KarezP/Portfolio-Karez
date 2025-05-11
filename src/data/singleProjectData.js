import React from "react";
import Desmal from '../images/desmal.png';
import Nandin from '../images/nandin.png';
import SuntripDesktop from '../images/suntrip-desktop.png';
import SuntripMobile from '../images/suntrip-mobile.png';
import WeatherApp from '../images/weather-preview.png';
import Todo from '../images/todo-preview.png';
import Quiz from '../images/quiz-preview.png';

import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from 'react-icons/fi';

const desmalProjectData = {
  id: 1,
  ProjectHeader: {
    title: 'project_desmal.title',
    publishDate: 'May 2025',
    tags: 'Fullstack / React',
  },
  ProjectImages: [
    { id: 1, title: 'project_desmal.imageTitle', img: Desmal },
  ],
  ProjectInfo: {
    ClientHeading: 'project_desmal.aboutHeading',
    CompanyInfo: [
      { id: 1, title: 'project_desmal.projectLabel', details: 'project_desmal.projectType' },
      { id: 2, title: 'project_desmal.roleLabel', details: 'project_desmal.role' },
      { id: 3, title: 'Website', details: 'https://mellifluous-donut-47403b.netlify.app/' },
      { id: 4, title: 'GitHub (frontend)', details: 'https://github.com/KarezP/Fashion-hub-DESMAL' },
      { id: 5, title: 'GitHub (backend)', details: 'https://github.com/KarezP/fashion-backend/tree/main' },
    ],
    ObjectivesHeading: 'project_desmal.objectiveHeading',
    ObjectivesDetails: 'project_desmal.objective',
    Technologies: [
      { title: 'project_desmal.techTitle', techs: ['React', 'Context API', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL'] },
    ],
    ProjectDetailsHeading: 'project_desmal.detailsHeading',
    ProjectDetails: [
      { id: 1, details: 'project_desmal.detail_1' },
      { id: 2, details: 'project_desmal.detail_2' },
    ],
    SocialSharingHeading: 'project_desmal.shareHeading',
    SocialSharing: [
      { id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
      { id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
      { id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
      { id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
      { id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
    ],
  },
  RelatedProject: {
    title: 'project_desmal.relatedTitle',
    Projects: [{ id: 2, title: 'project_nandin.title', img: Nandin }],
  },
};

const nandinProjectData = {
  id: 2,
  ProjectHeader: {
    title: 'project_nandin.title',
    publishDate: 'April 2025',
    tags: 'Frontend / React / CSS',
  },
  ProjectImages: [
    { id: 1, title: 'project_nandin.imageTitle', img: Nandin },
  ],
  ProjectInfo: {
    ClientHeading: 'project_nandin.aboutHeading',
    CompanyInfo: [
      { id: 1, title: 'project_nandin.projectLabel', details: 'project_nandin.projectType' },
      { id: 2, title: 'project_nandin.roleLabel', details: 'project_nandin.role' },
      { id: 3, title: 'Website', details: 'https://gleeful-liger-216a6b.netlify.app/' },
      { id: 4, title: 'GitHub', details: 'https://github.com/KarezP/NANDIN' },
    ],
    ObjectivesHeading: 'project_nandin.objectiveHeading',
    ObjectivesDetails: 'project_nandin.objective',
    Technologies: [
      { title: 'project_nandin.techTitle', techs: ['React', 'Context API', 'CSS', 'LocalStorage'] },
    ],
    ProjectDetailsHeading: 'project_nandin.detailsHeading',
    ProjectDetails: [
      { id: 1, details: 'project_nandin.detail_1' },
      { id: 2, details: 'project_nandin.detail_2' },
      { id: 3, details: 'project_nandin.detail_3' },
    ],
    SocialSharingHeading: 'project_nandin.shareHeading',
    SocialSharing: [
      { id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
      { id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
      { id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
      { id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
      { id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
    ],
  },
  RelatedProject: {
    title: 'project_nandin.relatedTitle',
    Projects: [{ id: 1, title: 'project_desmal.title', img: Desmal }],
  },
};

const suntripProjectData = {
  id: 3,
  ProjectHeader: {
    title: 'project_suntrip.title',
    publishDate: 'February 2025',
    tags: 'UX/UI Design / Figma',
  },
  ProjectImages: [
    { id: 1, title: 'project_suntrip.imageTitle_1', img: SuntripDesktop },
    { id: 2, title: 'project_suntrip.imageTitle_2', img: SuntripMobile },
  ],
  ProjectInfo: {
    ClientHeading: 'project_suntrip.aboutHeading',
    CompanyInfo: [
      { id: 1, title: 'project_suntrip.projectLabel', details: 'project_suntrip.projectType' },
      { id: 2, title: 'project_suntrip.roleLabel', details: 'project_suntrip.role' },
      { id: 3, title: 'Figma (Desktop)', details: 'https://www.figma.com/proto/tbrqAhCCuxietNhI1FlFr6/SunTrips?node-id=159-338' },
      { id: 4, title: 'Figma (Mobile)', details: 'https://www.figma.com/proto/pmdfNIqtADm8xULlkTfzhh/Untitled?node-id=1-142' },
    ],
    ObjectivesHeading: 'project_suntrip.objectiveHeading',
    ObjectivesDetails: 'project_suntrip.objective',
    Technologies: [
      { title: 'project_suntrip.techTitle', techs: ['Figma', 'Wireframing', 'Responsive Design', 'UI Components', 'UX Testing'] },
    ],
    ProjectDetailsHeading: 'project_suntrip.detailsHeading',
    ProjectDetails: [
      { id: 1, details: 'project_suntrip.detail_1' },
      { id: 2, details: 'project_suntrip.detail_2' },
      { id: 3, details: 'project_suntrip.detail_3' },
    ],
    SocialSharingHeading: 'project_suntrip.shareHeading',
    SocialSharing: [
      { id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
      { id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
      { id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
      { id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
      { id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
    ],
  },
  RelatedProject: {
    title: 'project_suntrip.relatedTitle',
    Projects: [
      { id: 1, title: 'project_desmal.title', img: Desmal },
      { id: 2, title: 'project_nandin.title', img: Nandin },
    ],
  },
};
// ✅ WEATHER APP
const weatherAppData = {
	id: 4,
	ProjectHeader: {
		title: 'project_weather.title',
		publishDate: '2024',
		tags: 'Frontend / JavaScript / API',
	},
	ProjectImages: [
		{
			id: 1,
			title: 'project_weather.imageTitle',
			img: WeatherApp,
		},
	],
	ProjectInfo: {
		ClientHeading: 'project_weather.aboutHeading',
		CompanyInfo: [
			{ id: 1, title: 'project_weather.projectLabel', details: 'project_weather.projectType' },
			{ id: 2, title: 'project_weather.roleLabel', details: 'project_weather.role' },
			{ id: 3, title: 'Website', details: 'https://jovial-smakager-1f9157.netlify.app/' },
			{ id: 4, title: 'GitHub', details: 'https://github.com/KarezP/weather-application' },
		],
		ObjectivesHeading: 'project_weather.objectiveHeading',
		ObjectivesDetails: 'project_weather.objective',
		Technologies: [
			{
				title: 'project_weather.techTitle',
				techs: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API'],
			},
		],
		ProjectDetailsHeading: 'project_weather.detailsHeading',
		ProjectDetails: [
			{ id: 1, details: 'project_weather.detail_1' },
			{ id: 2, details: 'project_weather.detail_2' },
			{ id: 3, details: 'project_weather.detail_3' },
		],
		SocialSharingHeading: 'project_weather.shareHeading',
		SocialSharing: [
			{ id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
			{ id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
			{ id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
			{ id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
			{ id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
		],
	},
	RelatedProject: {
		title: 'project_weather.relatedTitle',
		Projects: [
			{ id: 2, title: 'NANDIN – Food Recipe App', img: Nandin },
		],
	},
};

// ✅ TO-DO & TO-BUY
const todoProjectData = {
	id: 5,
	ProjectHeader: {
		title: 'project_todo.title',
		publishDate: '2024',
		tags: 'Frontend / JavaScript / Responsive',
	},
	ProjectImages: [
		{ id: 1, title: 'project_todo.imageTitle', img: Todo },
	],
	ProjectInfo: {
		ClientHeading: 'project_todo.aboutHeading',
		CompanyInfo: [
			{ id: 1, title: 'project_todo.projectLabel', details: 'project_todo.projectType' },
			{ id: 2, title: 'project_todo.roleLabel', details: 'project_todo.role' },
			{ id: 3, title: 'Website', details: 'https://comfy-gumdrop-c0f696.netlify.app/' },
		],
		ObjectivesHeading: 'project_todo.objectiveHeading',
		ObjectivesDetails: 'project_todo.objective',
		Technologies: [
			{
				title: 'project_todo.techTitle',
				techs: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
			},
		],
		ProjectDetailsHeading: 'project_todo.detailsHeading',
		ProjectDetails: [
			{ id: 1, details: 'project_todo.detail_1' },
			{ id: 2, details: 'project_todo.detail_2' },
			{ id: 3, details: 'project_todo.detail_3' },
		],
		SocialSharingHeading: 'project_todo.shareHeading',
		SocialSharing: [
			{ id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
			{ id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
			{ id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
			{ id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
			{ id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
		],
	},
	RelatedProject: {
		title: 'project_todo.relatedTitle',
		Projects: [
			{ id: 2, title: 'NANDIN – Food Recipe App', img: Nandin },
		],
	},
};

// ✅ QUIZ GAME
const quizGameData = {
	id: 6,
	ProjectHeader: {
		title: 'project_quiz.title',
		publishDate: '2024',
		tags: 'Frontend / JavaScript / Game',
	},
	ProjectImages: [
		{ id: 1, title: 'project_quiz.imageTitle', img: Quiz },
	],
	ProjectInfo: {
		ClientHeading: 'project_quiz.aboutHeading',
		CompanyInfo: [
			{ id: 1, title: 'project_quiz.projectLabel', details: 'project_quiz.projectType' },
			{ id: 2, title: 'project_quiz.roleLabel', details: 'project_quiz.role' },
			{ id: 3, title: 'Website', details: 'https://verdant-gingersnap-51bad0.netlify.app/' },
			{ id: 4, title: 'GitHub', details: 'https://github.com/KarezP/Quiz-game' },
		],
		ObjectivesHeading: 'project_quiz.objectiveHeading',
		ObjectivesDetails: 'project_quiz.objective',
		Technologies: [
			{
				title: 'project_quiz.techTitle',
				techs: ['HTML', 'CSS', 'JavaScript'],
			},
		],
		ProjectDetailsHeading: 'project_quiz.detailsHeading',
		ProjectDetails: [
			{ id: 1, details: 'project_quiz.detail_1' },
			{ id: 2, details: 'project_quiz.detail_2' },
			{ id: 3, details: 'project_quiz.detail_3' },
		],
		SocialSharingHeading: 'project_quiz.shareHeading',
		SocialSharing: [
			{ id: 1, name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/' },
			{ id: 2, name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/' },
			{ id: 3, name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/' },
			{ id: 4, name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/' },
			{ id: 5, name: 'Youtube', icon: <FiYoutube />, url: 'https://youtube.com/' },
		],
	},
	RelatedProject: {
		title: 'project_quiz.relatedTitle',
		Projects: [
			{ id: 4, title: 'Weather App', img: WeatherApp },
		],
	},
};

// ✨ Export all project objects in one array
export const allProjectsData = [
  desmalProjectData,
  nandinProjectData,
  suntripProjectData,
  todoProjectData,
  weatherAppData,
  quizGameData,
];
