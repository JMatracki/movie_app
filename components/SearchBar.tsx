import React from "react";
import { View, TextInput, Image } from "react-native";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onPress,
}: SearchBarProps) => {
  return (
    <View
      className="flex-row items-center bg-dark-200 rounded-full px-5 py-4"
      accessibilityRole="search"
      accessibilityLabel="Search input"
      accessibilityHint="Enter text to search for movies"
    >
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
        accessibilityLabel="Search icon"
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        accessibilityLabel="Search input field"
        accessibilityHint="Type to search for movies"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
