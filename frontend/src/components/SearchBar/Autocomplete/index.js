import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import useVisible from 'src/hooks/useVisible'

import './style.scss'

const Autocomplete = ({ data, onClick, initialIsVisible }) => {
    const { ref, isVisible, setIsVisible } = useVisible(initialIsVisible)

    useEffect(() => {
        return () => {
            setIsVisible(false)
        }
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [data])

    const handleClick = (index) => {
        onClick(index)
        setIsVisible(false)
    }

    return (
        <>
            {isVisible && (
                <ul className="autocomplete" ref={ref}>
                    {data.map((el, index) => {
                        return (
                            <li
                                className="autocomplete__item"
                                onClick={() => handleClick(index)}
                                key={`${el.lat}${el.lng}${index}`}
                            >
                                {el.name}
                                <span className="autocomplete__detail">
                                    {el.city && (
                                        <>{el.city}, </>
                                    )}
                                    {el.postcode && (
                                        <>{el.postcode}, </>
                                    )}
                                    {el.reg && (
                                        <>{el.reg}, </>
                                    )}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}

Autocomplete.propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    initialIsVisible: PropTypes.bool.isRequired,
}

export default Autocomplete
