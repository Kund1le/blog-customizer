import { useEffect, RefObject } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

type TUseClose = {
  isOpen: boolean;
  onClose: () => void;
  rootRef: RefObject<HTMLElement>;
};

export function useClose({isOpen, onClose, rootRef}: TUseClose) {
  useEffect(() => {
    if(!isOpen) return;

    function handleClick(evt: MouseEvent) {
      const {target} = evt;
      if(target instanceof Node &&
        rootRef.current &&
        !rootRef.current.contains(target)
      ) {
        onClose();
      }
    }

    const handleEscape = (evt: KeyboardEvent) => {
      if(evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClick);

    return() => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, rootRef]);
}