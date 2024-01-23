import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamsList} from '../components/navigation/TabNavigation';
import {Camera, Search} from 'lucide-react-native';
import {DataDisplay} from '../components';
import {data} from '../data';
import useAppwrite from '../appwrite/Context';
import Snackbar from 'react-native-snackbar';

type HomeProps = BottomTabScreenProps<RootStackParamsList, 'Chats'>;

const Home = ({navigation}: HomeProps) => {
  const {appwrite, setIsLoggedIn} = useAppwrite();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <View className="mr-4 flex-row gap-4">
            <TouchableOpacity>
              <Camera className="text-black/70" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Search className="text-black/70" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                appwrite.logout().then(() => {
                  setIsLoggedIn(false),
                    Snackbar.show({
                      text: 'Successfully logout',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                })
              }>
              <Image
                className="rounded-full ml-2"
                source={{
                  uri: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DataDisplay.Card
            name={item.name}
            profile={item.image_url}
            lastMessage={item.lastMessage}
            time={item.messageSendingDate}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
