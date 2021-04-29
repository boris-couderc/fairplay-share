import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Input'

import './style.scss'

const Registration = ({
    isLogged,
    onClearRegistrationError,
    onSubmitRegistrationForm,
    error, 
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        onClearRegistrationError()
        setIsLoading(true)
        onSubmitRegistrationForm(data)
    }

    useEffect(() => {
        if (error === 'mail') {

            setIsLoading(false)
            setError('email', {
                type: 'custom',
                message: 'Adresse mail déjà utilisée',
            })
            errors.email.ref.scrollIntoView({ behavior: 'smooth' })
            errors.email.ref.focus()
            
        } else if (error === 'pseudo') {

            setIsLoading(false)
            setError('pseudo', {
                type: 'custom',
                message: 'Pseudo déjà utilisé',
            })
            errors.pseudo.ref.scrollIntoView({ behavior: 'smooth' })
            errors.pseudo.ref.focus()

        } else if (error === 'address') {

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
    }, [error])

    return isLogged ? (
        <Redirect to="/" />
    ) : (
        <View layoutClass="registration"> 
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1" like="h2">
                    Inscription
                </Heading>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__cols">
                        <div className="form__row">
                            <Input
                                type="email"
                                name="email"
                                label="Adresse e-mail"
                                register={register}
                                required="Adresse e-mail requise"
                                errors={errors.email ? errors.email : null}
                            />
                        </div>
                        <div className="form__row">
                            <Input
                                type="text"
                                name="pseudo"
                                label="Pseudo"
                                register={register}
                                required="Pseudo requis"
                                errors={errors.pseudo ? errors.pseudo : null}
                            />
                        </div>
                    </div>

                    <div className="form__cols">
                        <div className="form__row">
                            <Input
                                type="text"
                                name="firstname"
                                label="Prénom"
                                register={register}
                                required="Prénom requis"
                                errors={
                                    errors.firstname ? errors.firstname : null
                                }
                            />
                        </div>

                        <div className="form__row">
                            <Input
                                type="text"
                                name="lastname"
                                label="Nom"
                                register={register}
                                required="Nom requis"
                                errors={
                                    errors.lastname ? errors.lastname : null
                                }
                            />
                        </div>
                    </div>

                    <div className="form__cols">
                        <div className="form__row">
                            <Input
                                type="password"
                                name="password"
                                label="Mot de passe"
                                register={register}
                                required="Mot de passe requis"
                                errors={
                                    errors.password ? errors.password : null
                                }
                            />
                        </div>
                    </div>

                    <div className="form__row form--separator">
                        <Input
                            type="text"
                            name="address"
                            label="Adresse"
                            register={register}
                            required="Adresse requise"
                            errors={errors.address ? errors.address : null}
                        />
                    </div>

                    <div className="form__cols">
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
                    </div>

                    <div className="form__row">
                        <Input
                            type="textarea"
                            name="presentation"
                            label="Présentation"
                            register={register}
                        />
                    </div>

                    <Button
                        appearance="primary"
                        type="submit"
                        classProps="u-margin-top-.5"
                        loading={isLoading}
                    >
                        S'inscrire
                    </Button>
                </Form>
                <div>
                    Tu as déjà un compte ?
                    <Button
                        appearance="outline"
                        size="small"
                        route="/connexion"
                        classProps="u-margin-left-1"
                    >
                        Se connecter
                    </Button>
                </div>
            </Wrapper>
        </View>
    )
}

Registration.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onSubmitRegistrationForm: PropTypes.func.isRequired,
    onClearRegistrationError: PropTypes.func.isRequired,
    error: PropTypes.string,
}

Registration.defaultProps = {
    error: null,
}

export default Registration
