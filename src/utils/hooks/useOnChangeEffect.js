import {
  useEffect,
  useRef,
} from 'react';

const useOnChangeEffect = (value, effect = () => {}) => {
  const prevRef = useRef(null);

  useEffect(() => {
    // Skip if current value is null
    if (value === null || value === undefined) return;

    // Run effect only if previous is not null and value actually changed
    if (prevRef.current !== null && prevRef.current !== value) {
      effect(value, prevRef.current);
    }

    // Update previous value
    prevRef.current = value;
  }, [value, effect]);
};

export default useOnChangeEffect;
