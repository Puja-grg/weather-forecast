import type {
  blueDetailsProps,
  CurrentWeatherProps,
} from "../../types/WeatherTypes";
import {
  formatDate,
  weatherDescription,
  weatherEmoji,
} from "../weather-function/weatherFunction";

export const CurrentWeather = ({
  current,
  selectedCity,
  clock,
  setShowBlueDetails,
  showBlueDetails,
  blueDetails,
  today,
  weather,
}: CurrentWeatherProps) => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4546A5] via-[#6664D9] to-[#9A7CF6] p-6 text-white shadow-2xl shadow-indigo-200/60 sm:p-9">
      <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-60 w-60 rounded-full bg-pink-300/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-indigo-50">
            <span>📍</span>
            {selectedCity.name}, {selectedCity.country}
          </div>

          <p className="mt-6 text-sm font-medium text-indigo-100">
            CURRENT WEATHER
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-5">
            <h2 className="text-7xl font-extralight tracking-tight sm:text-8xl">
              {Math.round(current.temperature_2m)}°
            </h2>
            <div>
              <p className="text-lg font-semibold">
                {weatherDescription(current.weather_code)}
              </p>
              <p className="mt-1 text-indigo-100">
                Feels like {Math.round(current.apparent_temperature)}°C
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "High", value: `${Math.round(today.high)}°C` },
              { label: "Low", value: `${Math.round(today.low)}°C` },
              {
                label: "Humidity",
                value: `${current.relative_humidity_2m}%`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
              >
                <p className="text-xs text-indigo-100">{item.label}</p>
                <p className="mt-1 text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowBlueDetails((prev) => !prev)}
            aria-expanded={showBlueDetails}
            className="mt-6 rounded-xl border border-white/30 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
          >
            {showBlueDetails
              ? "Hide weather details ↑"
              : "View more weather details ↓"}
          </button>

          {showBlueDetails && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {blueDetails?.map((item: blueDetailsProps) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                >
                  <p className="text-sm text-indigo-100">
                    {item.icon} {item.label}
                  </p>
                  <p className="mt-2 break-words text-xl font-bold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WEATHER ICON AND LOCAL TIME */}

        <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-8">
          <div className="text-8xl drop-shadow-xl sm:text-9xl">
            {weatherEmoji(current.weather_code, current.is_day === 1)}
          </div>
          <p className="mt-5 text-center text-sm text-indigo-100">
            Local time in {selectedCity.name}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-wide">
            {clock.toLocaleTimeString("en-US", {
              timeZone: weather.timezone,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
          <p className="mt-2 text-sm text-indigo-100">
            {formatDate(current.time.split("T")[0])}
          </p>
        </div>
      </div>
    </section>
  );
};
