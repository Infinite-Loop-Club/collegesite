import * as Yup from 'yup';

export const clFormValidation = Yup.object({
	name: Yup.string().required('Required'),
	designation: Yup.string().required('Required'),
	availed_days: Yup.number()
		.required('Required')
		.min(1, 'Invalid CL count !')
		.max(50, 'Invalid CL count !'),
	no_of_days: Yup.number().required('Required'),
	// .test('test-lessThanOrEqual', 'Must be less than CL available', function checkCL(val) {
	// 	const { availed_days } = this.parent;
	// 	if (val <= availed_days) {
	// 		return true;
	// 	}
	// 	return false;
	// })
	nature_of_leave: Yup.string().required('Required'),
	department_name: Yup.string().required('Required'),
	semester_type: Yup.string().required('Required'),
	phone_number: Yup.string()
		.matches(/[6-9]{1}[0-9]{9}/, 'Invalid Number')
		.min(10, 'Phone Number must have 10 digits')
		.max(10, 'Phone Number must have 10 digits')
		.required('Required'),
	purpose_description: Yup.string()
});

export const scheduleValidation = Yup.object({
	year: Yup.string().required('Required'),
	class: Yup.string().required('Required'),
	subject: Yup.string().required('Required')
});

export const addressValidation = Yup.object({
	line1: Yup.string().required('Required'),
	line2: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
	state: Yup.string().required('Required'),
	postal_code: Yup.number()
		.required('Required')
		.typeError('Postal code can only be a number')
		.test('len', 'Invalid !', val => val?.toString().length === 6)
});
