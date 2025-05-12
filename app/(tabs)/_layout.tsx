import { Tabs } from "expo-router";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Platform,
  ViewStyle,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useMemo } from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { TabIconProps } from "@/interfaces/interfaces";

const tabBarStyle: ViewStyle = {
  backgroundColor: "#0F0D23",
  borderRadius: 50,
  marginHorizontal: 20,
  height: 52,
  position: "absolute",
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#0F0D23",
  paddingBottom: 15,
};

const tabBarItemStyle: ViewStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const TabIcon = React.memo(({ focused, icon, title }: TabIconProps) => {
  const iconContent = useMemo(
    () => (
      <Image
        source={icon}
        tintColor={focused ? "#151312" : "#A8B5DB"}
        className="size-5"
      />
    ),
    [icon, focused],
  );

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        {iconContent}
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      {iconContent}
    </View>
  );
});

TabIcon.displayName = "TabIcon";

export default function TabsLayout() {
  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      tabBarShowLabel: false,
      tabBarItemStyle,
      tabBarStyle: {
        ...tabBarStyle,
        marginBottom: Platform.OS === "android" ? 56 : 36,
      },
    }),
    [],
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
