import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";

import View from 'src/components/View'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Form/Input'

import './style.scss'

const Login = ({
    password,
    email,
    user,
    OnChangeValue,
    OnClickLoginForm,
    OnClearLoginError,
    error,
}) => {
    useEffect(() => {
        return () => {
            OnClearLoginError()
        }
    }, [])

    return user.pseudo !== undefined ? (
        <Redirect to="/" />
    ) : (
        <View layoutClass="login">
            <Wrapper>
                <Heading el="h1" like="h3">
                    Connection
                </Heading>
                <Form onSubmit={OnClickLoginForm} width="small">
                    {error && (
                        <div className="form__error">
                            Adresse email ou mot de passe invalide
                        </div>
                    )}
                    <Input
                        type="email"
                        name="mail"
                        placeholder="Adresse e-mail"
                        HandleOnChange={OnChangeValue}
                        value={email}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        HandleOnChange={OnChangeValue}
                        value={password}
                    />
                    <Button appearance="primary" type="submit">
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
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    OnChangeValue: PropTypes.func.isRequired,
    OnClickLoginForm: PropTypes.func.isRequired,
    OnClearLoginError: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
}

export default Login;
