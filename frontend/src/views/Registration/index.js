import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Form/Input'

import './style.scss';

const Registration = () => {
    return (
        <View layoutClass="registration">
            <Wrapper>
                <Heading el="h1" like="h3">
                    Inscription
                </Heading>
                <Form
                    onSubmit={() => {
                        console.log('test Inscription')
                    }}
                    width="small"
                >
                    
                    <Input type="input" placeholder="Adresse e-mail" />

                    <Input type="password" placeholder="Mot de passe" />


                    <Button appearance="primary" type="submit">
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
};

Registration.propTypes = {
  
};

export default Registration;
