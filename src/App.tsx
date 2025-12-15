import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ApplicantsManager } from './components';

function App() {
	return (
		<MantineProvider defaultColorScheme="auto">
			<Notifications />
			<ApplicantsManager />
		</MantineProvider>
	);
}

export default App;
