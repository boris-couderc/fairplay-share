import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'

import './style.scss'

const todayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

const CreateActivity = ({
    isLogged,
    isCheckedLoginLocalStorage,
    fetchSports,
    sports,
    onSubmitCreateActivity,
    isCreated,
    activityCreatedChangeToFalse,
    error,
}) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchSports()
    }, [])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setIsLoading(true)
        onSubmitCreateActivity(data)
    }

    useEffect(() => {
        if (error === 'address') {
            setIsLoading(false)
            setError('address', {
                type: 'custom',
                message: 'Adresse invalide',
            })
            setError('city', {
                type: 'custom',
            })
            setError('zip', {
                type: 'custom',
            })
            errors.address.ref.scrollIntoView({ behavior: 'smooth' })
            errors.address.ref.focus()
        }
        if (error === 'api') {
            setIsLoading(false)
        }
    }, [error])

    useEffect(() => {
        if (isCreated) {
            activityCreatedChangeToFalse()
            history.push('/')
        }
    }, [isCreated])

    return !isLogged && isCheckedLoginLocalStorage ? (
        <Redirect to="/" />
    ) : (
        <View layoutClass="create-activity">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1" like="h2">
                    Proposer une activité
                </Heading>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__row">
                        <Input
                            type="text"
                            name="title"
                            label="Nom de l'activité"
                            register={register}
                            required="Nom de l'activité requis"
                            errors={errors.title ? errors.title : null}
                        />
                    </div>

                    <div className="form__cols form__cols--3-cols">
                        <div className="form__row">
                            <Input
                                type="date"
                                name="date"
                                label="Date"
                                min={todayDate()}
                                register={register}
                                required="Date requise"
                                errors={errors.date ? errors.date : null}
                            />
                        </div>
                        <div className="form__row">
                            <Input
                                type="time"
                                name="time"
                                label="Heure"
                                defaultValue="09:00"
                                register={register}
                                required="Heure requise"
                                errors={errors.time ? errors.time : null}
                            />
                        </div>
                        <div className="form__row">
                            <Input
                                type="time"
                                name="duration"
                                label="Durée"
                                defaultValue="01:00"
                                register={register}
                                required="Durée requise"
                                errors={
                                    errors.duration ? errors.duration : null
                                }
                            />
                        </div>
                    </div>

                    <div className="form__cols">
                        <div className="form__row">
                            <Input
                                type="select"
                                name="sport"
                                label="Sport"
                                placeholder="Choisis un sport"
                                register={register}
                                required="Sport requis"
                                options={sports}
                                errors={errors.sport ? errors.sport : null}
                            />
                        </div>

                        <div className="form__row">
                            <Input
                                type="number"
                                name="min_participant"
                                label="Nombre de participants minimum"
                                defaultValue="2"
                                min="1"
                                register={register}
                                required="Nombre minimum requis"
                                errors={
                                    errors.min_participant
                                        ? errors.min_participant
                                        : null
                                }
                            />
                        </div>
                    </div>

                    <div className="form__row">
                        <Input
                            type="textarea"
                            name="description"
                            label="Description de l'activité proposée"
                            register={register}
                            required="Petite description requise"
                            errors={
                                errors.description ? errors.description : null
                            }
                        />
                    </div>

                    {error && error == 'api' && (
                        <div className="form__error">
                            <Icon
                                name="pin-off"
                                classProps="searchbar__error-icon"
                            />
                            Erreur Mapbox API, veuillez réessayer
                        </div>
                    )}

                    <div className="form__row">
                        <Input
                            type="text"
                            name="address"
                            label="Adresse de rendez-vous"
                            register={register}
                            required="Adresse requise"
                            errors={errors.address ? errors.address : null}
                        />
                    </div>

                    <div className="form__row">
                        <Input
                            type="zip"
                            name="zip"
                            label="Code postal"
                            register={register}
                            required="Code postal requis"
                            errors={errors.zip ? errors.zip : null}
                        />
                    </div>

                    <div className="form__row">
                        <Input
                            type="text"
                            name="city"
                            label="Ville"
                            register={register}
                            required="Ville requise"
                            errors={errors.city ? errors.city : null}
                        />
                    </div>

                    <Button
                        appearance="primary"
                        type="submit"
                        classProps="u-margin-top-.5"
                        loading={isLoading}
                    >
                        Proposer
                    </Button>
                </Form>
            </Wrapper>
        </View>
    )
}

CreateActivity.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,
    fetchSports: PropTypes.func.isRequired,
    sports: PropTypes.array.isRequired,
    onSubmitCreateActivity: PropTypes.func.isRequired,
    isCreated: PropTypes.bool.isRequired,
    activityCreatedChangeToFalse: PropTypes.func.isRequired,
    error: PropTypes.string,
}

CreateActivity.defaultProps = {
    error: null,
}

export default CreateActivity
