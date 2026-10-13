import { useEffect, useState } from 'react';

export function useDebounce<V>(value: V, delay = 500): V {
	const [debouncedValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
