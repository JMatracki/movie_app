import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";
import { Movie } from "@/interfaces/interfaces";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const lastProcessedQuery = React.useRef<string>("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch<Movie[]>(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false,
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text !== debouncedQuery) {
        setCurrentMovies([]);
      }
    },
    [debouncedQuery],
  );

  useEffect(() => {
    if (movies && !loading) {
      setCurrentMovies(movies);
      setIsSearching(false);
    }
  }, [movies, loading]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== debouncedQuery) {
        setDebouncedQuery(searchQuery);
        setCurrentMovies([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      loadMovies();
    } else {
      reset();
      setCurrentMovies([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (
      currentMovies.length > 0 &&
      debouncedQuery.trim() &&
      !isSearching &&
      !loading &&
      debouncedQuery !== lastProcessedQuery.current
    ) {
      lastProcessedQuery.current = debouncedQuery;
      updateSearchCount(debouncedQuery, currentMovies[0]);
    }
  }, [currentMovies, debouncedQuery, isSearching, loading]);

  useEffect(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setCurrentMovies([]);
    reset();
  }, []);

  return (
    <View
      className="flex-1 bg-primary"
      accessibilityRole="none"
      accessibilityLabel="Search screen"
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

      <FlatList
        className="px-5"
        data={currentMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View
              className="w-full flex-row justify-center mt-20 items-center"
              accessibilityRole="none"
              accessibilityLabel="App logo"
            >
              <Image
                source={icons.logo}
                className="w-12 h-10"
                accessibilityLabel="Movie app logo"
              />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
                accessibilityLabel="Loading search results"
              />
            )}

            {error && (
              <Text
                className="text-red-500 px-5 my-3"
                accessibilityRole="alert"
                accessibilityLabel={`Error: ${error.message}`}
              >
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              currentMovies.length > 0 && (
                <Text
                  className="text-xl text-white font-bold"
                  accessibilityRole="header"
                >
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5" accessibilityRole="none">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        accessibilityLabel="Search results list"
        accessibilityHint="Scroll to view more search results"
      />
    </View>
  );
};

export default Search;
