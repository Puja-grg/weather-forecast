interface CityOption {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface CitySearchSelectItemProps {
  item: CityOption;
  isSelected: boolean;
  onCitySelect: (city: CityOption) => void;
}

export const CitySearchSelectItem = ({
  item,
  isSelected,
  onCitySelect,
}: CitySearchSelectItemProps) => {
  return (
    <button
      type="button"
      className={`w-full border-b border-gray-100 text-left transition last:border-b-0 ${
        isSelected ? "bg-indigo-100" : "hover:bg-indigo-50"
      }`}
      onClick={() => onCitySelect(item)}
    >
      <div className="flex items-center gap-3 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
          📍
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold capitalize text-slate-800">
            {item.name}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {[item.state, item.country].filter(Boolean).join(", ")}
          </p>
        </div>

        {isSelected && <span className="font-bold text-indigo-600">✓</span>}
      </div>
    </button>
  );
};

export default CitySearchSelectItem;
