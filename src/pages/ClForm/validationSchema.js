import * as Yup from 'yup';

export const clFormValidation = Yup.object({
	name: Yup.string().required('Required'),
	designation: Yup.string().required('Required'),
	clAvailable: Yup.number().required('Required'),
	clRequired: Yup.number().required('Required'),
	email: Yup.string().email('Invalid Email').required('Required'),
	mailTo: Yup.string().email('Invalid Email').required('Required'),
	phoneNumber: Yup.string()
		.matches(/[6-9]{1}[0-9]{9}/, 'Invalid Number')
		.min(10, 'Phone Number must have 10 digits')
		.max(10, 'Phone Number must have 10 digits')
		.required('Required')
});

export const scheduleValidation = Yup.object({
	hour: Yup.number().required('Required'),
	year: Yup.number().required('Required'),
	class: Yup.string().required('Required'),
	subject: Yup.string().required('Required'),
	faculty: Yup.string().required('Required')
});
