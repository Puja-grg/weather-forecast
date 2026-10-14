import { type Dispatch, type SetStateAction } from "react";
import type { ForecastItem } from "../../types/WeatherTypes";

interface SevenDayForecastProps {
  dailyForecast: ForecastItem[];
  selectedDay: string | null;
  setSelectedDay: Dispatch<SetStateAction<string | null>>;
  formatDay: (date: string) => string;
  formatDate: (date: string) => string;
  weatherEmoji: (code: number) => string;
  weatherDescription: (code: number) => string;
}
export const SevenDayForecast = ({
  dailyForecast,
  selectedDay,
  setSelectedDay,
  formatDay,
  formatDate,
  weatherEmoji,
  weatherDescription,
}: SevenDayForecastProps) => {
  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Plan ahead
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
            7-day forecast
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Click a day to view its additional weather information.
          </p>
        </div>
        <span className="rounded-full border border-indigo-100 bg-white/80 px-3 py-2 text-xs font-semibold text-indigo-600 shadow-sm">
          7 DAYS
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {dailyForecast.map((day, index) => {
          const isSelected = selectedDay === day.date;

          return (
            <button
              key={day.date}
              onClick={() => setSelectedDay(isSelected ? null : day.date)}
              className={`rounded-3xl border p-4 text-center transition duration-200 hover:-translate-y-1 sm:p-5 ${
                isSelected
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-200"
                  : "border-white bg-white/90 text-slate-700 shadow-sm hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60"
              }`}
            >
              <p className="text-sm font-bold">
                {index === 0 ? "Today" : formatDay(day.date)}
              </p>
              <p
                className={`mt-1 text-xs ${
                  isSelected ? "text-indigo-100" : "text-slate-500"
                }`}
              >
                {formatDate(day.date)}
              </p>
              <div className="my-4 text-4xl">{weatherEmoji(day.code)}</div>
              <p
                className={`text-xs leading-5 ${
                  isSelected ? "text-indigo-100" : "text-slate-500"
                }`}
              >
                {weatherDescription(day.code)}
              </p>
              <div className="mt-4 flex justify-center gap-3 text-sm font-bold">
                <span>{Math.round(day.high)}°</span>
                <span
                  className={isSelected ? "text-indigo-200" : "text-slate-400"}
                >
                  {Math.round(day.low)}°
                </span>
              </div>
              <p
                className={`mt-3 text-xs font-semibold ${
                  isSelected ? "text-white" : "text-indigo-600"
                }`}
              >
                ☔ {day.rainChance}%
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
