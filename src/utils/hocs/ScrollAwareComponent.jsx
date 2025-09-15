import {
  useEffect,
  useState,
  useRef,
  cloneElement,
} from 'react';

const ScrollAwareComponent = ({
  onScrollAtBottom = () => {},
  onScrollAtTop = () => {},
  onWidthSet = () => {},
  children = <></>,
}) => {
  const containerRef = useRef(null);

  const [isScrolledAtBottom, setIsScrolledAtBottom] = useState(false);
  const [isScrolledAtTop, setIsScrolledAtTop] = useState(true);
  const [componentWidth, setComponentWidth] = useState(0);

  const handleScroll = () => {
    setIsScrolledAtBottom(
      containerRef
      && containerRef.current
      && containerRef.current.scrollHeight
      && containerRef.current.clientHeight
      && containerRef.current.scrollTop
      && (
        +(containerRef.current.scrollHeight - containerRef.current.clientHeight)
        <= +(containerRef.current.scrollTop + 1)
      ),
    );
    setIsScrolledAtTop(
      containerRef?.current?.scrollTop === 0,
    );
  };

  useEffect(() => {
    const currentContainerRef = containerRef?.current;
    currentContainerRef?.addEventListener('scroll', handleScroll);
    return () => {
      currentContainerRef?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (containerRef?.current) {
      setComponentWidth(containerRef?.current?.offsetWidth);
    }
  }, [containerRef]);

  useEffect(() => {
    onWidthSet(componentWidth);
    // eslint-disable-next-line
  }, [componentWidth]);

  useEffect(() => {
    if (isScrolledAtTop) {
      onScrollAtTop();
    }
    if (isScrolledAtBottom) {
      onScrollAtBottom();
    }
    // eslint-disable-next-line
  }, [isScrolledAtTop, isScrolledAtBottom]);

  return cloneElement(children, { ref: containerRef });
};

export default ScrollAwareComponent;
