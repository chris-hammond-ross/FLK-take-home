export interface Applicant {
	id: string;
	firstName: string;
	lastName: string;
	mobile: string;
	email: string;
	isPrimary: boolean;
}

export type ApplicantField = keyof Omit<Applicant, 'id' | 'isPrimary'>;
