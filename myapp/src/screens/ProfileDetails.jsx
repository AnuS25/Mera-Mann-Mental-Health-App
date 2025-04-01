import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ProfileDetails() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch user data on mount
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('https://mentalapp-backend.onrender.com/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Debugging logs
      console.log("Fetched user data:", response.data.user);

      // Ensure bio and profession are included and set them in state
      setUserData(response.data.user);
      setName(response.data.user.name || '');
      setBio(response.data.user.bio || '');
      setProfession(response.data.user.profession || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Save profile after editing
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const updatedData = { name, bio, profession };

      const response = await axios.put('https://mentalapp-backend.onrender.com/updateprofile', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Updated user data:", response.data); // Debug log

      // After saving, refetch the updated data to reflect changes
      await fetchUserData();  // <-- refetch the data here

      setIsEditing(false); // Exit the edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If userData state has changed, force re-render (shouldn't be necessary, but ensures UI refresh)
    console.log("User Data Updated:", userData); // Debugging line to check state changes
  }, [userData]); // This hook runs every time userData is updated.

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userData?.name || 'Profile'}</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: userData?.profileImage || 'https://path_to_a_placeholder_image.jpg' }}
          style={styles.profileImage}
        />
      </View>

      {userData ? (
        <View style={styles.infoContainer}>
          {/* Name */}
          <View style={styles.infoRow}>
            <FontAwesome5 name="user" size={24} color="#555" />
            {isEditing ? (
              <TextInput
                style={styles.infoTextInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            ) : (
              <Text style={styles.infoText}>{userData.name || 'No name provided'}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={24} color="#555" />
            <Text style={styles.infoText}>{userData.email || 'No email provided'}</Text>
          </View>

          {/* Phone */}
          <View style={styles.infoRow}>
            <FontAwesome5 name="phone" size={24} color="#555" />
            <Text style={styles.infoText}>{userData.phone || 'No phone number provided'}</Text>
          </View>

          {/* Profession */}
          <View style={styles.infoRow}>
            <FontAwesome5 name="briefcase" size={24} color="#555" />
            {isEditing ? (
              <TextInput
                style={styles.infoTextInput}
                value={profession}
                onChangeText={setProfession}
                placeholder="Enter your profession"
              />
            ) : (
              <Text style={styles.infoText}>{userData.profession || 'Not provided'}</Text>
            )}
          </View>

          {/* Bio */}
          <View style={styles.infoRow}>
            <FontAwesome5 name="info-circle" size={24} color="#555" />
            {isEditing ? (
              <TextInput
                style={styles.infoTextInput}
                value={bio}
                onChangeText={setBio}
                placeholder="Enter your bio"
              />
            ) : (
              <Text style={styles.infoText}>{userData.bio || 'No bio available'}</Text>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}

      {/* Save or Edit Profile */}
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    backgroundColor: '#6a11cb',
    padding: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    marginTop: -60,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoContainer: {
    marginTop: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 20,
    marginLeft: 12,
  },
  infoTextInput: {
    fontSize: 18,
    marginLeft: 12,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#6a11cb',
    padding: 14,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#6a11cb',
    padding: 14,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileDetails;
