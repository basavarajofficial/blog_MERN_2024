import { useEffect, useState } from "react";

function OnlineStatus() {

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const hadnleOnline = () => {
            setIsOnline(true);
        }
        const hadnleOffline = () => {
            setIsOnline(false);
        }
        window.addEventListener('online', hadnleOnline);
        window.addEventListener('offline', hadnleOffline);

        return () => {
            window.removeEventListener('online', hadnleOnline);
            window.removeEventListener('offline', hadnleOffline);
        }
    }, []);
  return (
    <div>
        {!isOnline && 
            <div className="w-screen h-6 text-sm bg-gray-600 text-slate-200 text-center">
                <p>No Internet Connection</p>
            </div>
        }
    </div>
  )
}

export default OnlineStatus