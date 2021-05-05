import React, { useEffect, useState, useRef } from 'react'

import './style.scss'

import Background2 from '../images/background2/Background'
import Cloud from '../images/background2/Cloud'
import City from '../images/background2/City'
import Background from '../images/background/Background'
import Foreground from '../images/background/Foreground'
import ShadowWoman from '../images/background/ShadowMan'
import ShadowMan from '../images/background/ShadowWoman'
import Man from '../images/background/Man'
import Woman from '../images/background/Woman'

const inertia = 0.04

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

    const background2 = useRef(null)
    const cloud = useRef(null)
    const city = useRef(null)
    const background = useRef(null)
    const backgroundMask1 = useRef(null)
    const backgroundMask2 = useRef(null)
    const foreground = useRef(null)
    const shadowWoman = useRef(null)
    const shadowMan = useRef(null)
    const man = useRef(null)
    const woman = useRef(null)

    const UpdateSvg = () => {
        background2.current.style.transform = `translate3d(${deltaX.current/50}px,${deltaY.current/80}px,0)`
        cloud.current.style.transform = `translate3d(${deltaX.current/100}px,${deltaY.current/100}px,0)`
        city.current.style.transform = `translate3d(${deltaX.current/35}px,${deltaY.current/40}px,0)`
        background.current.style.transform = `translate3d(${deltaX.current/30}px,${deltaY.current/80}px,0)`
        backgroundMask1.current.style.transform = `translate3d(${deltaX.current/30}px,${deltaY.current/80}px,0)`
        backgroundMask2.current.style.transform = `translate3d(${deltaX.current/30}px,${deltaY.current/80}px,0)`
        foreground.current.style.transform = `translate3d(${deltaX.current/10}px,${deltaY.current/20}px,0)`
        man.current.style.transform = `translate3d(${deltaX.current/23}px,${deltaY.current/50}px,0)`
        shadowMan.current.style.transform = `translate3d(${deltaX.current/25}px,${deltaY.current/50}px,0)`
        woman.current.style.transform = `translate3d(${deltaX.current/18}px,${deltaY.current/50}px,0)`
        shadowWoman.current.style.transform = `translate3d(${deltaX.current/20}px,${deltaY.current/50}px,0)`
    }

    const updatePos = () => {
        cx.current = x.current;
        cy.current = y.current;
        x.current = inertiaTo(cx.current,tx.current,inertia);
        y.current = inertiaTo(cy.current,ty.current,inertia);

        
        let calcDeltaX = - ( x.current - ww.current / 2 )
        let calcDeltaY = - ( y.current - wh.current / 2 )
        if(calcDeltaX > 1000) {
            deltaX.current = 1000
        } else if(calcDeltaX < -1000) {
            deltaX.current = -1000
        } else {
            deltaX.current = calcDeltaX
        }

        if(calcDeltaY > 600) {
            deltaY.current = 600
        } else if(calcDeltaY < -600) {
            deltaY.current = -600
        } else {
            deltaY.current = calcDeltaY
        }
        
       /*
        deltaX.current = - ( x.current - ww.current / 2 )
        deltaY.current = - ( y.current - wh.current / 2 )
        */
       
        UpdateSvg()
        requestAnimationFrame(updatePos);
    }

    const handlerMouseMove = (e) => {
        tx.current = e.clientX;
        ty.current = e.clientY;
    }

    useEffect(() => {
        window.addEventListener('mousemove', e => handlerMouseMove(e))
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
            <div className="homepage-background-2" >
                <Background2 refProps={background2} />
                <Cloud refProps={cloud} />
                <City refProps={city} />
            </div>
            <div className="homepage-background"  >
                <Background refProps={background}/>
                <Foreground refProps={foreground} />
                <ShadowWoman refProps={shadowWoman} refPropsBg={backgroundMask1} />
                <ShadowMan refProps={shadowMan} refPropsBg={backgroundMask2} />
                <Woman refProps={woman} />
                <Man refProps={man} />
            </div>
        </>
    )
}

export default BackgroundNoLogged
