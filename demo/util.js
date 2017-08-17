// this is disabled to make it possible to have other exports
// form this file in the future:
/* eslint-disable import/prefer-default-export */

export const slug = str => str.replace(/[\s+]/g, '-').toLowerCase();
