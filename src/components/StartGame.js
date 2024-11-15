import { Suspense, useEffect, useState } from 'react'
import {useProgress} from "@react-three/drei";

export default function StartGame({ children }){
const [ready, setReady] = useState(false);

    function Ready({ setReady }) {
        useEffect(() => () => void setReady(true), [])
        return null
    }

    function Loader() {
        const { progress } = useProgress()
        return <div>Загрузка {progress.toFixed()} %</div>
    }
    return<>
        <Suspense fallback={<Ready setReady={setReady} />}>{children}</Suspense>
        <div className="fixed w-full h-full z-10 bg-gray-950 top-0 bottom-0 left-0 right-0">
          <div className="text-white flex justify-center w-full absolute bottom-0 top-0">
              <div className="self-center">
                  <Loader/>
              </div>

          </div>
        </div>
    </>
}