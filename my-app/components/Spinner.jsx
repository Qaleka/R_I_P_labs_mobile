import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Spinner() {
    return (
        <View style={styles.ActivityWrapper}>
            <ActivityIndicator size="large" color="#33B2FF" />
        </View >
    )
}

const styles = StyleSheet.create({
    ActivityWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});