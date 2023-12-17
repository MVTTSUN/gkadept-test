import { useEffect, useState } from "react";

type UseFetchingScrollProps = {
  fetchingCallback?: () => void;
  tresHoldHeight?: number;
  getScrollElement: () => HTMLElement | null;
};

const DEFAULT_THRESHOLD_HEIGHT = 100;

export const useFetchingScroll = (props: UseFetchingScrollProps) => {
  const {
    fetchingCallback,
    tresHoldHeight = DEFAULT_THRESHOLD_HEIGHT,
    getScrollElement,
  } = props;
  const [fetching, setFetching] = useState(false);

  const scrollHandler = () => {
    const scrollElement = getScrollElement();

    if (!scrollElement) return;

    if (
      scrollElement.scrollHeight -
        scrollElement.scrollTop -
        scrollElement.clientHeight <
      tresHoldHeight
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching && fetchingCallback) {
      fetchingCallback();
      setFetching(false);
    }
  }, [fetching]);

  useEffect(() => {
    const scrollElement = getScrollElement();
    scrollElement?.addEventListener("scroll", scrollHandler);

    return () => scrollElement?.removeEventListener("scroll", scrollHandler);
  }, [getScrollElement]);
};
