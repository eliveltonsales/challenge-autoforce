import { faker } from '@faker-js/faker';

describe('Regressivo Formulário Lead', () => {

  beforeEach(() => {
    cy.visit('/dealer-bmw-desafio/novos/z4-2022')
  });

  it('deve ser exibido feedback ao enviar um formulário completo', () => {
    cy.log('Preenche os campos do formulário')
    cy.get('[name="name"]').first().type(faker.person.fullName())
    cy.get('[name="email"]').first().type(faker.internet.email())
    cy.get('[name="phone"]').first().type(faker.string.numeric(11))
    cy.get('[name="cpf"]').first().type(faker.string.numeric(11))
    cy.get('.choices').contains('Selecione uma unidade').click({ force: true })
    cy.get('[data-value="escritorio-autoforce-natal"]').first().click({ force: true })
    cy.get('[name="veiculo-na-troca"]').eq(Math.round(Math.random())).click()
    cy.get("[name='phoning']").first().check()
    cy.get("[name='whatsapping']").first().check()
    cy.get("[name='mailing']").first().check()

    cy.log('Envia o formulário')
    cy.get('#showcase-new-simple-form').find('button').contains('ESTOU INTERESSADO').first().click()

    cy.log('Valida se o modal de sucesso foi exibido')
    cy.get('.form-message-overlay__top-message').should('contain.text', 'Solicitação realizada com sucesso!').should('be.visible')
    cy.get('.form-message-overlay__bottom-message').should('contain.text', 'Em alguns instantes um de nossos consultores entrará em contato com você.').should('be.visible')
  })

  it('deve ser exibido feedback de campos obrigatórios ao tentar enviar o formulário incompleto', () => {
    cy.log('Clica no botão de envio sem preencher o formulário')
    cy.get('#showcase-new-simple-form').find('button').contains('ESTOU INTERESSADO').first().click()

    cy.log('Valida se o feedback de obrigatoriedade é exibido para os devidos campos')
    cy.get('#bouncer-error_name').should('have.text', 'Por favor, preencha esse campo').should('be.visible')
    cy.get('#bouncer-error_email').should('have.text', 'Por favor, preencha esse campo').should('be.visible')
    cy.get('#bouncer-error_phone').should('have.text', 'Por favor, preencha esse campo').should('be.visible')
    cy.get('#bouncer-error_cpf').should('have.text', 'Por favor, preencha esse campo').should('be.visible')
    cy.get('#bouncer-error_contact-options').should('have.text', 'Por favor, preencha esse campo').should('be.visible')
  })

  it('deve ser exibido feedback para campos em formato inválido', () => {
    cy.log('Preenche o formulário com conteúdo inválido')
    cy.get('[name="email"]').first().type('a')
    cy.get('[name="phone"]').first().type('0')
    cy.get('[name="cpf"]').first().type('0')

    cy.log('Clica no botão de envio com os campos inválidos')
    cy.get('#showcase-new-simple-form').find('button').contains('ESTOU INTERESSADO').first().click()

    cy.log('Valida se o feedback de campos inválidos é exibido corretamente')
    cy.get('#bouncer-error_email').should('have.text', 'Por favor, informe um e-mail válido').should('be.visible')
    cy.get('#bouncer-error_phone').should('have.text', 'Por favor, informe um telefone válido').should('be.visible')

    cy.log('Valida se o contador no feedback do input de CPF é atualizado')
    for (let index = 1; index < 4; index++) {
      cy.get('#bouncer-error_cpf').should('have.text', `O tamanho mínimo do texto é 14. Atualmente você tem ${index} caracteres.`).should('be.visible')
      cy.get('[name="cpf"]').first().type('0')
    }
  })

  it('deve ser resetado o status do formulário após corrigir os erros de preenchimento', () => {
    cy.log('Preenche o formulário com conteúdo inválido')
    cy.get('[name="name"]').first().click()
    cy.get('[name="email"]').first().type('a')
    cy.get('[name="phone"]').first().type('0')
    cy.get('[name="cpf"]').first().type('0')
    cy.log('Clica 2x no botão de enviar formulário por conta de um bug, o correto seria somente 1x')
    cy.get('#showcase-new-simple-form').find('button').contains('ESTOU INTERESSADO').first().click()
    cy.get('#showcase-new-simple-form').find('button').contains('ESTOU INTERESSADO').first().click()

    cy.log('Valida que as mensagens de erro estão ativas')
    cy.get('#bouncer-error_name').should('be.visible')
    cy.get('#bouncer-error_email').should('be.visible')
    cy.get('#bouncer-error_phone').should('be.visible')
    cy.get('#bouncer-error_cpf').should('be.visible')
    cy.get('#bouncer-error_contact-options').should('be.visible')

    cy.log('Corrige os campos do formulário')
    cy.get('[name="name"]').first().type(faker.person.fullName())
    cy.get('[name="email"]').first().type(faker.internet.email())
    cy.get('[name="phone"]').first().type(faker.string.numeric(11))
    cy.get('[name="cpf"]').first().type(faker.string.numeric(11))    
    cy.get("[name='phoning']").first().check()

    cy.log('Valida que as mensagens de erro foram removidas')
    cy.get('#bouncer-error_name').should('not.exist')
    cy.get('#bouncer-error_email').should('not.exist')
    cy.get('#bouncer-error_phone').should('not.exist')
    cy.get('#bouncer-error_cpf').should('not.exist')
    cy.get('#bouncer-error_contact-options').should('not.exist')

  });


})