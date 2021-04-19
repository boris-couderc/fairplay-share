import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import View from 'src/components/View'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Form/Input'

import './style.scss'

const Login = ({ user, clearLoginError, onSubmitLoginForm, loginError }) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        clearLoginError()
        setIsLoading(true)
        onSubmitLoginForm(data)
    }

    useEffect(() => {
        if (loginError) {
            setIsLoading(false)
        }
    }, [loginError])

    return user.id !== undefined ? (
        <Redirect to="/" />
    ) : (
        <View layoutClass="login">
            <Wrapper>
                <Heading el="h1" like="h3">
                    Connection
                </Heading>

                <Form onSubmit={handleSubmit(onSubmit)} width="small">
                    {loginError && (
                        <div className="form__error">
                            Adresse email ou mot de passe invalide
                        </div>
                    )}

                    <div className="form__row">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Adresse e-mail"
                            //label="Adresse e-mail"
                            register={register}
                            required="Email requis"
                            errors={
                                errors && errors.email ? errors.email : null
                            }
                        />
                    </div>

                    <div className="form__row">
                        <Input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            //label="Mot de passe"
                            register={register}
                            required="Mot de passe requis"
                            errors={
                                errors && errors.password
                                    ? errors.password
                                    : null
                            }
                        />
                    </div>

                    <Button
                        appearance="primary"
                        type="submit"
                        classProps="u-margin-top-.5"
                        loading={isLoading}
                    >
                        Se connecter
                    </Button>
                </Form>

                <div>
                    Tu n'as pas de compte ?
                    <Button
                        appearance="outline"
                        size="small"
                        route="/inscription"
                        classProps="u-margin-left-1"
                    >
                        S'inscrire
                    </Button>
                </div>
            </Wrapper>
        </View>
    )
}

Login.propTypes = {
    user: PropTypes.object.isRequired,
    clearLoginError: PropTypes.func.isRequired,
    onSubmitLoginForm: PropTypes.func.isRequired,
    loginError: PropTypes.bool.isRequired,
}

export default Login
