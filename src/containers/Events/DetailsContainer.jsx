import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';

export default function DetailsContainer({ event }) {
    const { name, description, images, date, location, price } = event;
    
    const formatDate = (timestamp) => {
        const eventDate = new Date(timestamp);
        return eventDate.toLocaleDateString(); 
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: images[0] }} />
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Nome:</Text>
                    <Text style={styles.description}>{name}</Text>
                    <Text style={styles.subtitle}>Descrição:</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.subtitle}>Localização:</Text>
                    <Text style={styles.location}>{location}</Text>
                    <Text style={styles.subtitle}>Data</Text>
                    <Text style={styles.date}>{formatDate(date)}</Text>
                    <Text style={styles.subtitle}>Preço:</Text>
                    <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    description: {
        fontSize: 16,
        marginBottom: 12,
        color: '#555555',
    },
    location: {
        fontSize: 16,
        marginBottom: 12,
        color: '#555555',
    },
    date: {
        fontSize: 16,
        marginBottom: 12,
        color: '#555555',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#ff4500',
    },
});
