import { IjAutocompletePage } from './app.po';

describe('ij-autocomplete App', function() {
  let page: IjAutocompletePage;

  beforeEach(() => {
    page = new IjAutocompletePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
