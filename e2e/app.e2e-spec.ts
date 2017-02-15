import { BnHPage } from './app.po';

describe('bn-h App', function() {
  let page: BnHPage;

  beforeEach(() => {
    page = new BnHPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
