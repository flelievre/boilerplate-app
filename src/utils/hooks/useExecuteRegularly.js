import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

const useExecuteRegularly = ({
  method = null,
  firstTriggerAfterMs = 30 * 1000,
  triggerEveryMs = 30 * 1000,
}) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const initialTimeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const executeRequest = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await method();
      
      if (isMountedRef.current) {
        setResponse(response);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
        console.error('useCallRegularly request failed:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [JSON.stringify(method)]);

  useEffect(() => {
    if (!method || !firstTriggerAfterMs || !triggerEveryMs) {
      return;
    }

    // Clear any existing timers
    if (initialTimeoutRef.current) {
      clearTimeout(initialTimeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set initial timeout
    initialTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        executeRequest();
        
        // Set up regular interval after first execution
        intervalRef.current = setInterval(() => {
          if (isMountedRef.current) {
            executeRequest();
          }
        }, triggerEveryMs);
      }
    }, firstTriggerAfterMs);

    // Cleanup function
    return () => {
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [JSON.stringify(method), firstTriggerAfterMs, triggerEveryMs, executeRequest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data: response,
    isLoading,
    error,
  };
};

export default useExecuteRegularly;
