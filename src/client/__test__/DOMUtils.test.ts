import {
  updateCustomMeta,
  updateLink,
  updateMeta,
  updateTag
} from '@client/DOMUtils';

describe('DOMUtils', () => {
  it('updateLink', () => {
    updateLink('/ref', '/path');
  });

  it('updateMeta', () => {
    updateMeta('/ref', '/path');
  });

  it('updateCustomMeta', () => {
    updateCustomMeta('/ref', '/path');
  });

  it('updateTag', () => {
    updateTag('div', 'demo', 'demo', 'demo', 'demo');
  });
});
