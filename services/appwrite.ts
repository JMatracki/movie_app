import { Movie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query, Models } from "react-native-appwrite";

interface TrendyMovieDocument extends Models.Document {
  searchTerm: string;
  movie_id: number;
  count: number;
  poster_url: string;
  movie: string;
}

interface FavoriteMovieDocument extends Models.Document {
  movie_id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  adult: boolean;
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TRENDY_MOVIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_TRENDY_MOVIES_COLLECTION_ID!;
const FAVORITE_MOVIES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_FAVORITE_MOVIES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

const handleDatabaseError = (operation: string, error: unknown): never => {
  console.error(`Error in ${operation}:`, error);
  throw error;
};

const movieToDatabaseFormat = (movie: Movie) => ({
  movie_id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
  vote_count: movie.vote_count,
  overview: movie.overview,
  backdrop_path: movie.backdrop_path,
  genre_ids: movie.genre_ids,
  original_language: movie.original_language,
  original_title: movie.original_title,
  popularity: movie.popularity,
  video: movie.video,
  adult: movie.adult,
});

export const updateSearchCount = async (
  query: string,
  movie: Movie,
): Promise<void> => {
  try {
    const result = await database.listDocuments<TrendyMovieDocument>(
      DATABASE_ID,
      TRENDY_MOVIES_COLLECTION_ID,
      [Query.equal("searchTerm", query)],
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        TRENDY_MOVIES_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie: movie.title,
        },
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        TRENDY_MOVIES_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie: movie.title,
        },
      );
    }
  } catch (error) {
    handleDatabaseError("updateSearchCount", error);
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments<TrendyMovieDocument>(
      DATABASE_ID,
      TRENDY_MOVIES_COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")],
    );

    const uniqueMovies = new Map<number, TrendingMovie>();
    result.documents.forEach((doc) => {
      if (!uniqueMovies.has(doc.movie_id)) {
        uniqueMovies.set(doc.movie_id, {
          searchTerm: doc.searchTerm,
          movie_id: doc.movie_id,
          title: doc.movie,
          count: doc.count,
          poster_url: doc.poster_url,
        });
      }
    });

    return Array.from(uniqueMovies.values());
  } catch (error) {
    handleDatabaseError("getTrendingMovies", error);
    return [];
  }
};

export const checkIfIsFavorite = async (movie_id: string): Promise<boolean> => {
  try {
    const result = await database.listDocuments<FavoriteMovieDocument>(
      DATABASE_ID,
      FAVORITE_MOVIES_COLLECTION_ID,
    );

    return result.documents.some(
      (document) => String(document.movie_id) === movie_id,
    );
  } catch (error) {
    handleDatabaseError("checkIfIsFavorite", error);
    return false;
  }
};

export const getFavoriteMovies = async (): Promise<Movie[]> => {
  try {
    const result = await database.listDocuments<FavoriteMovieDocument>(
      DATABASE_ID,
      FAVORITE_MOVIES_COLLECTION_ID,
    );

    return result.documents.map((doc) => ({
      id: doc.movie_id,
      title: doc.title,
      poster_path: doc.poster_path,
      release_date: doc.release_date,
      vote_average: doc.vote_average,
      vote_count: doc.vote_count,
      overview: doc.overview,
      backdrop_path: doc.backdrop_path,
      genre_ids: doc.genre_ids,
      original_language: doc.original_language,
      original_title: doc.original_title,
      popularity: doc.popularity,
      video: doc.video,
      adult: doc.adult,
    }));
  } catch (error) {
    handleDatabaseError("getFavoriteMovies", error);
    return [];
  }
};

export const addToFavorite = async (movie: Movie): Promise<void> => {
  try {
    await database.createDocument(
      DATABASE_ID,
      FAVORITE_MOVIES_COLLECTION_ID,
      ID.unique(),
      movieToDatabaseFormat(movie),
    );
  } catch (error) {
    handleDatabaseError("addToFavorite", error);
  }
};

export const removeFromFavorites = async (movie_id: string): Promise<void> => {
  try {
    const result = await database.listDocuments<FavoriteMovieDocument>(
      DATABASE_ID,
      FAVORITE_MOVIES_COLLECTION_ID,
    );

    const movie = result.documents.find(
      (document) => String(document.movie_id) === movie_id,
    );

    if (!movie) {
      console.warn(`Movie with ID ${movie_id} not found in favorites.`);
      return;
    }

    await database.deleteDocument(
      DATABASE_ID,
      FAVORITE_MOVIES_COLLECTION_ID,
      movie.$id,
    );
  } catch (error) {
    handleDatabaseError("removeFromFavorites", error);
  }
};
