import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Image, StyleSheet, Pressable } from 'react-native';
import DetailsContainer from './DetailsContainer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GalleryContainer from './GalleryContainer';
import HotelsContainer from './HotelsContainer';

const Tabs = createBottomTabNavigator();

export default function ShowContainer(props) {
    const { id } = props;
    

    const [event, setEvent] = useState(null);
    const [image, setImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg] = useState(null);

    const voltarImage = () => {
        if (image > 0) {
            setMsg("Voltar");
            setImage(image - 1);
        }
    }

    const avancarImage = () => {
        if (image < image.length - 1) {
            setMsg("Avançar");
            setImage(image + 1);
        }
    }

    function btnImageControler(label, action) {
        return (
            <Pressable onPress={() => action()}>
                <Text>{label}</Text>
            </Pressable>
        );
    }

    useEffect(() => {
        const url = 'https://eventos-632c5-default-rtdb.firebaseio.com';
        const resource = 'events';
        fetch(`${url}/${resource}/${id}.json`)
            .then(res => res.json())
            .then(event => {
                setEvent({
                    _id: id,
                    ...event
                })
            })
            .catch(error => setMsg(error.message))
            .finally(setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator />
            ) : event ? (
                <Tabs.Navigator>
                    <Tabs.Screen name='Detalhes do Evento' component={() => <DetailsContainer event={event} />} />
                    <Tabs.Screen name='Hotéis' component={() => <HotelsContainer hotels={event.hotels || []} />} />
                </Tabs.Navigator>
            ) : (
                <Text>{msg}</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: 'cover',
    },
    imageController: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})