import { useLayoutEffect, useState } from "react";

type UseObserverProps = {
  elements: () => (HTMLElement | null)[];
};

type SizeElement = {
  height: number;
  width: number;
};

export function useObserver(props: UseObserverProps) {
  const { elements } = props;
  const [sizeElements, setSizeElements] = useState<SizeElement[]>([]);

  useLayoutEffect(() => {
    const elementsResult = elements();

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length < elementsResult.length) {
        return;
      }

      entries.forEach((entry) => {
        setSizeElements((prevState) =>
          [
            ...prevState,
            {
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            },
          ].slice(-elementsResult.length)
        );
      });
    });

    elementsResult.forEach(
      (element) => element && resizeObserver.observe(element)
    );

    return () => resizeObserver.disconnect();
  }, [elements]);

  return sizeElements;
}
