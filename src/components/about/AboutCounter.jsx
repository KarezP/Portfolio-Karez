import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';


const AboutCounter = () => {
	useCountUp({ ref: 'experienceCounter', end: 1, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: 6, duration: 2 });

	return (
		<div className="mt-10 sm:mt-20 bg-white dark:bg-ternary-dark shadow-md py-12">
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
				<CounterItem
					title="Year of Experience"
					counter={<span id="experienceCounter" className="text-4xl font-bold text-primary-dark dark:text-primary-light" />}
					measurement=""
				/>

				<CounterItem
					title="Projects Completed"
					counter={<span id="projectsCounter" className="text-4xl font-bold text-primary-dark dark:text-primary-light" />}
					measurement=""
				/>
			</div>
		</div>
	);
};

export default AboutCounter;



