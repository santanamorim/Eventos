import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import app from '../../Firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export default function CameraContainer() {

    const [hasPermission, setPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function requestCamera() {
        const permission = await Camera.requestCameraPermissionsAsync();
        const { status } = permission;
        if (status == "granted") {
            setPermission(true);
        }
        setIsLoading(false);
    }

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            const { uri } = photo;
            setUri(uri);
        }
    }

    async function savePhoto() {
        try {
            const firebaseStorage = getStorage(app);
            const name = `photo${new Date().getTime()}.jpeg`;
            const photoRef = ref(firebaseStorage, name);
            await uploadPhoto(photoRef);
        } catch (error) {
            setMsg(error.message);
        }
    }

    async function uploadPhoto(photoRef) {
        const response = await fetch(uri);
        const photo = await response.blob();
        await uploadBytes(photoRef, photo);
        setUri(null);
        setMsg("Foto salva com sucesso!");
    }

    useEffect(() => {
        requestCamera();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {msg && <Text style={styles.message}>{msg}</Text>}
            {hasPermission && !uri && (
                <>
                    <Camera
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                        ref={(ref) => setCamera(ref)}
                    />
                    <Pressable style={styles.button} onPress={takePicture}>
                        <Text style={styles.buttonText}>Capturar</Text>
                    </Pressable>
                </>
            )}
            {uri && (
                <>
                    <Image style={styles.photo} source={{ uri }} />
                    <View style={styles.buttonGroup}>
                        <Pressable style={styles.button} onPress={savePhoto}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => setUri(null)}>
                            <Text style={styles.buttonText}>Excluir</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    photo: {
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#868784',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})