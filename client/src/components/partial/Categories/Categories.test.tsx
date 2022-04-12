import React from 'react';
import {render} from '../../../utils/testUtils';
import Categories from './Categories';

jest.mock('../../../@queries/useCategoriesQuery', () => ({
  useCategoriesQuery: () => ({
    data: {
      categories: [
        {
          name: 'music',
          iconClassName: 'music-icon',
        },
      ],
    },
  }),
}));

describe('Categories', () => {
  it('renders OK', () => {
    render(<Categories />);
  });
});
