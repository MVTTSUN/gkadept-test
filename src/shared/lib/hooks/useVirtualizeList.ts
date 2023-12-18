import { useLayoutEffect, useMemo, useState } from "react";

type useVirtualizeListProps = {
  itemsCount: number;
  itemHeight: number;
  tresHoldIndex?: number;
  getScrollElement: () => HTMLElement | null;
};

const DEFAULT_THRESHOLD_INDEX = 3;

export const useVirtualizeList = (props: useVirtualizeListProps) => {
  const {
    itemHeight,
    itemsCount,
    tresHoldIndex = DEFAULT_THRESHOLD_INDEX,
    getScrollElement,
  } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const [listHeight, setListHeight] = useState(0);

  const { virtualItems } = useMemo(() => {
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

    return { virtualItems };
  }, [scrollTop, itemsCount, listHeight]);

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

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();

    if (!scrollElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const height = entry.contentRect.height;

      setListHeight(height);
    });

    resizeObserver.observe(scrollElement);

    return () => resizeObserver.disconnect();
  }, [getScrollElement]);

  return { virtualItems };
};
