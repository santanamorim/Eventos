import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, TouchableOpacity } from "react-native";
import Routes from "../routes";

export default function AboutPage({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Text style={styles.heading}>Elite Eventos</Text>
                <Text style={styles.description}>
                    Somos uma empresa promotora de eventos, apaixonada por criar experiências memoráveis e únicas para nossos clientes. Desde casamentos deslumbrantes até conferências corporativas inovadoras, estamos aqui para tornar seus eventos verdadeiramente especiais. Contamos com uma equipe dedicada, pronta para transformar suas ideias em realidade.
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg" }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.cardsContainer}>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.cardTitle}>Nossos Serviços</Text>
                        <Text style={styles.cardDescription}>
                            Oferecemos uma ampla gama de serviços para atender às necessidades dos nossos clientes. Desde planejamento e organização de eventos até design e decoração, estamos aqui para tornar seu evento memorável.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.cardTitle}>Entre em Contato</Text>
                        <Text style={styles.cardDescription}>
                            Entre em contato conosco para saber mais sobre nossos serviços e como podemos ajudá-lo a criar um evento excepcional que atenda às suas necessidades e expectativas. Estamos ansiosos para trabalhar com você!
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subheading}>Nossa Equipe</Text>
                <Text style={styles.teamDescription}>
                    Na nossa equipe, temos profissionais altamente qualificados e apaixonados por criar experiências excepcionais para nossos clientes. Juntos, trabalhamos para superar expectativas e transformar visões em realidade. Conheça alguns membros do nosso time:
                </Text>

                <View style={styles.team}>
                    <TouchableOpacity style={styles.teamMember}>
                        <Image
                            source={{ uri: "https://media.istockphoto.com/id/1364917563/pt/foto/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=1024x1024&w=is&k=20&c=mLxSShDLaqyr2nIkTGCg77rsv9nMfsI5FkPBZMhdfRo=" }}
                            style={styles.teamMemberImage}
                        />
                        <Text style={styles.teamMemberName}>João Silva</Text>
                        <Text style={styles.teamMemberRole}>Diretor Criativo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.teamMember}>
                        <Image
                            source={{ uri: "https://media.istockphoto.com/id/1136973026/pt/foto/beautiful-days-outside-with-a-beautiful-soul.jpg?s=1024x1024&w=is&k=20&c=qZE1yRtIqU9ftpIkv8XMpATLiLyGil_mNDENPOSsl70=" }}
                            style={styles.teamMemberImage}
                        />
                        <Text style={styles.teamMemberName}>Maria Souza</Text>
                        <Text style={styles.teamMemberRole}>Coordenadora de Eventos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.teamMember}>
                        <Image
                            source={{ uri: "https://media.istockphoto.com/id/1491007211/pt/foto/studio-portrait-of-a-handsome-man-with-arms-crossed-over-white-background.jpg?s=1024x1024&w=is&k=20&c=slH_vo4Rd_RI5g9xTYH9Y-UCKE9zQLqQ2VYd1NbZ97k=" }}
                            style={styles.teamMemberImage}
                        />
                        <Text style={styles.teamMemberName}>Pedro Oliveira</Text>
                        <Text style={styles.teamMemberRole}>Designer de Eventos</Text>
                    </TouchableOpacity>
                </View>

                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate(Routes.EventsPage);
                    }}
                >
                    <Text style={styles.buttonText}>Ver Eventos Disponíveis</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f7f7f7",
        paddingVertical: 30,
    },
    content: {
        width: "90%",
        alignSelf: "center",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#333",
    },
    description: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "justify",
        color: "#555",
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 10,
    },
    subheading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#333",
        textAlign: "center",
    },
    teamDescription: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "justify",
        color: "#666",
    },
    team: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 25,
    },
    teamMember: {
        alignItems: "center",
        marginBottom: 25,
    },
    teamMemberImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    teamMemberName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#333",
    },
    teamMemberRole: {
        fontSize: 18,
        color: "#555",
        textAlign: "center",
    },
    cardsContainer: {
        marginBottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "48%",
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 18,
        color: "#555",
        textAlign: "justify",
    },
    button: {
        backgroundColor: "#8a7b9e",
        paddingVertical: 14,
        paddingHorizontal: 42,
        borderRadius: 25,
        alignSelf: "center",
        marginBottom: 25,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
