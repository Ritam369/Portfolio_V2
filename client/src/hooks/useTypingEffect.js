import { useEffect, useState } from 'react'

/**
 * Types out `text` one character at a time, then holds with a blinking cursor.
 * @param {string} text - The string to type out.
 * @param {number} speedMs - Milliseconds between each character (default 80).
 * @returns {{ displayed: string, done: boolean }}
 */
export function useTypingEffect(text, speedMs = 80) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speedMs)
    return () => clearInterval(interval)
  }, [text, speedMs])

  return { displayed, done }
}
