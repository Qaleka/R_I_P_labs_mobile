import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipientsListScreen from './screens/RecipientsListScreen';
import RecipientInfoScreen from './screens/RecipientInfoScreen';
import { store } from './store';
import { Provider } from 'react-redux';

global.Buffer = require('buffer').Buffer;

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    contentStyle: {
                        backgroundColor: '#FFFFFF'
                    }
                }}>
                    <Stack.Screen
                        name='RecipientsList'
                        component={RecipientsListScreen}
                        options={{
                            title: 'Список получателей',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        }}
                    />
                    <Stack.Screen
                        name='RecipientInfo'
                        component={RecipientInfoScreen}
                        options={({ route }) => ({
                            title: route.params.fio || 'Информация о получателе',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}