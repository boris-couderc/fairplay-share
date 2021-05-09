import React, { useEffect, useState, Suspense } from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'
import CardsGrid from 'src/components/CardsGrid'
import Card from 'src/containers/Card'
import Loader from 'src/components/Loader'
import HeroLogged from './Hero/HeroLogged'
import HeroNoLogged from './Hero/HeroNoLogged'

const Background = React.lazy(() =>
    import('./Background'),
)

import './style.scss'

import imgNoResult from 'src/assets/images/noActivities.svg'

const HomePage = ({
    isLogged,
    user,
    isCheckedLoginLocalStorage,
    fetchLastActivities,
    lastActivities,
    lastActivitiesLoaded,
    lastActivitiesIsLoading,
    userActivities,
    userActivitiesLoaded,
}) => {
    const [layoutClass, setlayoutClass] = useState('homepage')

    useEffect(() => {
        if (!isLogged && isCheckedLoginLocalStorage) {
            if (!lastActivitiesLoaded && !lastActivitiesIsLoading) {
                fetchLastActivities()
            }
            setlayoutClass('homepage-no-logged')
        } else if (isLogged && isCheckedLoginLocalStorage) {
            setlayoutClass('homepage-logged')
        }
    }, [isLogged, isCheckedLoginLocalStorage])

    return (
        <View layoutClass={layoutClass}>
            <ScrollToTop />
            <Wrapper>
                {isLogged && (
                    <>
                        <Suspense
                            fallback={
                                <div style={{ minHeight: '25rem' }}></div>
                            }
                        >
                            <HeroLogged
                                user={user}
                                userActivities={userActivities}
                                userActivitiesLoaded={userActivitiesLoaded}
                            />
                            <Background logged />
                            <SearchBar />
                        </Suspense>
                    </>
                )}
                {!isLogged && isCheckedLoginLocalStorage && (
                    <>
                        <Suspense
                            fallback={
                                <div style={{ minHeight: '40rem' }}></div>
                            }
                        >
                            <HeroNoLogged />
                            <Background />
                            <SearchBar />
                        </Suspense>
                    </>
                )}
                {isLogged && (
                    <>
                        {!userActivitiesLoaded ? (
                            <Loader classProps="loader--p3" />
                        ) : (
                            <>
                                {userActivities.activities.length > 0 ? (
                                    <>
                                        <Heading el="h2" like="h3">
                                            Mes prochaines activités :
                                        </Heading>
                                        <CardsGrid>
                                            {userActivities.activities.map(
                                                (activity) => {
                                                    return activity.creator_id ==
                                                        user.id ? (
                                                        <Card
                                                            key={`card-${activity.id}`}
                                                            activity={activity}
                                                            loggedUserRole="creator"
                                                        />
                                                    ) : (
                                                        <Card
                                                            key={`card-${activity.id}`}
                                                            activity={activity}
                                                            loggedUserRole="participant"
                                                        />
                                                    )
                                                },
                                            )}
                                        </CardsGrid>
                                    </>
                                ) : (
                                    <div className="homepage__no-result">
                                        <Heading el="h2" like="h3">
                                            Encore inscris à aucune activité ?
                                        </Heading>
                                        <Heading el="p" like="h6">
                                            Crées en une ou inscris toi vite !
                                        </Heading>
                                        <img
                                            src={imgNoResult}
                                            alt="pas d'activites"
                                            className="homepage__no-result-img"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                {!isLogged && isCheckedLoginLocalStorage && (
                    <>
                        {!lastActivitiesLoaded ? (
                            <Loader classProps="loader--p3" />
                        ) : (
                            <>
                                {lastActivities.length > 0 ? (
                                    <>
                                        <Heading el="h2" like="h3">
                                            Explorez les dernières activités
                                            proposées :
                                        </Heading>
                                        <CardsGrid>
                                            {lastActivities.map(
                                                (activity, index) => {
                                                    return (
                                                        <Card
                                                            key={`card-${activity.id}`}
                                                            activity={activity}
                                                        />
                                                    )
                                                },
                                            )}
                                        </CardsGrid>
                                    </>
                                ) : (
                                    <div className="homepage__no-result">
                                        <Heading el="h2" like="h4">
                                            Désolé aucune activité trouvée ...
                                        </Heading>
                                        <div className="u-margin-top-2">
                                            <Button
                                                appearance="secondary"
                                                route="/creation"
                                            >
                                                Proposer une activité
                                            </Button>
                                        </div>
                                        <img
                                            src={imgNoResult}
                                            alt="pas d'activites"
                                            className="homepage__no-result-img"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </Wrapper>
        </View>
    )
}

HomePage.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    user: PropTypes.object,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,
    fetchLastActivities: PropTypes.func.isRequired,
    lastActivities: PropTypes.array.isRequired,
    lastActivitiesLoaded: PropTypes.bool.isRequired,
    lastActivitiesIsLoading: PropTypes.bool.isRequired,
    userActivities: PropTypes.object.isRequired,
    userActivitiesLoaded: PropTypes.bool.isRequired,
}

HomePage.defaultProps = {
    user: null,
}

export default HomePage
