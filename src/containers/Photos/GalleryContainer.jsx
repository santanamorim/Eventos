import React, { useState } from "react";
import { Image, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import app from "../../Firebase";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useEffect, useCallback } from "react";

export default function GalleryContainer() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPhotos() {
        try {
            const firebaseStorage = getStorage(app);
            const photosRef = ref(firebaseStorage);
            const list = await listAll(photosRef);
            const urls = [];
            for (let fileRef of list.items) {
                const photoRef = ref(firebaseStorage, fileRef);
                const url = await getDownloadURL(photoRef);
                urls.push(url);
            }
            setPhotos(urls);
            setLoading(false); 
        } catch (error) {
            console.error("Error fetching photos:", error);
            setLoading(false); 
        }
    }

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galeria de Fotos</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.photosContainer}>
                    {photos.map((uri, index) => (
                        <Image key={index} style={styles.photo} source={{ uri }} />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    photosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
    },
});