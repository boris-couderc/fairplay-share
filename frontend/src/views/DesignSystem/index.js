import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';
import Button from 'src/components/Button';
import Heading from 'src/components/Heading';
import Form from 'src/components/Form';
import Input from 'src/components/Form/Input';

import './style.scss';

const DesignSystem = (props) => {
  return (
    <View layoutClass="design-system">
      <Wrapper>
        
        <Heading el="h1">
            Design system
        </Heading>




        <Heading el="h2">
            Form
        </Heading>

        <Form
            onSubmit={() => {
                console.log('test')
            }}
        >
            <Input type="input" name="name" />
            <Input type="input" name="name" placeholder="Lorem ipsum" />
            <Input type="password" name="name" />

            <Input type="checkbox" name="name-c1" label="Lorem ipsum dolor" />
            <Input type="checkbox" name="name-c2" label="Lorem ipsum" />

            <Input type="number" name="name" placeholder="10" />
            <Input type="date" name="name" />
            <Input type="time" name="name" />
            <Input type="textarea" name="name" placeholder="Lorem ipsum" />
        </Form>



        <Heading el="h2">
            Buttons
        </Heading>
test
        <Button appearance="" size="small" route="/" icon="clock">
          test
        </Button>
        <br />
        <Button appearance="outline" size="small" href="https://www.google.com/">
          test
        </Button>
        <Button appearance="primary" size="small" onClick={()=>{console.log("click bt")}}>
          test
        </Button>
        <Button appearance="primary-outline" size="small" className="special">
          test
        </Button>
        <br />
        test
        <Button appearance="primary" size="big" icon="account">
          test avec icon
        </Button>
        <Button appearance="primary-outline" size="big">
          test
        </Button>
        <br />
        <Button appearance="secondary">
          test
        </Button>
        <Button appearance="secondary-outline" icon="pin">
          test
        </Button>
        test
        <br />
        test
        <Button appearance="primary" onClick={()=>{console.log("click bt")}}>
          test
        </Button>
        <Button appearance="primary" route="/inscription">
            Inscription
        </Button>
        test

        <Heading el="h2">
            Icons
        </Heading>

        {/* <Icon name="account" />
        <Icon name="checkmark" />
        <Icon name="clock" />
        <Icon name="cross" />
        <Icon name="grade" />
        <Icon name="pencil" />
        <Icon name="pin" /> */}

        <Heading el="h2">
            Heading
        </Heading>

        <Heading el="h1">
            Heading h1
        </Heading>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <Heading el="h2">
            Heading h2
        </Heading>
        <Heading el="h3">
            Heading h3
        </Heading>
        <Heading el="h4">
            Heading h4
        </Heading>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      </Wrapper>
    </View>
  );
};

DesignSystem.propTypes = {};

export default DesignSystem;
