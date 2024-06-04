import { AppRegistry } from 'react-native';
import App from './App'; // Adjust the import path based on your project structure
import { name as appName } from './app.json'; // Adjust the import path based on your project structure

// Register the main component of your app
AppRegistry.registerComponent(appName, () => App);
