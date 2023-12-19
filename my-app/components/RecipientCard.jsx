import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, React, useEffect } from 'react';
import { axiosImage, imagePlaceholder } from '../api'
import { commonStyles } from '../styles/common'

export default function RecipientCard({ navigation, ...props }) {
    // const [src, setSrc] = useState({ uri: `${imageBaseURL}/${props.uuid}.jpg` });
    // const [src, setSrc] = useState(placeholder);
    const [src, setSrc] = useState(imagePlaceholder);

    const handlePress = () => {
        navigation.navigate('RecipientInfo', { uuid: props.uuid, fio: props.fio });
    };

    useEffect(() => {
        axiosImage.get(`${props.uuid}.jpg`, { responseType: 'arraybuffer' })
            .then((response) => {
                const base64 = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
                setSrc({ uri: base64 });
            })
            .catch(error => console.log('Error loading image:', error))
    }, []);

    return (
        <View padding='0' style={[styles.card, commonStyles.rounded, commonStyles.shadow]}>
            <View style={[styles.imageWrapper, commonStyles.rounded]}>
                <Image
                    style={styles.image}
                    source={src}
                    // defaultSource={placeholder} // ignored in dev build
                    onError={() => setSrc(placeholder)}
                />
            </View>
            <View style={styles.recipient}>
                <Text style={[commonStyles.title, commonStyles.centerText]}>{props.fio}</Text>
                <Text style={[commonStyles.text, commonStyles.centerText]}>{props.email}</Text>
            </View>
            {/* <Button title='View details' onPress={handlePress} color='#460ba5' style={styles.border} /> */}
            {navigation && <TouchableOpacity
                style={[styles.button, commonStyles.rounded]}
                onPress={handlePress}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Подробнее</Text>
            </TouchableOpacity>}
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingVertical: 0,
        overflow: 'hidden',
        gap: 10,
        // flexGrow: 1,
    },
    shadow: {
        shadowColor: '#4133B7',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 10,
        padding: 10,
        borderRadius: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        overflow: 'hidden',
        aspectRatio: 16 / 9,
        margin: 0,
    },
    recipient: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 4,
        gap: 6,
    },
    button: {
        backgroundColor: '#33B2FF',
        padding: 10,
        alignItems: 'center',
    },
})
