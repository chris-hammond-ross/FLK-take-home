import { useEffect, useImperativeHandle, forwardRef } from 'react';
import {
	Card,
	TextInput,
	Checkbox,
	Group,
	ActionIcon,
	Badge,
	Stack,
	SimpleGrid,
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { Trash } from 'lucide-react';
import type { Applicant, ApplicantField } from '../types';

interface ApplicantFormProps {
	applicant: Applicant;
	index: number;
	canDelete: boolean;
	canChangePrimary: boolean;
	onUpdate: (id: string, field: ApplicantField, value: string) => void;
	onDelete: (id: string) => void;
	onSetPrimary: (id: string) => void;
}

export interface ApplicantFormRef {
	validate: () => boolean;
}

export const ApplicantForm = forwardRef<ApplicantFormRef, ApplicantFormProps>(
	function ApplicantForm(
		{
			applicant,
			index,
			canDelete,
			canChangePrimary,
			onUpdate,
			onDelete,
			onSetPrimary,
		},
		ref
	) {
		const form = useForm({
			mode: 'uncontrolled',
			initialValues: {
				firstName: applicant.firstName,
				lastName: applicant.lastName,
				mobile: applicant.mobile,
				email: applicant.email,
			},
			validate: {
				firstName: isNotEmpty('First name is required'),
				lastName: isNotEmpty('Last name is required'),
				email: (value) => {
					const notEmptyError = isNotEmpty('Email is required')(value);
					if (notEmptyError) return notEmptyError;

					const emailError = isEmail('Invalid email address')(value);
					if (emailError) return emailError;

					return null;
				},
				mobile: (value) => {
					const notEmptyError = isNotEmpty('Mobile number is required')(value);
					if (notEmptyError) return notEmptyError;

					if (!/^\d{10}$/.test(value)) return 'Mobile number must be 10 digits';

					return null;
				},
			},
		});

		useImperativeHandle(ref, () => ({
			validate: () => form.validate().hasErrors === false,
		}));

		useEffect(() => {
			form.setValues({
				firstName: applicant.firstName,
				lastName: applicant.lastName,
				mobile: applicant.mobile,
				email: applicant.email,
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [applicant.id]);

		const handleChange = (field: ApplicantField, value: string) => {
			onUpdate(applicant.id, field, value);
		};

		return (
			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Group justify="space-between" mb="md">
					<Group gap="sm">
						<Badge variant="light" size="lg">
							Applicant {index + 1}
						</Badge>
						{applicant.isPrimary && (
							<Badge color="teal" variant="light" size="sm">
								Primary
							</Badge>
						)}
					</Group>
					{canDelete && (
						<ActionIcon
							variant="light"
							color="red"
							onClick={() => onDelete(applicant.id)}
							aria-label="Remove applicant"
						>
							<Trash size={16} />
						</ActionIcon>
					)}
				</Group>

				<Stack gap="md">
					<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
						<TextInput
							label="First name"
							placeholder="Enter first name"
							required
							key={form.key('firstName')}
							{...form.getInputProps('firstName')}
							onChange={(e) => {
								form.getInputProps('firstName').onChange(e);
								handleChange('firstName', e.target.value);
							}}
						/>
						<TextInput
							label="Last name"
							placeholder="Enter last name"
							required
							key={form.key('lastName')}
							{...form.getInputProps('lastName')}
							onChange={(e) => {
								form.getInputProps('lastName').onChange(e);
								handleChange('lastName', e.target.value);
							}}
						/>
					</SimpleGrid>

					<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
						<TextInput
							minLength={10}
							maxLength={10}
							label="Mobile number"
							placeholder="Enter mobile number"
							required
							key={form.key('mobile')}
							{...form.getInputProps('mobile')}
							onChange={(e) => {
								form.getInputProps('mobile').onChange(e);
								handleChange('mobile', e.target.value);
							}}
						/>
						<TextInput
							label="Email"
							placeholder="Enter email address"
							type="email"
							required
							key={form.key('email')}
							{...form.getInputProps('email')}
							onChange={(e) => {
								form.getInputProps('email').onChange(e);
								handleChange('email', e.target.value);
							}}
						/>
					</SimpleGrid>

					<Checkbox
						variant='outline'
						label="Primary applicant"
						checked={applicant.isPrimary}
						onChange={() => onSetPrimary(applicant.id)}
						disabled={applicant.isPrimary && !canChangePrimary}
						description={
							applicant.isPrimary && !canChangePrimary
								? 'At least one applicant must be primary'
								: undefined
						}
					/>
				</Stack>
			</Card>
		);
	}
);