import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'


import './style.scss';

const HomePage = props => {
    return (
        <View layoutClass="homepage">
            <ScrollToTop />
            <Wrapper>

                <Heading el="h1">Homepage</Heading>

                <SearchBar />

            </Wrapper>
        </View>
    )
};

HomePage.propTypes = {
  
};

export default HomePage;
