import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { CustomButton, FormField } from '../components';

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
        <View className="px-5 flex-1 bg-white pt-5">
          <Text className="text-4xl font-bold text-start mb-5">
            User Profile
          </Text>

          {/* First Name */}
          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(text: string) =>
              isEditing && setForm({ ...form, firstName: text })
            }
            placeholder="Enter your first name"
            otherStyles="mt-5"
            editable={isEditing} // Editable only in edit mode
          />

          {/* Last Name */}
          <FormField
            title="Last Name"
            value={form.lastName}
            handleChangeText={(text: string) =>
              isEditing && setForm({ ...form, lastName: text })
            }
            placeholder="Enter your last name"
            otherStyles="mt-5"
            editable={isEditing} // Editable only in edit mode
          />

          {/* Email */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text: string) =>
              isEditing && setForm({ ...form, email: text })
            }
            placeholder="Enter your email"
            otherStyles="mt-5"
            keyboardType="email-address"
            editable={isEditing} // Editable only in edit mode
          />

          {/* Mobile Number (Non-editable) */}
          <FormField
            title="Mobile Number"
            value={form.mobile}
            handleChangeText={() => {}}
            placeholder="Enter mobile number"
            otherStyles="mt-5"
            keyboardType="phone-pad"
            editable={false} // Always non-editable
          />

          {/* Action Buttons */}
          {isEditing ? (
            <CustomButton
              title="Save"
              handlePress={handleSave}
              containerStyle="mt-10 py-5"
            />
          ) : (
            <CustomButton
              title="Edit Profile"
              handlePress={() => setIsEditing(true)}
              containerStyle="mt-10 py-5"
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;