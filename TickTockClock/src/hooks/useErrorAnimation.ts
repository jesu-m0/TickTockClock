import { useState, useCallback, useRef } from 'react';

/**
 * Hook that manages a temporary boolean flag for triggering CSS error animations.
 * Replaces the anti-pattern of document.getElementById + classList.add/remove.
 */
export function useErrorAnimation(duration = 300): [boolean, () => void] {
      const [isAnimating, setIsAnimating] = useState(false);
      const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

      const trigger = useCallback(() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsAnimating(true);
            timeoutRef.current = setTimeout(() => setIsAnimating(false), duration);
      }, [duration]);

      return [isAnimating, trigger];
}
