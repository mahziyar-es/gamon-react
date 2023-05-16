import { useState, useEffect, useRef } from "react"
import { FlowAnimationParticle } from "./FlowAnimationParticle"


interface FlowAnimationProps  {
    particleStyle?:{[index:string] : string},
    particleClass?:string,
}

const FlowAnimation = (props: FlowAnimationProps) => {

    const particlesCreated = useRef(false) // to prevent console error during development (caused by rendering twice)
    const[particles, setParticles] = useState<JSX.Element[]>([])


    useEffect(() => {
        createParticles()
    }, [])
    


    const createParticles = () => {
        
        if (particlesCreated.current) return
        
        let particlesArray: JSX.Element[] = []
        
        for (let i = 0; i < 20; i++){
            particlesArray.push(<FlowAnimationParticle particleStyle={props.particleStyle} particleClass={props.particleClass} key={i} />)
        }
        
        setParticles(currArray => {
            return [ ...currArray,  ...particlesArray]
        })

        particlesCreated.current = true
    }
    

    
    return (
        <div>
            <div className="gamon-progressbar__progress__animation-flow__part1">
                {particles}
            </div>
            <div className="gamon-progressbar__progress__animation-flow__part2">
                {particles}
            </div>
        </div>
    )

}


export {FlowAnimation}