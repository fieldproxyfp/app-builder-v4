import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './index.css';
import { enableMocking } from './testing/mocks';
// ... existing imports ...

function setResponsiveTypography() {
  const width = window.innerWidth;
  let fontSizeMultiplier = 1;
  let lineHeightMultiplier = 1;
  let letterSpacingMultiplier = 1;

  if (width < 640) {
    // sm breakpoint
    fontSizeMultiplier = 0.8;
    lineHeightMultiplier = 0.9;
    letterSpacingMultiplier = 0.9;
  } else if (width < 768) {
    // md breakpoint
    fontSizeMultiplier = 0.9;
    lineHeightMultiplier = 0.95;
    letterSpacingMultiplier = 0.95;
  }

  document.documentElement.style.setProperty(
    '--font-size-multiplier',
    fontSizeMultiplier.toString(),
  );
  document.documentElement.style.setProperty(
    '--line-height-multiplier',
    lineHeightMultiplier.toString(),
  );
  document.documentElement.style.setProperty(
    '--letter-spacing-multiplier',
    letterSpacingMultiplier.toString(),
  );
}

// Call the function initially and add event listener for resize
setResponsiveTypography();
window.addEventListener('resize', setResponsiveTypography);

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

enableMocking().then(() => {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
