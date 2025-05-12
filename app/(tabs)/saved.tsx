import React, { useCallback, useState } from "react";
import { icons } from "@/constants/icons";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Movie } from "@/interfaces/interfaces";
import { getFavoriteMovies, removeFromFavorites } from "@/services/appwrite";
import { images } from "@/constants/images";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";

const Saved = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const fetchFavoriteMovies = useCallback(async () => {
    try {
      const movies = await getFavoriteMovies();
      setFavoriteMovies(movies);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  }, []);

  const handleRemoveFavorite = async (movieId: string) => {
    try {
      await removeFromFavorites(movieId);
      setFavoriteMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id.toString() !== movieId),
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies();
    }, [fetchFavoriteMovies]),
  );

  return (
    <View
      className="flex-1 bg-primary"
      accessibilityRole="none"
      accessibilityLabel="Saved movies screen"
    >
      <ImageBackground
        source={images.bg}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        resizeMode="cover"
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {favoriteMovies.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Image source={icons.save} className="w-10 h-10" tintColor="#fff" />
            <Text className="text-gray-500 text-base mt-2">
              No saved movies yet
            </Text>
          </View>
        ) : (
          <>
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Favorite Movies
            </Text>

            <FlatList
              data={favoriteMovies}
              renderItem={({ item }) => (
                <View className="w-[31%]">
                  <Link href={`/movies/${item.id}`} asChild>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      accessibilityLabel={`View ${item.title}`}
                    >
                      <View className="relative">
                        <Image
                          source={{
                            uri: item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                          }}
                          className="w-full h-40 rounded-lg"
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(item.id.toString());
                          }}
                          accessibilityLabel={`Remove ${item.title} from favorites`}
                          className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full z-10"
                        >
                          <Image
                            source={icons.remove_favorite}
                            tintColor="#FF0000"
                            className="w-8 h-8"
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        className="text-sm font-bold text-white mt-2"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View className="flex-row items-center justify-start gap-x-1">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-xs text-white font-bold uppercase">
                          {Math.round(item.vote_average / 2)}
                        </Text>
                      </View>
                      <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-light-300 font-medium mt-1">
                          {item.release_date?.split("-")[0]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
