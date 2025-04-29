/// <reference types="cypress" />
describe('Login Page', () => {
    it('should load the login page successfully', () => {
        cy.visit('/');
        cy.title().should('include', 'Meu Caixa');
        cy.get('form').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should log in successfully with valid credentials', () => {
        cy.visit('/');
        cy.get('input[name="email"]').type('admin@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');
        cy.get('h1').contains('Dashboard').should('be.visible');

        cy.get('button').contains('Logout').click();
        cy.url().should('include', '/');
    });

    it('should show an error message with invalid credentials', () => {
        cy.visit('/');
        cy.get('input[name="email"]').type('admin@example.com.br');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.get('.ant-message').should('be.visible');
        cy.get('.ant-message').contains('Unauthorized').should('be.visible');
    });
});
