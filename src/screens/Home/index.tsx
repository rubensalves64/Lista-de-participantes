import React,{useState} from 'react';

import { FlatList, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import {Participant} from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  
  //adicionando participants
  function handleParticipantAdd() {
    if (participants.includes(participantName)) {

      //averiguando se ja ha outro com mesmo nome igual'''
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.");
    }
// para pegar os valores anteriores
    setParticipants(prevState => [...prevState, participantName]);

    // para lompa o input ao  ser recarrregado
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {

    //para informas se quer apagar o participant
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        /* aqui declara que se o filter vai percoorer o prevent e vai procurar um name retornanado todos menos o nome daqulee que passei a ser deletado*/
        onPress: () => setParticipants(prevState=>prevState.filter(participant => participant !== name))

      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Domingo, 29 de Outubro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
/*RENDErizar o texto*/
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}



//debug exemple

/*
function handleParticipantRemove(name: string) {
return console.log('nome do usuario=>' , name)
}*/