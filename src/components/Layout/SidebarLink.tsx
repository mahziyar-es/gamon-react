import { ReactNode, useEffect, useRef, useState } from "react";

interface SidebarLinkProps{
    children ?: ReactNode,
    link ?: ReactNode,
    subLinks ?: ReactNode,
}

const SidebarLink = (props:SidebarLinkProps) => {

    const branchesEl = useRef<HTMLDivElement>(null)
    const [showSubLinks, setShowSubLinks] = useState(false)

    const subLinksToggle = () => {
        setShowSubLinks(prev => ! prev)
    }


    useEffect(() => {
        if (!branchesEl.current) return
        
        if(showSubLinks)    branchesEl.current!.style.height = 'fit-content'
        else    branchesEl.current!.style.height = '0'
    },[showSubLinks])



    return (
        <div className="gamon-layout__sidebar__link ">
            { props.subLinks ?
                <>
                    <div className="gamon-layout__sidebar__link__root" onClick={subLinksToggle}>{props.link}</div>
                    <div className={[
                        "gamon-layout__sidebar__link__branches",
                    ].join(" ")}
                        ref={branchesEl}
                    >
                        {props.subLinks}
                    </div>
                </>
                :
                props.link
            }

            
        </div>
    )
}

export default SidebarLink