import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './contexts/appContext';
import StackNavigation from './navigation/appNavigation';
import { PaperProvider } from 'react-native-paper';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

const loadDatabase = async () => {
  const dbName = "NhaTroDB.db";
  const dbAsset = require("./assets/database/NhaTroDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    try {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true }
      );
      await FileSystem.downloadAsync(dbUri, dbFilePath);
      console.log("Download database successfully");
    } catch (error) {
      console.error("Error downloading database:", error);
    }
  } else {
    console.log("Database file exists.", fileInfo);
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDatabase()
      .then(() => setLoading(false))
      .catch((e) => console.error(e))
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Suspense
        fallback={
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size={"large"} />
          </View>
        }
      >
        <SQLiteProvider databaseName="NhaTroDB.db" useSuspense>
          <PaperProvider>
            <AppProvider>
              <StackNavigation />
            </AppProvider>
          </PaperProvider>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}
