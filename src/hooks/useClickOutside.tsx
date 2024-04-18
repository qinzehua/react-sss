import { RefObject, useEffect } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement>, fn: Function) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        fn()
      }
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  })
}
