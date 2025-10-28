import { Suspense, lazy, useState } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function Robot() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const onLoad = (splineApp: Application) => {
    // Ensure the robot appears at its final size without zoom animation
    splineApp.setZoom(1);
    
    // Delay the fade-in by 0.5s after complete loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            {/* Clean, simple loading state - no visible loader */}
            <div className="w-full h-full bg-transparent"></div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className={`w-full h-full transition-opacity duration-[600ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  )
}