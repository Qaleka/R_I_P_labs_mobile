import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RecipientsScreen from './screens/RecipientsScreen';
import { recipients } from './recipients';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <Provider recipients={recipients}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Main' component={MainScreen} />
                <Stack.Screen name='Recipients' component={RecipientsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
}