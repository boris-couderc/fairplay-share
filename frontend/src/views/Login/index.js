import React from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Form/Input'

import './style.scss'

const Login = () => {
    return (
        <View layoutClass="login">
            <Wrapper>
                <Heading el="h1" like="h3">
                    Connection
                </Heading>
                <Form
                    onSubmit={() => {
                        console.log('test')
                    }}
                >
                    <Input type="input" placeholder="Adresse e-mail" />

                    <Input type="password" placeholder="Mot de passe" />

                    <Button appearance="primary" type="submit">
                        Connexion
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
                        Inscription
                    </Button>
                </div>
            </Wrapper>
        </View>
    )
}

Login.propTypes = {}

export default Login
