import React, {useEffect} from 'react'
import BackgroundFetch from 'react-native-background-fetch'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    StatusBar,
  } from 'react-native';

const Back = () => {
   useEffect(()=>{
    initBackgroundFetch();
   },[])


    async function initBackgroundFetch() {

        const onEvent = async (taskId) => {
            console.log('[BackgroundFetch] task: ', taskId);
            // Do your background work...
            console.log('Esto es lo que haremos');
            fetch('https://pokeapi.co/api/v2/')
                .then(values => values.json())
                .then(values => {
                    console.log(values);
                })

            // IMPORTANT:  You must signal to the OS that your task is complete.
            BackgroundFetch.finish(taskId);
        }

        const onTimeout = async (taskId) => {
            console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
            BackgroundFetch.finish(taskId);
        }

        // Initialize BackgroundFetch only once when component mounts.
        let status = await BackgroundFetch.configure(
            {
                minimumFetchInterval: 15

            },
            onEvent, onTimeout);

        console.log('[BackgroundFetch] configure status: ', status);
        console.log('Es la primiera vez que curre jejejejejejeje');

        BackgroundFetch.status((status) => {
            switch (status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    console.log("BackgroundFetch restricted");
                    break;
                case BackgroundFetch.STATUS_DENIED:
                    console.log("BackgroundFetch denied");
                    break;
                case BackgroundFetch.STATUS_AVAILABLE:
                    console.log("BackgroundFetch is enabled");
                    break;
            }
        })


    }

    return (
        <>

        <View style={{flex: 1, backgroundColor: 'red'}}>
            <Text>fjsdfhsdkfhsdkfh</Text>
        </View>

        </>
    )
}

export default Back