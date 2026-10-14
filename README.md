# Weather Dashboard

A weather dashboard built with React and TypeScript that allows users to search for cities and view current weather information.

## Features

- Search for cities by name
- Display the selected city's name and country
- Show current temperature and feels-like temperature
- Display weather conditions, descriptions, and icons
- Show daily high and low temperatures
- Display sunrise and sunset times
- Show additional weather details, including humidity, pressure, wind speed, wind direction, cloud cover, and visibility
- Display a 7-day weather forecast

## Tech Stack

- React
- TypeScript
- Vite
- OpenWeather API
- CSS

## Getting Started

### Prerequisites

- Node.js
- npm
- An OpenWeather API key

### Installation

1. Clone this repository:

   git clone YOUR_GITHUB_REPOSITORY_URL

2. Navigate to the project directory:

   cd weather-forecast

3. Install dependencies:

   pnpm add

4. Create a `.env` file in the project root and add your API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server:

   pnpm run dev

6. Open the local URL shown in your terminal.

## Environment Variables

The application uses an OpenWeather API key to retrieve weather data.

| Variable | Description |
|---|---|
| `VITE_OPENWEATHER_API_KEY` | OpenWeather API key |

## Future Improvements

- Improve responsive design for mobile devices
- Add more weather-related visualizations
- Improve loading and error states

## Author

Puja
