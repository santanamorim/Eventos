import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, TextInput, Dimensions } from "react-native"; // Adicionado Dimensions
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListContainer from "../containers/Events/ListContainer";
import ShowContainer from "../containers/Events/ShowContainer";

const Stack = createNativeStackNavigator();

function converter(data) {
    const ids = Object.keys(data);
    const events = Object.values(data);
    const eventsList = events.map((event, index) => {
        return {
            _id: ids[index],
            ...event
        }
    });
    return eventsList;
}

export default function EventsPage(props) {
    const { navigation } = props;
    const url = 'https://eventos-632c5-default-rtdb.firebaseio.com/';
    const resource = 'events';
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    const [filter, setFilter] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        setIsLoading(true);    
        fetch(`${url}/${resource}.json`)
            .then(res => res.json())
            .then(eventsJson => {
                const events = converter(eventsJson);
                setEvents(events);
            })
            .finally(_ => setIsLoading(false));
    }, []);

    function selectEvent(event) {
        setSelectedEvent(event._id);
    }

    useEffect(() => {
        setFilteredEvents(events.filter(event => event.name.toLowerCase().includes(filter.toLowerCase())));
    }, [filter, events]);

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 40) / 2;

    return (
        <View style={styles.container}>
            {selectedEvent === null && (
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do evento"
                    value={filter}
                    onChangeText={text => setFilter(text)}
                />
            )}
            {isLoading ? (
                <ActivityIndicator />
            ) : selectedEvent ? (
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => setSelectedEvent(null)} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </Pressable>
                    <ShowContainer id={selectedEvent} />
                </View>
            ) : (
                <ListContainer events={filteredEvents} action={selectEvent} cardWidth={cardWidth} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginBottom: 30,
        borderRadius: 10,
    },
    backButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});
