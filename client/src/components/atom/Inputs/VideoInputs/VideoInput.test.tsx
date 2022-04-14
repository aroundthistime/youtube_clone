import React from 'react';
import {render, testData} from '../../../../utils/testUtils';
import VideoInput, {getCategoryFromCategoryInputValue} from './VideoInput';

describe('VideoInputs', () => {
  it('VideoFileInput renders OK', () => {
    render(<VideoInput.VideoFileInput />);
  });

  it('ThumbnailInput renders OK', () => {
    render(<VideoInput.ThumbnailInput />);
  });

  it('TitleInput renders OK', () => {
    render(<VideoInput.TitleInput />);
  });

  it('DescriptionInput renders OK', () => {
    render(<VideoInput.DescriptionInput />);
  });

  it('CategoryInput renders OK', () => {
    render(<VideoInput.CategoryInput />, {
      preloadedState: {
        categories: testData.categories,
      },
    });
  });

  it('extracts category from CategoryInput', () => {
    const {getByTestId} = render(<VideoInput.CategoryInput />, {
      preloadedState: {
        categories: testData.categories,
      },
    });
    const selectElement = getByTestId('category-input') as HTMLSelectElement;
    expect(getCategoryFromCategoryInputValue(selectElement.value)).toEqual(
      'music',
    );
    selectElement.value = '기타';
    expect(getCategoryFromCategoryInputValue(selectElement.value)).toEqual(
      undefined,
    );
  });
});
