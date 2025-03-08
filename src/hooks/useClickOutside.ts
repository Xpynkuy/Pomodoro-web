import { useEffect, RefObject } from 'react';

type EventType = MouseEvent | TouchEvent;


function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: EventType) => void,
  condition: boolean = true
): void {
  useEffect(() => {
    if (!condition) return;
    
    const listener = (event: EventType) => {

      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, condition]);
}

export default useClickOutside; 