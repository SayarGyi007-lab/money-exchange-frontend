import { useState, useCallback } from 'react'

export default function useUpdateRates() {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  const updateRates = useCallback(async (rates) => {
    setUpdating(true)
    setError(null)

    try {
      const res = await fetch(
        'https://currency-rate-cwtr.onrender.com/api/admin/update_rate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rates })
        }
      )
      if (!res.ok) throw new Error('Update failed')
      return true         
    } catch (err) {
      setError(err.message || 'Failed to update rates')
      return false
    } finally {
      setUpdating(false)
    }
  }, [])

  return { updateRates, updating, error }
}
