import { AWUWebPage } from './app.po';

describe('awuweb App', () => {
  let page: AWUWebPage;

  beforeEach(() => {
    page = new AWUWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
