import { Angular2TreeViewPage } from './app.po';

describe('angular2-tree-view App', function() {
  let page: Angular2TreeViewPage;

  beforeEach(() => {
    page = new Angular2TreeViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
