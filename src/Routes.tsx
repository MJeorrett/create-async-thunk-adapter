import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Pages from './pages';

export const pathFactories = {
  home: () => '/',
  fields: () => '/fields',
  createField: () => '/fields/create',
  editField: (id: number|string) => `/fields/${id}/edit`,
};

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={pathFactories.home()}>
        <Pages.HomePage />
      </Route>
      <Route exact path={pathFactories.fields()}>
        <Pages.FieldsListPage />
      </Route>
      <Route path={pathFactories.createField()}>
        <Pages.CreateFieldPage />
      </Route>
      <Route path={pathFactories.editField(':id')}>
        <Pages.EditFieldPage />
      </Route>
    </Switch>
  );
};
