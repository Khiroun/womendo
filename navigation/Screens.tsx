import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon, Header } from "../components/";
import { materialTheme } from "../constants/";

// screens
import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import WomanScreen from "../screens/Woman";
import ManScreen from "../screens/Man";
import KidsScreen from "../screens/Kids";
import NewCollectionScreen from "../screens/NewCollection";
import DealsScreen from "../screens/Deals";

import CategoriesScreen from "../screens/Categories";
import CategoryScreen from "../screens/Category";
import ProductScreen from "../screens/Product";
import GalleryScreen from "../screens/Gallery";
import ChatScreen from "../screens/Chat";

import CartScreen from "../screens/Cart";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";

import SearchScreen from "../screens/Search";
import ComponentsScreen from "../screens/Components";

import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import NotificationsScreen from "../screens/Notifications";
import PrivacyScreen from "../screens/Privacy";
import AboutScreen from "../screens/About";
import AgreementScreen from "../screens/Agreement";

import CustomDrawerContent from "./Menu";
import { tabs } from "../constants/";
import useGetCurrentCategoryName from "../hooks/useGetCurrentCategoryName";
import appConfig from "../appConfig";
import useGetUser from "../hooks/useGetUser";
export type RootStackParamList = {
  Onboarding: undefined;
  App: undefined;
  Profile: undefined;
  Chat: undefined;
  Cart: undefined;
  Settings: undefined;
  Agreement: undefined;
  Privacy: undefined;
  About: undefined;
  Notifications: undefined;
  Components: undefined;
  Woman: undefined;
  Categories: {
    tabId?: string;
  };
  Deals: {
    tabId?: number;
  };
  Category: {
    id: string;
    title: string;
    image: string;
  };
  Product: {
    product: {
      image: string;
      title: string;
    };
  };
  Gallery: {
    images: string[];
    index?: number;
  };
  Search: undefined;
  Man: undefined;
  Kids: undefined;
  NewCollection: undefined;
  Home: undefined;
  "Sign In": undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Woman: undefined;
  Man: undefined;
  Kids: undefined;
  "New Collection": undefined;
  Profile: undefined;
  Settings: undefined;
  Components: undefined;
  "Sign In": undefined;
  "Sign Up": undefined;
};

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function ProfileStack(props) {
  const user = useGetUser();
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation }) => (
            <Header transparent title="Profile" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Cart" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  const user = useGetUser();
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Settings" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Agreement" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Privacy" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="About us" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              title="Notifications Settings"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Components" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function WomanStack(props) {
  const currentCategoryName = useGetCurrentCategoryName();
  const user = useGetUser();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Woman"
        component={WomanScreen}
        options={{
          header: ({ navigation }) => (
            <Header search options title="Woman" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                back
                title={currentCategoryName}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ManStack(props) {
  const currentCategoryName = useGetCurrentCategoryName();
  const user = useGetUser();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Man"
        component={ManScreen}
        options={{
          header: ({ navigation }) => (
            <Header search options title="Man" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                back
                title={currentCategoryName}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function KidsStack(props) {
  const currentCategoryName = useGetCurrentCategoryName();
  const user = useGetUser();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Kids"
        component={KidsScreen}
        options={{
          header: ({ navigation }) => (
            <Header search options title="Kids" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                back
                title={currentCategoryName}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NewCollectionStack(props) {
  const currentCategoryName = useGetCurrentCategoryName();
  const user = useGetUser();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="NewCollection"
        component={NewCollectionScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              search
              options
              title="New Collection"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                back
                title={currentCategoryName}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const currentCategoryName = useGetCurrentCategoryName();
  const user = useGetUser();
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              search
              title="Accueil"
              navigation={navigation}
              tabs={appConfig.categories}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.deals}
              title="Best Deals"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation }) => (
            <Header
              back
              tabs={tabs.categories}
              tabIndex={tabs.categories[1].id}
              title="Categories"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                back
                title={currentCategoryName}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          header: ({ navigation }) => (
            <Header back white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => {
            if (user) {
              return (
                <Header back title={user.userName} navigation={navigation} />
              );
            } else {
              return <Header back navigation={navigation} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Shopping Cart" navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: ({ navigation }) => (
            <Header back title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      sceneContainerStyle={{
        flex: 1,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Woman"
        component={WomanStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Man"
        component={ManStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="man"
              family="entypo"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Kids"
        component={KidsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="baby"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="New Collection"
        component={NewCollectionStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="grid-on"
              family="material"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-switch"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
