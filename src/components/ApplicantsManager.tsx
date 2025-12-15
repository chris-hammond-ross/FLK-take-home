import { useState, useRef } from 'react';
import {
	Stack,
	Button,
	Title,
	Text,
	Container,
	Paper,
	Group,
	ScrollArea,
	useMantineColorScheme
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { ApplicantForm, ThemeToggle } from '../components';
import type { ApplicantFormRef } from './ApplicantForm';
import { Plus, SendHorizonal } from 'lucide-react';
import type { Applicant, ApplicantField } from '../types';

function generateId(): string {
	return Math.random().toString(36).substring(2, 11);
}

function createEmptyApplicant(isPrimary: boolean = false): Applicant {
	return {
		id: generateId(),
		firstName: '',
		lastName: '',
		mobile: '',
		email: '',
		isPrimary,
	};
}

export function ApplicantsManager() {
	const [applicants, setApplicants] = useState<Applicant[]>([
		createEmptyApplicant(true),
	]);
	const formRefs = useRef<Map<string, ApplicantFormRef>>(new Map());

	const { colorScheme } = useMantineColorScheme();
	const isMobile = useMediaQuery('(max-width: 768px)');

	const setFormRef = (id: string, ref: ApplicantFormRef | null) => {
		if (ref) {
			formRefs.current.set(id, ref);
		} else {
			formRefs.current.delete(id);
		}
	};

	const handleAddApplicant = () => {
		setApplicants((prev) => [...prev, createEmptyApplicant()]);
	};

	const handleDeleteApplicant = (id: string) => {
		setApplicants((prev) => {
			const applicantToDelete = prev.find((a) => a.id === id);
			const remaining = prev.filter((a) => a.id !== id);

			if (applicantToDelete?.isPrimary && remaining.length > 0) {
				remaining[0].isPrimary = true;
			}

			return remaining;
		});
	};

	const handleUpdateApplicant = (
		id: string,
		field: ApplicantField,
		value: string
	) => {
		setApplicants((prev) =>
			prev.map((applicant) =>
				applicant.id === id ? { ...applicant, [field]: value } : applicant
			)
		);
	};

	const handleSetPrimary = (id: string) => {
		setApplicants((prev) =>
			prev.map((applicant) => ({
				...applicant,
				isPrimary: applicant.id === id,
			}))
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let allValid = true;
		for (const applicant of applicants) {
			const formRef = formRefs.current.get(applicant.id);
			if (formRef && !formRef.validate()) {
				allValid = false;
			}
		}

		if (!allValid) {
			return;
		}

		console.log('Form submitted:', applicants);
		notifications.show({
			color: 'teal',
			message: 'Form submitted! Check the console for applicant data',
			position: 'top-right',
			autoClose: 2000
		});
	};

	const canChangePrimary = applicants.length > 1;

	return (
		<Container
			size="sm"
			py={isMobile ? 'xs' : 'xl'}
			mah="100dvh"
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<Paper
				shadow="0"
				p={isMobile ? 'sm' : 'xl'}
				radius="md"
				withBorder={isMobile ? undefined : true}
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					minHeight: 0
				}}
			>
				<form
					onSubmit={handleSubmit}
					noValidate
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						minHeight: 0
					}}
				>
					<Stack gap="lg" style={{ flex: 1, minHeight: 0 }}>
						{/* Header - fixed height */}
						<Stack gap={isMobile ? 'xs' : 'md'}>
							<Group justify="space-between">
								<Title order={isMobile ? 3 : 1} mb="xs">
									Applicant Details
								</Title>
								<ThemeToggle />
							</Group>

							<Text c="dimmed" size={isMobile ? 'sm' : 'md'}>
								Enter the details for each applicant. At least one applicant is
								required, and one must be designated as the primary applicant.
							</Text>
							<Button
								variant="light"
								color="blue"
								leftSection={<Plus size={16} />}
								onClick={handleAddApplicant}
							>
								Add Applicant
							</Button>
						</Stack>

						{/* Scrollable area - takes remaining space */}
						<ScrollArea.Autosize
							scrollbarSize={4}
							scrollHideDelay={500}
							style={{
								flex: 1,
								minHeight: 0
							}}
						>
							<Stack gap="md">
								{applicants.map((applicant, index) => (
									<ApplicantForm
										key={applicant.id}
										ref={(ref) => setFormRef(applicant.id, ref)}
										applicant={applicant}
										index={index}
										canDelete={applicants.length > 1}
										canChangePrimary={canChangePrimary}
										onUpdate={handleUpdateApplicant}
										onDelete={handleDeleteApplicant}
										onSetPrimary={handleSetPrimary}
									/>
								))}
							</Stack>
						</ScrollArea.Autosize>

						{/* Buttons - fixed at bottom */}
						<Stack>

							<Button
								variant={colorScheme === 'light' ? 'filled' : 'light'}
								color="cyan"
								leftSection={<SendHorizonal size={16} />}
								type="submit"
								size="lg"
							>
								Submit Application
							</Button>
						</Stack>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}