import type React from "react";

export interface GeoCity {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeoResult[];
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m?: number;
  pressure_msl: number;
  weather_code: number;
  cloud_cover: number;
  visibility: number;
  is_day: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max?: number[];
  precipitation_probability_max: number[];
  precipitation_hours: number[];
  rain_sum: number[];
  sunshine_duration: number[];
  uv_index_max: number[];
  dew_point_2m_mean: number[];
}

export interface WeatherResponse {
  timezone: string;
  current: CurrentWeather;
  daily: DailyWeather;
}

export interface ForecastItem {
  date: string;
  code: number;
  high: number;
  low: number;
  feelsHigh?: number;
  feelsLow?: number;
  sunrise?: string;
  sunset?: string;
  wind?: number;
  gust?: number;
  rainChance: number;
  rain?: number;
  rainHours?: number;
  sunshine?: number;
  dewpoint?: number;
  uvIndex?: number;
}

export interface blueDetailsProps {
  label: string;
  value: string;
  icon: string;
}

export interface CurrentWeatherProps {
  current: WeatherResponse["current"];
  selectedCity: GeoCity;
  clock: Date;
  setShowBlueDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showBlueDetails: boolean;
  blueDetails: blueDetailsProps[];
  today: ForecastItem;
  weather: WeatherResponse;
}

export interface HeaderProps {
  searchValue: string;
  query: string;
  cityOptions: GeoCity[];
  cityLoading: boolean;
  citySearchError: boolean;
  selectedCity: GeoCity;
  handleSearchValue: (value: string) => void;
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>;
  onCitySelect: (city: GeoCity) => void;
}

export interface DailyDetailProps {
  selectedForecast: ForecastItem | null;
  setSelectedDay: (day: string | null) => void;
  formatDay: (date: string) => string;
  formatDate: (date: string) => string;
  formatTime: (time: string) => string;
  weatherDescription: (code: number) => string;
}
