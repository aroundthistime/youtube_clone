import React from 'react';
import {render} from '../../../utils/testUtils';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders OK', () => {
    render(
      <ErrorBoundary fallback={<div />}>
        <div />
      </ErrorBoundary>,
    );
  });
  it('renders fallback when error occured', () => {
    const ThrowError = () => {
      throw new Error('Error for Testing');
    };
    const {getByTestId} = render(
      <ErrorBoundary fallback={<div data-testid="errorboundary__fallback" />}>
        <ThrowError />
      </ErrorBoundary>,
    );
    getByTestId('errorboundary__fallback');
  });
});
