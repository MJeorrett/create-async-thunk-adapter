import React from 'react';
import { Link } from 'react-router-dom';

import { pathFactories } from '../Routes';

export const HomePage = () => {
  return (
    <ul>
      <li>
        <Link to={pathFactories.home()}>Home</Link>
      </li>
      <li>
        <Link to={pathFactories.fields()}>Fields</Link>
      </li>
    </ul>
  );
};