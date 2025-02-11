'use client';

import React from 'react';
import { withRef } from '@udecode/cn';
import { PlateElement } from './plate-element';

export const CodeLineElement = withRef((props, ref) => (
  <PlateElement ref={ref} {...props} />
));