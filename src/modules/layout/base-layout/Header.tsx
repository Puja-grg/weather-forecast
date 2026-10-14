import CitySearchSelect from "../../pages/weatherPage/CitySearchSelect";
import type { HeaderProps } from "../../types/WeatherTypes";

export const Header = ({
  searchValue,
  query,
  cityOptions,
  cityLoading,
  citySearchError,
  selectedCity,
  handleSearchValue,
  setSelectedDay,
  onCitySelect,
}: HeaderProps) => {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-xl bg-indigo-100 p-2 text-xl">🌤️</span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Weatherly
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          A little sunshine in your day.
        </p>
      </div>

      {/* CITY SEARCH */}

      <section className="relative">
        {/* <label className="mb-2 block text-sm font-semibold text-slate-700">
          Find a city
        </label> */}
        <CitySearchSelect
          searchValue={searchValue}
          searchOptions={query.length >= 2 ? cityOptions : []}
          isLoading={cityLoading && query.length >= 2}
          onSearchChange={(value) => {
            handleSearchValue(value);
            setSelectedDay(null);
          }}
          onCitySelect={onCitySelect}
          selectedValue={selectedCity}
        />
        {query.length >= 2 && !cityLoading && cityOptions.length === 0 && (
          <p className="mt-2 text-sm text-slate-500">
            {citySearchError
              ? "City search failed. Please try again."
              : "No cities found. Try another spelling."}
          </p>
        )}
      </section>
    </header>
  );
};
