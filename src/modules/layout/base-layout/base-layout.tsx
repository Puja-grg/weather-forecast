import { useEffect, useState } from "react";
import { CurrentWeather } from "../../components/current-weather/CurrentWeather";
import { DailyDetail } from "../../components/current-weather/DailyDetail";
import { SevenDayForecast } from "../../components/current-weather/SevenDayForecast";
import {
  DEFAULT_CITY,
  formatDate,
  formatDay,
  formatTime,
  getWindDirection,
  weatherDescription,
  weatherEmoji,
} from "../../components/weather-function/weatherFunction";
import { useDebouncedInputValue } from "../../hooks/useDebounce/useInputValue/useDebouncedInputValue";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type {
  ForecastItem,
  GeoCity,
  GeocodingResponse,
  WeatherResponse,
} from "../../types/WeatherTypes";
import { useFetch } from "../../hooks/request-method/useFetch";
import CitySearchSelect from "../../pages/weatherPage/CitySearchSelect";

export function BaseLayout() {
  const [clock, setClock] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState<GeoCity>(DEFAULT_CITY);
  const [showBlueDetails, setShowBlueDetails] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [searchValue, debouncedSearchValue, handleSearchValue] =
    useDebouncedInputValue();

  const query = debouncedSearchValue.trim();

  const {
    data: citySearchData,
    isLoading: cityLoading,
    error: citySearchError,
  } = useFetch<GeocodingResponse>(
    ["city-search", query],
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: query,
        count: 10,
        language: "en",
        format: "json",
      },
      enabled: query.length >= 2,
    },
  );

  const cityOptions: GeoCity[] = (citySearchData?.results ?? []).map(
    (city) => ({
      name: city.name,
      country: city.country_code ?? city.country ?? "",
      state: city.admin1,
      lat: city.latitude,
      lon: city.longitude,
    }),
  );

  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
    refetch,
  } = useFetch<WeatherResponse>(
    ["weather", selectedCity.lat, selectedCity.lon],
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: selectedCity.lat,
        longitude: selectedCity.lon,
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "precipitation",
          "wind_speed_10m",
          "wind_direction_10m",
          "wind_gusts_10m",
          "pressure_msl",
          "weather_code",
          "cloud_cover",
          "visibility",
          "is_day",
        ].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "apparent_temperature_max",
          "apparent_temperature_min",
          "sunrise",
          "sunset",
          "wind_speed_10m_max",
          "wind_gusts_10m_max",
          "precipitation_probability_max",
          "precipitation_hours",
          "rain_sum",
          "sunshine_duration",
          "uv_index_max",
          "dew_point_2m_mean",
        ].join(","),
        timezone: "auto",
        forecast_days: 7,
      },
    },
  );

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCitySelect = (city: GeoCity) => {
    setSelectedCity(city);
    handleSearchValue(
      `${city.name}${city.state ? `, ${city.state}` : ""}, ${city.country}`,
    );
    setSelectedDay(null);
    setShowBlueDetails(false);
  };

  const dailyForecast: ForecastItem[] = weather
    ? weather.daily.time.map((date, index) => ({
        date,
        code: weather.daily.weather_code[index],
        high: weather.daily.temperature_2m_max[index],
        low: weather.daily.temperature_2m_min[index],
        feelsHigh: weather.daily.apparent_temperature_max[index],
        feelsLow: weather.daily.apparent_temperature_min[index],
        sunrise: weather.daily.sunrise[index],
        sunset: weather.daily.sunset[index],
        wind: weather.daily.wind_speed_10m_max[index],
        gust: weather.daily.wind_gusts_10m_max?.[index] ?? 0,
        rainChance: weather.daily.precipitation_probability_max[index] ?? 0,
        rain: weather.daily.rain_sum[index] ?? 0,
        rainHours: weather.daily.precipitation_hours[index] ?? 0,
        sunshine: weather.daily.sunshine_duration[index] ?? 0,
        dewpoint: weather.daily.dew_point_2m_mean[index] ?? 0,
        uvIndex: weather.daily.uv_index_max[index] ?? 0,
      }))
    : [];

  const current = weather?.current;
  const today = dailyForecast[0];

  const selectedForecast = dailyForecast.find(
    (day) => day.date === selectedDay,
  );

  if (weatherLoading && !weather) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-800">Weatherly</h1>
          <p className="mt-2 text-slate-500">
            Loading weather for {selectedCity.name}...
          </p>
        </div>
      </main>
    );
  }

  if (weatherError || !weather || !current || !today) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
        <div className="w-full max-w-lg rounded-3xl border border-white bg-white/90 p-8 text-center shadow-xl shadow-indigo-100">
          <div className="mb-3 text-5xl">🌦️</div>
          <p className="mt-3 text-slate-500">
            We couldn't load the weather for {selectedCity.name}. Check your
            connection and try again.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Try again
          </button>
          <div className="mt-6 text-left">
            <CitySearchSelect
              searchValue={searchValue}
              searchOptions={query.length >= 2 ? cityOptions : []}
              isLoading={cityLoading && query.length >= 2}
              onSearchChange={handleSearchValue}
              onCitySelect={handleCitySelect}
              selectedValue={selectedCity}
            />
            {query.length >= 2 && !cityLoading && cityOptions.length === 0 && (
              <p className="mt-2 text-sm text-slate-500">
                {citySearchError
                  ? "City search failed."
                  : "No cities found. Try another spelling."}
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  const blueDetails = [
    {
      label: "Feels like",
      value: `${Math.round(current.apparent_temperature)}°C`,
      icon: "🌡️",
    },
    {
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
      icon: "💧",
    },
    {
      label: "Wind speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      icon: "🌬️",
    },
    {
      label: "Wind direction",
      value: getWindDirection(current.wind_direction_10m),
      icon: "🧭",
    },
    {
      label: "Pressure",
      value: `${Math.round(current.pressure_msl)} hPa`,
      icon: "📊",
    },
    {
      label: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      icon: "👁️",
    },
    {
      label: "Cloud cover",
      value: `${current.cloud_cover}%`,
      icon: "☁️",
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      icon: "🌧️",
    },
    {
      label: "Wind gust",
      value: `${Math.round(current.wind_gusts_10m ?? 0)} km/h`,
      icon: "💨",
    },
    {
      label: "Sunrise",
      value: today.sunrise ? formatTime(today.sunrise) : "--",
      icon: "🌅",
    },
    {
      label: "Sunset",
      value: today.sunset ? formatTime(today.sunset) : "--",
      icon: "🌇",
    },
    {
      label: "Rain chance",
      value: `${today.rainChance}%`,
      icon: "☔",
    },
  ];

  return (
    <div className="relative mx-auto max-w-7xl">
      {/* HEADER */}

      <Header
        searchValue={searchValue}
        query={query}
        cityOptions={cityOptions}
        cityLoading={cityLoading}
        citySearchError={!!citySearchError}
        selectedCity={selectedCity}
        handleSearchValue={handleSearchValue}
        setSelectedDay={setSelectedDay}
        onCitySelect={handleCitySelect}
      />

      {/* CURRENT WEATHER CARD */}

      <CurrentWeather
        current={current}
        selectedCity={selectedCity}
        clock={clock}
        showBlueDetails={showBlueDetails}
        setShowBlueDetails={setShowBlueDetails}
        blueDetails={blueDetails}
        today={today}
        weather={weather}
      />

      {/* SEVEN-DAY FORECAST */}

      <SevenDayForecast
        dailyForecast={dailyForecast}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        formatDay={formatDay}
        formatDate={formatDate}
        weatherEmoji={weatherEmoji}
        weatherDescription={weatherDescription}
      />

      {/* SELECTED DAY DETAILS */}

      <DailyDetail
        selectedForecast={selectedForecast ?? null}
        setSelectedDay={setSelectedDay}
        formatDay={formatDay}
        formatDate={formatDate}
        formatTime={formatTime}
        weatherDescription={weatherDescription}
      />
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default BaseLayout;
