import { ReactNode, useEffect, useRef, useState } from "react"
import { responsiveWidthSizes } from "../../utils"
import '../../style/layout.scss'
import { StyleObject } from "../../types/general.type"
import iconClose from '../../assets/ic_close.png'
import iconMenu from '../../assets/icon_menu.png'
import SidebarLink from "./SidebarLink"



interface LayoutProps {
    children ?: ReactNode,
    sidebar?: ReactNode,
    topbar?: ReactNode,
    sidebarPosition?: SidebarPositions,
    
    sidebarStyle ?: StyleObject,
    contentStyle?: StyleObject,
    layoutStyle?: StyleObject,
    
    sidebarClass ?: string,
    contentClass ?: string,
    layoutClass ?: string,
}

enum SidebarPositions {
    Start = 'start',
    End = 'end',
}


const Layout = (props: LayoutProps) => {
    
    const sidebarEl = useRef<HTMLDivElement>(null)
    const contentEl = useRef<HTMLDivElement>(null)
    const topBarEl = useRef<HTMLDivElement>(null)
    const sidebarWidth = useRef<number>(0)
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>()
    const [sidebarStyleObject, setSidebarStyleObject] = useState(props.sidebarStyle || {})
    const [sidebarPosition, setSidebarPosition] = useState(props.sidebarPosition || SidebarPositions.Start)


    useEffect(() => {
        if (windowSize() <= responsiveWidthSizes('sm')) setSidebarIsOpen(false)
        else setSidebarIsOpen(true)
    }, [])
    

    const windowSize = () => window.innerWidth

    const sidebarToggler = async () => setSidebarIsOpen(prevState=>!prevState)

    const getSidebarWidth = async () => sidebarWidth.current = sidebarEl.current!.getBoundingClientRect().width
    

    useEffect(() => {
        contentElAdjustment()
    }, [sidebarIsOpen])


    const contentElAdjustment = async () => {


        if (sidebarIsOpen) {
            await getSidebarWidth()
            contentEl.current!.style[stylePropBasedOnDirAndPosition()] = sidebarWidth.current + 'px'
            topBarEl.current!.style[stylePropBasedOnDirAndPosition()] = sidebarWidth.current + 'px'
        } else {
            contentEl.current!.style[stylePropBasedOnDirAndPosition()] = '0'
            topBarEl.current!.style[stylePropBasedOnDirAndPosition()] = '0'
        }
    }


    const stylePropBasedOnDirAndPosition = () => {
        const htmlDir = document.querySelector('html')?.getAttribute('dir')
        
        if (htmlDir == "rtl") {
            return sidebarPosition == 'start' ? 'margin-right' : 'margin-left'
        } else {
            return sidebarPosition == 'start' ? 'margin-left' : 'margin-right'
        }
    }


    return (
        <div className={["gamon-layout", props.layoutClass].join(" ")}>

            { props.sidebar &&
                <>
                    <div
                        className={[
                            "gamon-layout__sidebar",
                            "gamon-layout__sidebar--position-"+sidebarPosition,
                            props.sidebarClass,
                            !sidebarIsOpen ? 'gamon-layout__sidebar--hide' : ''
                        ].join(" ")}
                        style={sidebarStyleObject}
                        ref={sidebarEl}
                    >
                        <img onClick={sidebarToggler} src={iconClose} className="gamon-layout__sidebar__toggler" />
                        {props.sidebar}
                        
                    
                        <SidebarLink link="a simple link" />
                        <SidebarLink link="a simple link 2" />
                        <SidebarLink link="a simple link 3" />
                        <SidebarLink link="a simple link 4" />
                        <SidebarLink link="a simple link 4"
                            subLinks={
                                <>
                                    <SidebarLink link="sub link 1" />
                                    <SidebarLink link="sub link 2" />
                                    <SidebarLink link="sub link 3" />
                                </>
                            }
                        />

                       

                    </div>
                    <img onClick={sidebarToggler} src={iconMenu} className="gamon-layout__sidebar__toggler--open" />
                </>
            }

            

            <div className={["gamon-layout__content", props.contentClass].join(" ")} ref={contentEl}>

                { props.topbar &&
                    <div className="gamon-layout__content__topbar" ref={topBarEl}>
                        {props.topbar}
                    </div>
                }
                

                {props.children}
            </div>

        </div>
    )

}


export default Layout