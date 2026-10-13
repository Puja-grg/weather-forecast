import type { DailyDetailProps } from "../../types/WeatherTypes";

export const DailyDetail = ({
  selectedForecast,
  setSelectedDay,
  formatDay,
  formatDate,
  formatTime,
  weatherDescription,
}: DailyDetailProps) => {
  return (
    <>
      {selectedForecast && (
        <section className="mt-6 rounded-[2rem] border border-white bg-white/95 p-5 shadow-xl shadow-indigo-100/70 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
                Daily details
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">
                {formatDay(selectedForecast.date)},{" "}
                {formatDate(selectedForecast.date)}
              </h2>
              <p className="mt-1 text-slate-500">
                {weatherDescription(selectedForecast.code)}
              </p>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="rounded-full bg-red-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-700"
            >
              Close ✕
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              {
                label: "Feels-like high",
                value: `${Math.round(selectedForecast.feelsHigh ?? 0)}°C`,
                icon: "🌡️",
              },
              {
                label: "Feels-like low",
                value: `${Math.round(selectedForecast.feelsLow ?? 0)}°C`,
                icon: "❄️",
              },
              {
                label: "Sunrise",
                value: formatTime(selectedForecast.sunrise ?? ""),
                icon: "🌅",
              },
              {
                label: "Sunset",
                value: formatTime(selectedForecast.sunset ?? ""),
                icon: "🌇",
              },
              {
                label: "Maximum wind",
                value: `${Math.round(selectedForecast.wind ?? 0)} km/h`,
                icon: "💨",
              },
              {
                label: "Wind gusts",
                value: `${Math.round(selectedForecast.gust ?? 0)} km/h`,
                icon: "🍃",
              },
              {
                label: "Rain amount",
                value: `${selectedForecast.rain} mm`,
                icon: "🌧️",
              },
              {
                label: "Rain duration",
                value: `${selectedForecast.rainHours} hrs`,
                icon: "☔",
              },
              {
                label: "Rain probability",
                value: `${selectedForecast?.rainChance}%`,
                icon: "🌦️",
              },

              {
                label: "Dew Point",
                value: `${(selectedForecast.dewpoint ?? 0 / 3600).toFixed(1)} hrs`,
                icon: "☀️",
              },
              {
                label: "Uv Index",
                value: `${(selectedForecast.uvIndex ?? 0 / 3600).toFixed(1)} hrs`,
                icon: "☀️",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-indigo-50 bg-gradient-to-br from-white to-indigo-50/80 p-4"
              >
                <p className="text-sm text-slate-500">
                  {item.icon} {item.label}
                </p>
                <p className="mt-2 text-lg font-bold text-slate-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
