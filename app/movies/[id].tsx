import React from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { MovieDetails, MovieInfoProps } from "@/interfaces/interfaces";
import { fetchMovieDetails } from "@/services/api";
import {
  addToFavorite,
  checkIfIsFavorite,
  removeFromFavorites,
} from "@/services/appwrite";
import { useCallback, useEffect, useState } from "react";

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data: movie, loading } = useFetch<MovieDetails>(() =>
    fetchMovieDetails(id as string),
  );

  useEffect(() => {
    if (!id) return;
    const checkFavoriteStatus = async () => {
      try {
        const isFav = await checkIfIsFavorite(id as string);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Failed to check favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  const handleToggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(id as string);
      } else {
        await addToFavorite({
          id: movie?.id || 0,
          title: movie?.title || "",
          poster_path: movie?.poster_path || "",
          release_date: movie?.release_date || "",
          vote_average: movie?.vote_average || 0,
          vote_count: movie?.vote_count || 0,
          overview: movie?.overview || "",
          backdrop_path: movie?.backdrop_path || "",
          genre_ids: movie?.genres?.map((g) => g.id) || [],
          original_language: movie?.original_language || "",
          original_title: movie?.original_title || "",
          popularity: movie?.popularity || 0,
          video: movie?.video || false,
          adult: movie?.adult || false,
        });
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  }, [isFavorite, id, movie]);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity
            onPress={handleToggleFavorite}
            className={`absolute bottom-5 right-20 rounded-full size-14 flex items-center justify-center elevation-5 active:scale-95 transition ${isFavorite ? "bg-rose-600" : "bg-midnightblue"}`}
            accessibilityLabel={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Image
              source={isFavorite ? icons.remove_favorite : icons.add_favorite}
              className="w-8 h-8 tint-white"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Play"
            className="absolute bottom-5 right-5 rounded-full size-14 bg-mediumseagreen flex items-center justify-center"
          >
            <Image source={icons.play} className="ml-1" />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000,
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className={`absolute ${Platform.OS === "android" ? "bottom-20" : "bottom-5"} left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50`}
        onPress={router.back}
        accessibilityLabel="Go back"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
