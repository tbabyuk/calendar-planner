
import { useState, useEffect } from "react"


const useStatus = () => {

  const [isOnline, setIsOnline] = useState(true)


  const handleOnline = () => {
    setIsOnline(true)
  }

  const handleOffline = () => {
    setIsOnline(false)
  }
    
  
  useEffect(() => {
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online")
      window.removeEventListener("offline")
    }
  }, [])

  return (
    <div>useStatusCheck</div>
  )
}

export default useStatus