import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '../Hooks/useRoute';
import AppButton from '../components/AppButton';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
const RenderRouteBtn = ({
  title,
  iconName,
  onPress,
}: {
  title: string;
  iconName: string;
  onPress: () => void;
}) => {
  return (
    <View style={{marginVertical: 5}}>
      <AppButton icon={iconName} onPress={onPress}>
        {title}
      </AppButton>
    </View>
  );
};

const Home = () => {
  const routeArray = useRoute();
  return (
    <View style={styles.container}>
      <FlatList
        data={routeArray}
        renderItem={({item}) => <RenderRouteBtn {...item} />}
        keyExtractor={(item, index) => `${item.title}/${index}`}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...getDefaultContainerStyle().container,
  },
});
