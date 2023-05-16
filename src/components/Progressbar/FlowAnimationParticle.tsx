import { useEffect, useState } from "react"


interface FlowAnimationParticleProps  {
    particleStyle ?: {[index:string] : string},
    particleClass ?: string,
}

const FlowAnimationParticle = (props: FlowAnimationParticleProps) => {

    const [particleStyleObject, setParticleStyleObject] = useState<{ [index: string]: string }>()

    useEffect(() => {
        setParticleStyleObject(currObject => {
            return {...currObject, left : randomPositionGenerator(), top : randomPositionGenerator(), ...props.particleStyle}
        })
    }, [])
    

    const randomPositionGenerator = () => {
        return (Math.floor(Math.random() * 100) + 1) + '%'
    }

    return (
        <div className={['gamon-progressbar__progress__animation-flow__particle', props.particleClass].join(" ")}
            style={particleStyleObject}
        >
        </div>
    )
}


export {FlowAnimationParticle}