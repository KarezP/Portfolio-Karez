import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

const contacts = [
	{
		id: 1,
		name: 'Stockholm, Sweden',
		icon: <FiMapPin />,
	},
	{
		id: 2,
		name: 'karezpeshawa75@gmail.com',
		icon: <FiMail />,
	},
	{
		id: 3,
		name: '+46 070 752 88 75',
		icon: <FiPhone />,
	},
];

const ContactDetails = () => {
	return (
		<div className="w-full lg:w-1/2">
			<div className="text-left max-w-xl px-6">
				<h2 className="font-general-medium text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8">
					Contact details
				</h2>
				<ul className="font-general-regular">
					{contacts.map((contact) => (
						<li className="flex items-center mb-4" key={contact.id}>
						  <i className="text-2xl text-gray-500 dark:text-gray-400 mr-4">
							{contact.icon}
						  </i>
						  {contact.name.includes('@') ? (
							<a
							  href={`mailto:${contact.name}`}
							  className="text-lg text-ternary-dark dark:text-ternary-light hover:underline"
							>
							  {contact.name}
							</a>
						  ) : contact.name.startsWith('+') || contact.name.match(/\d{3}/) ? (
							<a
							  href={`tel:${contact.name}`}
							  className="text-lg text-ternary-dark dark:text-ternary-light hover:underline"
							>
							  {contact.name}
							</a>
						  ) : (
							<span className="text-lg text-ternary-dark dark:text-ternary-light">
							  {contact.name}
							</span>
						  )}
						</li>
					  ))}
					  
				</ul>
			</div>
		</div>
	);
};

export default ContactDetails;
