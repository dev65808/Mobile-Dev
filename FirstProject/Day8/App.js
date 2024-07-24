import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Button, Image, ImageBackground, SectionList, Switch } from 'react-native';
import styles from './styles';

const App = () => {
  const [page, setPage] = useState('gettingStarted');
  const [userDetails, setUserDetails] = useState({});
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', email: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSignUpChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleLoginChange = (name, value) => {
    setLoginForm({ ...loginForm, [name]: value });
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

    setUserDetails({ username, password, email });
    setForm({ username: '', password: '', confirmPassword: '', email: '' });
    setPage('login');
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
      setPage('welcome');
      Alert.alert('Logged in successfully!');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  const logout = () => {
    setPage('gettingStarted');
    setLoginForm({ username: '', password: '' });
  };
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
  
  const renderProduct = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <Text style={[styles.cardTitle, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.title}</Text>
    <Text style={{ color: isSwitchOn ? '#fff' : '#000' }}>{item.description}</Text>
    <Text style={[styles.cardPrice, { color: isSwitchOn ? '#fff' : '#000' }]}>{item.price}</Text>
  </View>
  );
  const renderSectiontHeader = ({ section: { title } }) => (
    <Text style={[styles.sectionHeader, { color: isSwitchOn ? '#fff' : '#000' }]}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      {page === 'gettingStarted' && (
        <ImageBackground source={{uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg'}} style={styles.backgroundImage}>
        <View style={styles.page}>
          <Text style={styles.title}>Getting Started</Text>
          <Button title="Get Started" onPress={() => setPage('signUp')} />
        </View>
        </ImageBackground>
      )}

      {page === 'signUp' && (
        <ImageBackground source={{uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg'}} style={styles.backgroundImage}>
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
      )}

      {page === 'login' && (
        <ImageBackground source={{uri: 'https://i.pinimg.com/originals/77/c6/a5/77c6a58ab780f042be17ccc15fe06ac1.jpg'}} style={styles.backgroundImage}>
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
      )}

      {page === 'welcome' && (
        <View style={[styles.page, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
        <Text style={[styles.title, { color: isSwitchOn ? '#fff' : '#000' }]}>Welcome, {userDetails.username}!</Text>
        <Text style={[styles.welcomeText, { color: isSwitchOn ? '#fff' : '#000' }]}>Welcome to the app!</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isSwitchOn}
        />
        <Button title="Go to Product Page" onPress={() => setPage('product')} style={styles.buttonSpacing} />
        <View style={styles.buttonSpacing} />
        <Button title="Logout" onPress={logout} style={styles.buttonSpacing} />
      </View>
      )}

      {page === 'product' && (
         <View style={[styles.page, { backgroundColor: isSwitchOn ? '#000' : '#fff' }]}>
         <Text style={[styles.title, { color: isSwitchOn ? '#fff' : '#000' }]}>Products for {userDetails.username}</Text>
         <Switch
           trackColor={{ false: '#767577', true: '#81b0ff' }}
           thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
           onValueChange={toggleSwitch}
           value={isSwitchOn}
          />
          <SectionList
            sections={sections}
            renderItem={renderProduct}
            renderSectionHeader={renderSectiontHeader}
            keyExtractor={(item) => item.id}
            />
          <Button title="Logout" onPress={logout} />
        </View>
      )}
    </View>
  );
};

export default App;