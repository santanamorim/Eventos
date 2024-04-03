import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HotelCard from "../../components/HotelCard";

const HotelsContainer = ({ hotels }) => {
    const renderHotelCard = ({ item }) => <HotelCard hotel={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={hotels}
                renderItem={renderHotelCard}
                keyExtractor={(item) => 'hotel_' + item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HotelsContainer;
