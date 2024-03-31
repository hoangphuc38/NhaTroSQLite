import { AppProvider } from './contexts/appContext';
import AppNavigation from './navigation/appNavigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </PaperProvider>
  );
}
