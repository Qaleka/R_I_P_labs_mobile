import { View, Text } from 'react-native';
import React from 'react';

export default function RecipientsScreen({ route }) {
    const { id } = route.params;
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
}