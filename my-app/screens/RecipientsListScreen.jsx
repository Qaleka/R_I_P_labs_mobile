import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllRecipients } from '../api';
import { setRecipients, setSearch } from '../store/recipientSlice';
import RecipientCard from '../components/RecipientCard';
import Spinner from '../components/Spinner';
import { commonStyles } from '../styles/common'

export default function RecipientsListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { recipients } = useSelector((store) => store.recipient);
    const { searchText } = useSelector((store) => store.recipient);

    useEffect(() => {
        getAllRecipients(searchText).then(data => {
            dispatch(setRecipients(data?.recipients))
        })
    }, [dispatch]);

    const handleSearch = () => {
        getAllRecipients(searchText).then(data => {
            dispatch(setRecipients(data?.recipients))
        })
    };

    return (
        <ScrollView contentRecipientStyle={styles.scrollViewContent}>
            <View style={styles.recipient}>
                <TextInput
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="ФИО"
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearch(text))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={[styles.button, commonStyles.rounded_sm, commonStyles.shadow]} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>
            {recipients && recipients.length > 0 ? (
                recipients.map((recipient) => <RecipientCard key={recipient.uuid} {...{ uuid: recipient.uuid, fio: recipient.fio, email: recipient.email }} style={commonStyles.shadow} navigation={navigation} />)
            ) : (
                !recipients && <Spinner />
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
        gap: 100,
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        backgroundColor: '#77777B',
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginRight: 8,
        color: 'white',
        fontSize: 14,
    },
    recipient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 16,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#33B2FF',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        // fontWeight: 'bold',
    },
});