describe('nxdos-documentation-site', () => {
  let sitemap;

  before(() => {
    cy.fixture('sitemap.json').then((data) => {
      sitemap = data;
    });
    console.log(JSON.stringify(sitemap));
  });

  beforeEach(() => cy.visit('/'));

  it('should render succesfully', () => {
    cy.get('div:visible').contains('Nx starter guide').should('exist');
  });

  it('should navigate into the documentation', () => {
    cy.get('a:visible').contains('documentation').click();
    cy.get('h1.articleTitleLabel', { timeout: 20000 })
      .contains('Introduction to Nx-DOS')
      .should('be.visible');
  });

  it('should execute a search query and navigate to its results', () => {
    cy.get('a:visible').contains('documentation').click();
    cy.get('input[placeholder="search"]').type('algolia');
    cy.get('[data-testid="searchResultsHeader--clickZone"').click();
    cy.get('a').contains('Why use Algolia?').click();
    cy.url().should('include', 'algolia');
  });

  it('should succesfully navigate sitemap', () => {
    cy.get('a:visible').contains('documentation').click();
    sitemap.map((route) => {
      cy.log(route);
      cy.get('a').contains(route.name).click();
      cy.url().should(
        'include',
        typeof route.overrideURL !== 'undefined'
          ? route.overrideURL
          : route.path
      );
    });
  });
});
