import React from 'react';
import { addDecorator } from '@storybook/react';
import styled from 'rn-css';
import { LanguageContext, ThemeContext } from '../src/services/contexts'

const Container = styled.View``

addDecorator((storyFn) => (
  <Container>
    <LanguageContext.Provider>
      <ThemeContext.Provider theme={'default'}>
        {storyFn()}
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  </Container>
))
