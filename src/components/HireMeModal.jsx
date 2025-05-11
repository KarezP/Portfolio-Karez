import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './reusable/Button';
import { useTranslation } from 'react-i18next';

const selectOptions = [
	'Web Application',
	'Mobile Application',
	'UI/UX Design',
	'Branding',
];

const HireMeModal = ({ onClose }) => {
	const { t } = useTranslation();
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_ludcgjp',        // ✅ Din service ID
				'template_g7x4qng',       // ✅ Din template ID
				form.current,
				'qtMIvX9AukzNkXKgJ'       // ✅ Din public key
			)
			.then(() => {
				alert('Message sent successfully!');
				form.current.reset();
				onClose(); // stäng modalen
			})
			.catch((error) => {
				alert('Failed to send message. Try again.');
				console.error(error);
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="font-general-medium fixed inset-0 z-30 transition-all duration-500"
		>
			{/* Modal Backdrop */}
			<div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>

			{/* Modal Content */}
			<main className="flex flex-col items-center justify-center h-full w-full">
				<div className="modal-wrapper flex items-center z-30">
					<div className="modal max-w-md mx-5 xl:max-w-xl bg-secondary-light dark:bg-primary-dark shadow-lg rounded-lg relative">
						<div className="modal-header flex justify-between p-5 border-b border-ternary-light dark:border-ternary-dark">
							<h5 className="text-primary-dark dark:text-primary-light text-xl">
								{t('hireMeModal.title')}	
							</h5>
							<button onClick={onClose} className="text-3xl text-primary-dark dark:text-primary-light">
								<FiX />
							</button>
						</div>

						<div className="modal-body p-5">
							<form ref={form} onSubmit={sendEmail} className="space-y-6 text-left">
								<input
									name="name"
									type="text"
									required
									placeholder={t('hireMeModal.name')}
									className="w-full px-4 py-2 border rounded-md bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
								/>
								<input
									name="email"
									type="email"
									required
									placeholder={t('hireMeModal.email')}
									className="w-full px-4 py-2 border rounded-md bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
								/>
								<select
									name="subject"
									required
									className="w-full px-4 py-2 border rounded-md bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
								>
									<option value="">{t('hireMeModal.select')}</option>
									{selectOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<textarea
									name="message"
									rows="6"
									required
									placeholder={t('hireMeModal.description')}
									className="w-full px-4 py-2 border rounded-md bg-ternary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
								></textarea>

								<div className="flex justify-between">
									<button
										type="submit"
										className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
									>
										<Button title={t('hireMeModal.send')} />
									</button>
									<button
										type="button"
										onClick={onClose}
										className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
									>
										<Button title={t('hireMeModal.close')} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</motion.div>
	);
};

export default HireMeModal;
