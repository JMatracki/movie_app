# 🇬🇧 English 
# Movie App 🎬

A modern, feature-rich movie discovery application built with React Native and Expo. This app allows users to explore trending movies, search for their favorite films, and save them for later viewing.

## Features ✨

- 🎯 Trending movies section with beautiful UI
- 🔍 Real-time movie search with debouncing
- 💾 Save favorite movies
- 🎨 Modern and responsive UI with NativeWind (TailwindCSS)
- 📱 Cross-platform (iOS & Android) support
- 🔄 Real-time data updates
- 🎭 Detailed movie information and ratings
- 🌙 Dark mode optimized design

## Tech Stack 🛠

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: React Hooks
- **API Integration**: TMDB API
- **Backend**: Appwrite
- **Type Safety**: TypeScript
- **UI Components**: Custom components with React Native
- **Icons**: Expo Vector Icons
- **Animations**: React Native Reanimated

## Prerequisites 📋

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Installation 🚀

    1. Clone the repository:

    ```bash
    git clone https://github.com/jmatracki/movie_app.git
    cd movie_app
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Create a `.env` file in the root directory and add your API keys:

    ```
    EXPO_PUBLIC_MOVIE_API_KEY=your_expo_public_movie_api_key
    EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_expo_public_appwrite_project_id
    EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_expo_public_appwrite_database_id
    EXPO_PUBLIC_APPWRITE_TRENDY_MOVIES_COLLECTION_ID=your_public_appwrite_trendy_movies_collection_id
    EXPO_PUBLIC_APPWRITE_FAVORITE_MOVIES_COLLECTION_ID=your_expo_public_appwrite_favorite_movies_collection_id
    ```

    4. Start the development server:

    ```bash
    npm start
    ```

    5. Run on your preferred platform:

    ```bash
    # For iOS
    npm run ios

    # For Android
    npm run android
    ```

## Project Structure 📁

```
movie_app/
├── app/                 # Main application code
│   ├── (tabs)/         # Tab-based navigation
│   └── movies/         # Movie details screens
├── components/         # Reusable UI components
├── constants/         # App constants and theme
├── interfaces/        # TypeScript interfaces
├── services/          # API and data services
└── assets/           # Images and other static assets
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙏

- [TMDB](https://www.themoviedb.org/) for the movie data API
- [Appwrite](https://appwrite.io/) for backend services
- [Expo](https://expo.dev/) for the amazing development platform

---

# 🇵🇱 Polski

# Movie App 🎬

Nowoczesna, bogata w funkcje aplikacja do odkrywania filmów zbudowana w React Native i Expo. Ta aplikacja pozwala użytkownikom przeglądać popularne filmy, wyszukiwać ulubione produkcje i zapisywać je do późniejszego obejrzenia.

## Funkcje ✨

- 🎯 Sekcja popularnych filmów z pięknym interfejsem
- 🔍 Wyszukiwarka filmów w czasie rzeczywistym z debouncingiem
- 💾 Zapisywanie ulubionych filmów
- 🎨 Nowoczesny i responsywny interfejs z NativeWind (TailwindCSS)
- 📱 Wsparcie dla wielu platform (iOS & Android)
- 🔄 Aktualizacje danych w czasie rzeczywistym
- 🎭 Szczegółowe informacje o filmach i oceny
- 🌙 Zoptymalizowany design trybu ciemnego

## Stack Technologiczny 🛠

- **Framework**: React Native z Expo
- **Routing**: Expo Router (routing oparty na plikach)
- **Stylizacja**: NativeWind (TailwindCSS dla React Native)
- **Zarządzanie Stanem**: React Hooks
- **Integracja API**: TMDB API
- **Backend**: Appwrite
- **Typowanie**: TypeScript
- **Komponenty UI**: Własne komponenty React Native
- **Ikony**: Expo Vector Icons
- **Animacje**: React Native Reanimated

## Wymagania 📋

- Node.js (v14 lub wyższa)
- npm lub yarn
- Expo CLI
- Symulator iOS (dla Mac) lub Emulator Android

## Instalacja 🚀

    1. Sklonuj repozytorium:

    ```bash
    git clone https://github.com/jmatracki/movie_app.git
    cd movie_app
    ```

    2. Zainstaluj zależności:

    ```bash
    npm install
    ```

    3. Utwórz plik `.env` w głównym katalogu i dodaj swoje klucze API:

    ```
    EXPO_PUBLIC_MOVIE_API_KEY=your_expo_public_movie_api_key
    EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_expo_public_appwrite_project_id
    EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_expo_public_appwrite_database_id
    EXPO_PUBLIC_APPWRITE_TRENDY_MOVIES_COLLECTION_ID=your_public_appwrite_trendy_movies_collection_id
    EXPO_PUBLIC_APPWRITE_FAVORITE_MOVIES_COLLECTION_ID=your_expo_public_appwrite_favorite_movies_collection_id
    ```

    4. Uruchom serwer deweloperski:

    ```bash
    npm start
    ```

    5. Uruchom na wybranej platformie:

    ```bash
    # Dla iOS
    npm run ios

    # Dla Android
    npm run android
    ```

## Struktura Projektu 📁

```
movie_app/
├── app/                 # Główny kod aplikacji
│   ├── (tabs)/         # Nawigacja oparta na zakładkach
│   └── movies/         # Ekrany szczegółów filmów
├── components/         # Wielokrotnego użytku komponenty UI
├── constants/         # Stałe aplikacji i motyw
├── interfaces/        # Interfejsy TypeScript
├── services/          # Usługi API i danych
└── assets/           # Obrazy i inne statyczne zasoby
```

## Współpraca 🤝

Zapraszamy do współpracy! Możesz przesłać Pull Request.

## Licencja 📄

Ten projekt jest objęty licencją MIT.

## Podziękowania 🙏

- [TMDB](https://www.themoviedb.org/) za API danych o filmach
- [Appwrite](https://appwrite.io/) za usługi backendowe
- [Expo](https://expo.dev/) za wspaniałą platformę deweloperską
