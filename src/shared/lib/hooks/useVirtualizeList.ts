import { useLayoutEffect, useMemo, useState } from "react";

type useVirtualizeListProps = {
  itemsCount: number;
  itemHeight: number;
  listHeight: number;
  tresHoldIndex?: number;
  getScrollElement: () => HTMLElement | null;
};

const DEFAULT_THRESHOLD_INDEX = 3;

export const useVirtualizeList = (props: useVirtualizeListProps) => {
  const {
    itemHeight,
    listHeight,
    itemsCount,
    tresHoldIndex = DEFAULT_THRESHOLD_INDEX,
    getScrollElement,
  } = props;
  const [scrollTop, setScrollTop] = useState(0);

  const { virtualItems, endIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;
    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - tresHoldIndex);
    endIndex = Math.min(itemsCount - 1, endIndex + tresHoldIndex);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return { virtualItems, endIndex };
  }, [scrollTop, itemsCount]);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    const handleScroll = () => setScrollTop(scrollElement.scrollTop);

    handleScroll();

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [getScrollElement]);

  return { virtualItems, endIndex };
};
