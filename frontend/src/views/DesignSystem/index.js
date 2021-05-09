import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Form from 'src/components/Form'
import Input from 'src/components/Input'
import Icon from 'src/components/Icon'

import './style.scss'

const DesignSystem = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <View layoutClass="design-system">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1">Design system</Heading>
                <Heading el="h2">Form</Heading>
                <Form
                    onSubmit={() => {
                        console.log('test')
                    }}
                >

                    <div className="form__row">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Adresse e-mail"
                            //label="Adresse e-mail"
                            register={register}
                            required="Email requis"
                            errors={
                                errors.email ? errors.email : null
                            }
                        />
                    </div>

                    <div className="form__row">
                        <Input
                            type="email"
                            name="email"
                            //placeholder="Adresse e-mail"
                            label="Adresse e-mail"
                            register={register}
                            required="Email requis"
                            errors={
                                errors.email ? errors.email : null
                            }
                        />
                    </div>

                    <div className="form__row">
                        <Input
                            type="email"
                            name="email"
                            //placeholder="Adresse e-mail"
                            label="Adresse e-mail"
                            register={register}
                            required="Email requis"
                            errors={
                                errors.email ? errors.email : null
                            }
                        />
                    </div>

                    <Input type="input" name="name" register={register} />

                    {/* <Input type="input" name="name" placeholder="Lorem ipsum" />
                    <Input type="password" name="name" />

                    <Input
                        type="checkbox"
                        name="name-c1"
                        label="Lorem ipsum dolor"
                    />
                    <Input type="checkbox" name="name-c2" label="Lorem ipsum" />

                    <Input type="number" name="name" placeholder="10" />
                    <Input type="date" name="name" />
                    <Input type="time" name="name" />
                    <Input
                        type="textarea"
                        name="name"
                        placeholder="Lorem ipsum"
                    /> */}


                </Form>
                <Heading el="h2">Buttons</Heading>
                

                <div className="u-text-center">
                <Button appearance="" size="small" route="/" icon="clock">
                    test
                </Button>
                <br />
                <Button
                    appearance="outline"
                    size="small"
                    href="https://www.google.com/"
                >
                    test
                </Button>
                <Button
                    appearance="primary"
                    size="small"
                    onClick={() => {
                        console.log('click bt')
                    }}
                >
                    test
                </Button>
                <Button
                    appearance="primary-outline"
                    size="small"
                    className="special"
                >
                    test
                </Button>
                <br />
                
                <Button appearance="primary" size="big" icon="account">
                    test avec icon
                </Button>
                <Button appearance="primary-outline" size="big">
                    test
                </Button>
                <br />
                <Button appearance="secondary">test</Button>
                <Button appearance="secondary-outline" icon="pin">
                    test
                </Button>
                <Button appearance="" icon="account">
                    test
                </Button>
                
                <br />
                
                <Button
                    appearance="primary"
                    onClick={() => {
                        console.log('click bt')
                    }}
                >
                    test
                </Button>
                <Button appearance="primary" route="/inscription">
                    Inscription
                </Button>
<br />
                <Button appearance="primary-outline" route="/" loading={true}>
                    test
                </Button>
                <Button appearance="secondary-outline" route="/" loading={true}>
                    test
                </Button>
                <Button appearance="outline" route="/" loading={true}>
                    test
                </Button>
                <Button appearance="" size="small" route="/" loading={true}>
                    test
                </Button>
                <Button appearance="" size="big" route="/" loading={true}>
                    test
                </Button>
                <br />

                <Button appearance="primary-outline" route="/" loading={true} disabled={true}>
                    test
                </Button>
                <Button appearance="secondary-outline" route="/" loading={true} disabled={true}>
                    test
                </Button>
                <Button appearance="primary" size="big" icon="account" disabled={true}>
                    test avec icon
                </Button>
                <Button appearance="primary-outline" size="big" disabled={true}>
                    test
                </Button>
                <br />
                <Button appearance="secondary" disabled={true}>test</Button>
                <Button appearance="secondary-outline" icon="pin" disabled={true}>
                    test
                </Button>
                <Button appearance="" icon="account" disabled={true}>
                    test
                </Button>
                </div>
                
                <Heading el="h2">Icons</Heading>

                <div style={{color:'#425359'}} className="u-text-center">
                    <Icon name="account" />
                    <Icon name="pin" />
                    <Icon name="reward" />


                </div>


                <Heading el="h2">Heading</Heading>
                <Heading el="h1">Heading h1</Heading>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <Heading el="h2">Heading h2</Heading>
                <Heading el="h3">Heading h3</Heading>
                <Heading el="h4">Heading h4</Heading>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </Wrapper>
        </View>
    )
}

DesignSystem.propTypes = {}

export default DesignSystem
