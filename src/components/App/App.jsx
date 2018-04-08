import React, { Component } from 'react';
import { BpkGridContainer } from 'bpk-component-grid';


import FormBuilder from '../FormBuilder/FormBuilder';

import { schema, uiSchema, defaultValue } from '../../schemas/tame';

import STYLES from './App.scss';

const c = className => STYLES[className] || 'UNKNOWN';


export default () => (
  <div className={c('App')}>
    <main className={c('App__main')}>
      <FormBuilder
        schema={schema}
        uiSchema={uiSchema}
        defaultValue={defaultValue}
      />

    </main>
  </div>
);
