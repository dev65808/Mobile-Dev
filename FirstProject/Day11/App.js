import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Alert, TouchableOpacity, Button, Image, ImageBackground, SectionList, Switch } from 'react-native';
import styles from './styles';
import { FavoriteContext, FavoriteProvider } from './FavoriteContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const GettingStartedScreen = ({ navigation }) => (
  <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg' }} style={styles.backgroundImage}>
    <View style={styles.page}>
      <Text style={styles.title}>Getting Started</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('SignUp')} />
    </View>
  </ImageBackground>
);

const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', email: '' });

  const handleSignUpChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const signUp = () => {
    const { username, password, confirmPassword, email } = form;

    if (!username) {
      Alert.alert('Error', 'Username is required');
      return;
    }
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Password and confirm password are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    navigation.navigate('Login', { userDetails: { username, password, email } });
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg' }} style={styles.backgroundImage}>
      <View style={styles.page}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={form.username}
          onChangeText={(value) => handleSignUpChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleSignUpChange('password', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(value) => handleSignUpChange('confirmPassword', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => handleSignUpChange('email', value)}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={signUp}>
          <Text style={styles.buttonText}>Register yourself!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const LoginScreen = ({ route, navigation }) => {
  const { userDetails } = route.params;
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLoginChange = (name, value) => {
    setLoginForm({ ...loginForm, [name]: value });
  };

  const login = () => {
    const { username, password } = loginForm;

    if (!username) {
      Alert.alert('Error', 'Username is required');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    if (username === userDetails.username && password === userDetails.password) {
      navigation.navigate('Welcome', { username });
      Alert.alert('Logged in successfully!');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg' }} style={styles.backgroundImage}>
      <View style={styles.page}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={loginForm.username}
          onChangeText={(value) => handleLoginChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={loginForm.password}
          onChangeText={(value) => handleLoginChange('password', value)}
        />
        <Button title="Login" onPress={login} />
      </View>
    </ImageBackground>
  );
};

const WelcomeScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setIsSwitchOn(previousState => !previousState);
  };

  return (
    <View style={[styles.page, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isSwitchOn ? '#fff' : '#000' }]}>Welcome, {username}!</Text>
      <Text style={[styles.welcomeText, { color: isSwitchOn ? '#fff' : '#000' }]}>Welcome to the app!</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isSwitchOn}
      />
      <Button title="Go to Product Page" onPress={() => navigation.navigate('Product', { username, isSwitchOn })} style={styles.buttonSpacing} />
      <View style={styles.buttonSpacing} />
      <Button title="Logout" onPress={() => navigation.navigate('GettingStarted')} style={styles.buttonSpacing} />
    </View>
  );
};

const ProductScreen = ({ route, navigation }) => {
  const { username, isSwitchOn: initialSwitchState } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(initialSwitchState);

  const toggleSwitch = () => {
    setIsSwitchOn(previousState => !previousState);
  };

  const sections = [
    {
      title: 'Electronics',
      data: [
        {
          id: '1',
          title: 'Smartphone',
          description: 'A high-end smartphone with a sleek design and powerful features.',
          image: 'https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?size=626&ext=jpg',
          price: '$799'
        },
        {
          id: '2',
          title: 'Laptop',
          description: 'A lightweight laptop with a high-resolution display and long battery life.',
          image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA=',
          price: '$999'
        }
      ]
    },
    {
      title: 'Shoes',
      data: [
        {
          id: '3',
          title: 'Running Shoes',
          description: 'Lightweight and comfortable running shoes for all terrains.',
          image: 'https://img.freepik.com/free-photo/fashion-shoes-sneakers_1203-7529.jpg?size=626&ext=jpg',
          price: '$120'
        },
        {
          id: '4',
          title: 'Sneakers',
          description: 'Stylish sneakers for everyday wear.',
          image: 'https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925_640.jpg',
          price: '$80'
        }
      ]
    }
  ];

  const renderProduct = ({ item }) => {
    const { addFavorite } = useContext(FavoriteContext);

    return (
      <View style={[styles.card, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Text style={[styles.cardTitle, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={{ color: isSwitchOn ? '#fff' : '#000' }}>{item.description}</Text>
        <Text style={[styles.cardPrice, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.price}</Text>
        <Button title="Add to Favorites" onPress={() => addFavorite(item)} />
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={[styles.sectionHeader, { color: isSwitchOn ? '#fff' : '#000' }]}>{title}</Text>
  );

  return (
    <View style={[styles.page, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isSwitchOn ? '#fff' : '#000' }]}>Products for {username}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isSwitchOn}
      />
      <SectionList
        sections={sections}
        renderItem={renderProduct}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
      />
      <Button title="Favorites" onPress={() => navigation.navigate('Favorites', { username })} />
      <View style={styles.buttonSpacing} />
      <Button title="Logout" onPress={() => navigation.navigate('GettingStarted')} />
    </View>
  );
};

const FavoritesScreen = ({ route, navigation }) => {
  const { username, isSwitchOn: initialSwitchState } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(initialSwitchState);

  const toggleSwitch = () => {
    setIsSwitchOn(previousState => !previousState);
  };

  const { favorites, removeFavorite } = useContext(FavoriteContext);

  const renderFavorite = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={[styles.cardTitle, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.title}</Text>
      <Text style={{ color: isSwitchOn ? '#fff' : '#000' }}>{item.description}</Text>
      <Text style={[styles.cardPrice, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.price}</Text>
      <Button title="Remove from Favorites" onPress={() => removeFavorite(item.id)} />
    </View>
  );

  return (
    <View style={[styles.page, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: isSwitchOn ? '#fff' : '#000' }]}>Favorites</Text>
      {favorites.length > 0 ? (
        <SectionList
          sections={[{ title: 'Favorites', data: favorites }]}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{ color: isSwitchOn ? '#fff' : '#000' }}>No favorites added yet.</Text>
      )}
      <Button title="Back to Products" onPress={() => navigation.navigate('Product', { username, isSwitchOn })} />
    </View>
  );
};

const App = () => {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GettingStarted">
          <Stack.Screen name="GettingStarted" component={GettingStartedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Products' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
};

export default App;