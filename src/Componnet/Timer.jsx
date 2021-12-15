import { useEffect } from "react"
import { useState } from "react/cjs/react.development"


const Timer = ({setStop,questionNumber}) => {
    const [time,setTime] = useState(30)

    useEffect(()=>{
        if(time === 0) return setStop(true)
        const interval = setInterval(()=>{
            setTime(prev=>prev - 1)
        },1000)

        return () =>clearInterval(interval)
    },[time,setStop])

    useEffect(()=>{
        setTime(30)
    },[questionNumber])


    return time
}

export default Timer
