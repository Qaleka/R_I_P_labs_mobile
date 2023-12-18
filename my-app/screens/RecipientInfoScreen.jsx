import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { resetRecipient, setRecipient } from '../store/recipientSlice';
import { getRecipient, imagePlaceholder, imageBaseURL } from '../api';
import { commonStyles } from '../styles/common'
import Spinner from '../components/Spinner';

export default function RecipientInfoScreen({ navigation, route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { recipient } = useSelector((store) => store.recipient);
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${uuid}.jpg` });

    // const handlePress = () => {
    //     navigation.navigate('ContainersList');
    // };

    useEffect(() => {
        getRecipient(uuid).then(data => {
            dispatch(setRecipient(data))
        })

        return () => {
            dispatch(resetRecipient());
        };
    }, [dispatch]);
    return (
        <View style={styles.ViewContent}>
            {recipient ? (
                <View>
                    {/* <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <TouchableOpacity
                            onPress={handlePress}
                        >
                            <Text style={styles.text}>Контейнеры</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}> / {container.marking}</Text>
                    </View> */}
                    <View style={[styles.card, commonStyles.shadow, commonStyles.rounded]}>
                        <View style={[styles.imageWrapper, commonStyles.rounded]}>
                            <Image
                                style={styles.image}
                                source={src}
                                onError={() => setSrc(imagePlaceholder)}
                            />
                        </View>
                        <View style={styles.recipient}>
                            <Text style={[commonStyles.title, commonStyles.centerText]}>{recipient.fio}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Почта: {recipient.mail}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Адрес: {recipient.adress}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Возраст: {recipient.age}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <Spinner />
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        padding: 10,
    },
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 0,
        overflow: 'hidden',
        gap: 14,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        overflow: 'hidden',
        aspectRatio: 16 / 10,
        margin: 0,
    },
    recipient: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 4,
        gap: 6,
    },
});