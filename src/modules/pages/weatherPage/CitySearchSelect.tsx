import { useCallback, useState } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface CityOption {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface CitySearchSelectProps {
  onCitySelect: (city: CityOption) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  disabled?: boolean;
  searchOptions: CityOption[];
  isLoading: boolean;
  selectedValue?: CityOption | null;
}

export const CitySearchSelect = ({
  onCitySelect,
  searchValue,
  onSearchChange,
  disabled = false,
  searchOptions = [],
  isLoading,
  selectedValue,
}: CitySearchSelectProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      onSearchChange(value);
      setShowOptions(value.trim().length > 0);
    },
    [onSearchChange],
  );

  const handleCitySelect = useCallback(
    (city: CityOption) => {
      onSearchChange(city.name);
      onCitySelect(city);
      setShowOptions(false);
    },
    [onSearchChange, onCitySelect],
  );

  return (
    <div className="relative w-full sm:max-w-sm">
      {/* Search input */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
          <SearchIcon color="black" width={22} />
        </span>

        <input
          type="text"
          placeholder="Search for a city..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchValue.trim()) setShowOptions(true);
          }}
          disabled={disabled}
          autoComplete="off"
          className="w-full rounded-2xl border border-indigo-100 bg-white px-4 py-3.5 pl-11 pr-10 text-sm text-slate-800 shadow-lg outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {searchValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onSearchChange("");
              setShowOptions(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {showOptions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/50">
          {isLoading ? (
            <div className="flex items-center gap-3 px-4 py-5 text-sm text-slate-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
              Searching cities...
            </div>
          ) : searchOptions.length > 0 ? (
            <div className="max-h-72 overflow-y-auto p-2">
              {searchOptions.map((city) => {
                const isSelected =
                  selectedValue?.lat === city.lat &&
                  selectedValue?.lon === city.lon;

                return (
                  <button
                    type="button"
                    key={`${city.lat}-${city.lon}-${city.country}`}
                    onClick={() => handleCitySelect(city)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected ? "bg-indigo-100" : "hover:bg-indigo-50"
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                      📍
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {city.name}
                      </span>

                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {[city.state, city.country].filter(Boolean).join(", ")}
                      </span>
                    </span>

                    {isSelected && (
                      <span className="text-sm font-bold text-indigo-600">
                        ✓
                      </span>
                    )}

                    {!isSelected && (
                      <span className="text-lg text-slate-300">›</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="px-4 py-5 text-center text-sm text-slate-500">
              No matching cities found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearchSelect;
