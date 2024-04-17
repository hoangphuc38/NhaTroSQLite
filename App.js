import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './contexts/appContext';
import StackNavigation from './navigation/appNavigation';
import AppNavigation from './navigation/appNavigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppProvider>
          <StackNavigation />
        </AppProvider>
      </PaperProvider>
    </NavigationContainer>

  );
}
