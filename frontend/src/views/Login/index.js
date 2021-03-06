import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

import './style.scss'

const Login = ({
    isLogged,
    onClearLoginError,
    onSubmitLoginForm,
    loginError,
}) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(isLogged) {
            // history.goBack()
            history.push(`/`)
        }
    }, [isLogged])
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        onClearLoginError()
        setIsLoading(true)
        onSubmitLoginForm(data)
    }

    useEffect(() => {
        if (loginError) {
            setIsLoading(false)
            setError('email', {
                type: 'custom',
            })
            setError('password', {
                type: 'custom',
            })
        }
    }, [loginError])

    return (
        <View layoutClass="login">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1" like="h2">
                    Connexion
                </Heading>

                <Form onSubmit={handleSubmit(onSubmit)} width="small">
                    {loginError && (
                        <div className="form__error">
                            Adresse e-mail ou mot de passe invalide
                        </div>
                    )}

                    <div className="form__row">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Adresse e-mail"
                            //label="Adresse e-mail"
                            register={register}
                            required="Adresse e-mail requise"
                            errors={errors.email ? errors.email : null}
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
                            errors={errors.password ? errors.password : null}
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
    isLogged: PropTypes.bool.isRequired,
    onClearLoginError: PropTypes.func.isRequired,
    onSubmitLoginForm: PropTypes.func.isRequired,
    loginError: PropTypes.bool.isRequired,
}

export default Login
