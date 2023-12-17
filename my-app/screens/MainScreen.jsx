import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../API';
import { setRecipients } from '../store/recipientSlice';
import RecipientCard from '../components/RecipientCard';

export default function MainScreen({ navigation }) {
    const dispatch = useDispatch();
    const { recipients } = useSelector((store) => store.recipient);

    useEffect(() => {
        async function getAllRecipients() {
            await axiosInstance.get('/recipient').then((response) => dispatch(setRecipients(response?.data)));
        }
        getAllRecipients();
    }, [dispatch]);

    return (
        <ScrollView>
            <View style={styles.page}>
                {!!recipients &&
                    recipients.map((recipient) => <RecipientCard key={recipient.id} {...recipient} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});