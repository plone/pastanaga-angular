import { PloneAngularPage } from './app.po';

describe('plone-angular App', () => {
  let page: PloneAngularPage;

  beforeEach(() => {
    page = new PloneAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
