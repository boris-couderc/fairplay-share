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
    //password,
    //email,
    user,
    //OnChangeValue,
    OnClickLoginForm,
    OnClearLoginError,
    error,
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log('data', data);

    useEffect(() => {
        return () => {
            OnClearLoginError();
        }
    }, []);

    useEffect(() => {
        console.log('errors', errors);
    });

    return user.pseudo !== undefined ? (
        <Redirect to="/" />
    ) : (
        <View layoutClass="login">
            <Wrapper>
                <Heading el="h1" like="h3">
                    Connection
                </Heading>


                {/* <Form onSubmit={OnClickLoginForm} width="small"> */}
                <Form onSubmit={handleSubmit(onSubmit)} width="small">

                    {error && (
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
                            required="Email requis."
                            errors={(errors && errors.email) ? errors.email : null}
                        />
                    </div>
                    
                    <div className="form__row">
                        <Input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            //label="Mot de passe"
                            register={register}
                            required="Mot de passe requis."
                            errors={(errors && errors.password) ? errors.password : null}
                        />
                    </div>
                    
                    <Button appearance="primary" type="submit" classProps="u-margin-top-.5">
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
