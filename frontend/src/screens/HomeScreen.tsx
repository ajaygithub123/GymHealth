import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTab, WishlistTab, CartTab, SearchTab, SettingTab } from '../tabs';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { icons } from '../constants';
import { useNavigation } from '@react-navigation/native';

type TabBarItemProps = {
  source: any; // Adjust type according to your image sources
  focused: boolean;
  cart?: boolean;
  name?: string;
};

const TabBarItem: React.FC<TabBarItemProps> = ({
  source,
  focused,
  cart,
  name,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: cart ? -24 : 18,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: cart ? 64 : 'auto',
          height: cart ? 64 : 'auto',
          borderRadius: cart ? 32 : 0,
          backgroundColor: focused ? (cart ? 'red' : 'white') : 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: cart ? 5 : 0,
        }}>
        <Image
          source={source}
          style={{
            tintColor: focused ? (cart ? 'white' : 'red') : 'black',
            width: 28,
            height: 28,
          }}
        />
      </View>
      {!cart && (
        <Text
          className="font-pthin text-base"
          style={{ color: focused ? 'red' : 'black', fontSize: 12 }}>
          {name}
        </Text>
      )}
    </View>
  );
};

type Props = {};
export type RouteTabsParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Search: undefined;
  Setting: undefined;
  ProductDetail: { product: any }; // Add ProductDetail route with product data
};

const HomeScreen = (props: Props) => {
  const Tab = createBottomTabNavigator<RouteTabsParamList>();
  const navigation = useNavigation();

  const handleProfileClick = () => {
    navigation.navigate('ProductList', {
      product: {
        id: 1,
        title: 'Sample Product',
        description: 'This is a sample product description.',
        price: 100,
        image: ['https://via.placeholder.com/150'],
        stars: 4.5,
        numberOfReview: 120,
      },
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={handleProfileClick}>
            <Image
              source={icons.profile}
              style={{ width: 30, height: 30, marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: 'grey',
          height: 70,
          borderTopWidth: 0.2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem source={icons.home} focused={focused} name="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.heart}
              focused={focused}
              name="Wishlist"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.cart}
              focused={focused}
              cart
              name="Cart"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem source={icons.search} focused={focused} name="Search" />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.setting}
              focused={focused}
              name="Setting"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;