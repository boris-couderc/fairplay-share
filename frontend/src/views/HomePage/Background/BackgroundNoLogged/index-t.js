import React, { useEffect, useState, useRef } from 'react'

import './style.scss'

import Background from '../images/svg/Background.svg'
import Foreground from '../images/svg/Foreground.svg'
import ShadowWoman from '../images/svg/ShadowWoman.svg'
import ShadowMan from '../images/svg/ShadowMan.svg'
import Man from '../images/svg/Man.svg'
import Woman from '../images/svg/Woman.svg'

// import Background2 from '../images/background2/Background'
// import Cloud from '../images/background2/Cloud'
// import City from '../images/background2/City'

const inertia = 0.05

const inertiaTo = (current,target,amount) => {
    let distToGo = target-current;
    let delta = current + (distToGo * amount);
    if (Math.abs(distToGo) < 0.01){
        distToGo = 0;
        delta = target;
    }
    return delta;
}

const BackgroundNoLogged = () => {
    const ww = useRef(0)
    const wh = useRef(0)

    const handleResize = () => {
        ww.current = window.innerWidth
        wh.current = window.innerHeight
        console.log(ww.current, wh.current)
    }

    const cx = useRef(0)
    const cy = useRef(0)
    const tx = useRef(0)
    const ty = useRef(0)
    const x = useRef(0)
    const y = useRef(0)
    const deltaX = useRef(0)
    const deltaY = useRef(0)

    // const woman = useRef(null)
    // const man = useRef(null)
    // const foreground = useRef(null)

    const UpdateSvg = () => {

        // woman.current.style.transform = `translate3d(${deltaX.current}px,${deltaY.current}px,0)`
        // man.current.style.transform = `translate(${deltaX.current/10}px,${deltaY.current/10}px)`
        // foreground.current.style.transform = `translate3d(${deltaX.current/10}px,${deltaY.current/10}px,0)`

    }

    const updatePos = () => {
        cx.current = x.current;
        cy.current = y.current;
        x.current = inertiaTo(cx.current,tx.current,inertia);
        y.current = inertiaTo(cy.current,ty.current,inertia);
        deltaX.current = - ( x.current - ww.current / 2 )
        deltaY.current = - ( y.current - wh.current / 2 )
        UpdateSvg()
        requestAnimationFrame(updatePos);
    }

    const handlerMouseMove = (e) => {
        tx.current = e.clientX;
        ty.current = e.clientY;
    }

    useEffect(() => {
        // window.addEventListener('mousemove', e => handlerMouseMove(e))
        window.addEventListener('click', e => handlerMouseMove(e))


        window.addEventListener("resize", handleResize)
        handleResize()
        updatePos()
        return () => {
            window.removeEventListener('mousemove', e => handlerMouseMove(e))
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            <div className="homepage-background-2">
                {/* <Background2 />
                <Cloud />
                <City /> */}
            </div>
            <div className="homepage-background">
                <Background />
                <Foreground />
                <ShadowWoman/>
                <ShadowMan />
                <Man  />
                <Woman  />
            </div>
        </>
    )
}

export default BackgroundNoLogged
