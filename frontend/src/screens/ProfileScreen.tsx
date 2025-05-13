import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen = () => {
  const [form, setForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '9876543210', // Mobile number is non-editable
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle between read and edit modes

  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setIsEditing(false); // Switch back to read mode
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>User Profile</Text>

          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={form.firstName}
              onChangeText={(text) =>
                isEditing && setForm({ ...form, firstName: text })
              }
              placeholder="Enter your first name"
              editable={isEditing} // Editable only in edit mode
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={form.lastName}
              onChangeText={(text) =>
                isEditing && setForm({ ...form, lastName: text })
              }
              placeholder="Enter your last name"
              editable={isEditing} // Editable only in edit mode
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={form.email}
              onChangeText={(text) =>
                isEditing && setForm({ ...form, email: text })
              }
              placeholder="Enter your email"
              keyboardType="email-address"
              editable={isEditing} // Editable only in edit mode
            />
          </View>

          {/* Mobile Number (Non-editable) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={form.mobile}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              editable={false} // Always non-editable
            />
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.button}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Save' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

