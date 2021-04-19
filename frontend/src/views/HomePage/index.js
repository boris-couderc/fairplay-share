import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'

import './style.scss';

const HomePage = props => {
    return (
        <View layoutClass="homepage">
            <Wrapper>

                <Heading el="h1">Homepage</Heading>

            </Wrapper>
        </View>
    )
};

HomePage.propTypes = {
  
};

export default HomePage;
