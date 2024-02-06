import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Init: undefined;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type HomeTabParamList = {
  One: undefined;
  Two: undefined;
};

type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Specifying default types for useNavigation, Link, ref etc
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

function InitScreen({navigation}: RootStackScreenProps<'Init'>): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeTab', {
        screen: 'One',
      });
    }, 300);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Initializing</Text>
    </View>
  );
}

function FirstScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>First</Text>
    </View>
  );
}

function SecondScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Second</Text>
    </View>
  );
}

function HomeTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="One" component={FirstScreen} />
      <Tab.Screen name="Two" component={SecondScreen} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Init"
          component={InitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTabScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
