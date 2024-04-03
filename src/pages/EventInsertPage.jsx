import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Picker } from "react-native";
import { StyleSheet } from "react-native";

const DEFAULT_IMAGE_URL = "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_640.png";

export default function EventInsertPage() {
    const url = 'https://eventos-632c5-default-rtdb.firebaseio.com/';
    const resource = 'events';

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [dateDay, setDateDay] = useState("1");
    const [dateMonth, setDateMonth] = useState("1");
    const [dateYear, setDateYear] = useState("2024");
    const [price, setPrice] = useState("");
    const [msg, setMsg] = useState(null);

    const dias = Array.from({ length: 31 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }));
    const meses = Array.from({ length: 12 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }));
    const anos = Array.from({ length: 1001 }, (_, i) => ({ value: `${2000 + i}`, label: `${2000 + i}` }));

    const insertEvent = () => {
        if (!name || !description || !location || !dateDay || !dateMonth || !dateYear || !price) {
            setMsg("Por favor, preencha todos os campos.");
            return;
        }

        const newDate = new Date(dateYear, dateMonth - 1, dateDay);

        const novoHotels = [{
            address: "Contato 21 9999-9999",
            dailyRate: 0,
            name: "Entre em contato para sugestões",
            proximity: 0
        }];

        fetch(`${url}/${resource}.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                location: location,
                date: newDate,
                price: parseFloat(price),
                hotels: novoHotels,
                images: DEFAULT_IMAGE_URL
            }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao inserir evento. Por favor, tente novamente.');
            }
            return res.json();
        })
        .then(json => {
            setMsg(`Evento "${name}" inserido com sucesso.`);
            setName("");
            setDescription("");
            setLocation("");
            setDateDay("1");
            setDateMonth("1");
            setDateYear("2024");
            setPrice("");
        })
        .catch(error => setMsg(error.message));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.borderInput]}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
            />
            <TextInput
                style={[styles.input, styles.borderInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
            />
            <TextInput
                style={[styles.input, styles.borderInput]}
                value={location}
                onChangeText={setLocation}
                placeholder="Localização"
            />
            <View style={styles.dateInputContainer}>
                <Text>Data:</Text>
                <Picker
                    style={styles.dateInputPicker}
                    selectedValue={dateDay}
                    onValueChange={setDateDay}>
                    {dias.map((dia, index) =>
                        <Picker.Item key={'day_' + index} {...dia} />
                    )}
                </Picker>
                <Picker
                    style={styles.dateInputPicker}
                    selectedValue={dateMonth}
                    onValueChange={setDateMonth}>
                    {meses.map((mes, index) =>
                        <Picker.Item key={'month_' + index} {...mes} />
                    )}
                </Picker>
                <Picker
                    style={styles.dateInputPicker}
                    selectedValue={dateYear}
                    onValueChange={setDateYear}>
                    {anos.map((ano, index) =>
                        <Picker.Item key={'year_' + index} {...ano} />
                    )}
                </Picker>
            </View>
            <TextInput
                style={[styles.input, styles.borderInput]}
                value={price}
                onChangeText={setPrice}
                placeholder="Preço"
                keyboardType="decimal-pad"
            />
            <Pressable
                style={styles.btn}
                onPress={insertEvent}>
                <Text style={styles.btnLabel}>Salvar</Text>
            </Pressable>
            {msg && <Text style={styles.msg}>{msg}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: "5%",
    },
    input: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    borderInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    dateInputPicker: {
        flex: 1,
        marginHorizontal: 5,
    },
    btn: {
        backgroundColor: '#ddd',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
    },
    btnLabel: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#333',
    },
    msg: {
        marginHorizontal: 10,
        color: '#333',
        fontWeight: 'bold',
    },
});
