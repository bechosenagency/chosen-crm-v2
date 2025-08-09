/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns The debounced function
 */
export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): (...args: Args) => void {
  let timeout: NodeJS.Timeout | null = null

  return function debounced(...args: Args) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }
}