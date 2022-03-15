import React from 'react';
import {Link} from 'react-router-dom';
import {NavTabType} from '../../../@types/NavTabType';
import routes from '../../../routes';
import Nav from '../Nav/Nav';
import {useCategories} from './useCategories';

const Categories = () => {
  const {categories} = useCategories();
  return (
    <ul className="nav__tabs categories">
      {categories?.map(category => (
        <Categories.Category category={category} key={category.name} />
      ))}
    </ul>
  );
};

type CategoryProps = {
  category: NavTabType;
};

Categories.Category = ({category}: CategoryProps) => (
  <Link to={`${routes.videos}?category=${category.name}`}>
    <Nav.TabContent tab={category} />
  </Link>
);

export default React.memo(Categories);
