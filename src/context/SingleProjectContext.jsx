import { useState, useEffect, createContext, useContext } from 'react';
import { allProjectsData as singleProjectDataJson } from '../data/singleProjectData';

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ children, projectId }) => {
	const [project, setProject] = useState(null);

	useEffect(() => {
		setProject(null); // 🔁 Nollställ först så att beroende komponenter reagerar

		const found = singleProjectDataJson.find(
			(proj) => proj.id === parseInt(projectId)
		);
		setProject(found);
	}, [projectId]);

	return (
		<SingleProjectContext.Provider value={{ project }}>
			{children}
		</SingleProjectContext.Provider>
	);
};

// Hook för att använda projektet i andra komponenter
export const useSingleProject = () => useContext(SingleProjectContext);
