class SignupPage { 

    go(){
        cy.visit('/')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        // Validações dos campos preenchidos
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('.dropzone input[accept^="image"]').attachFile(deliver.cnh)
    }

    submit(){
        cy.get('form button[class="button-success"]').click()
    }

    modalContentShouldBe(expect_message){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expect_message)
    }

    alertMessageShouldBe(expect_message){
        cy.get('.alert-error').should('have.text', expect_message)
    }

    alertMessageShouldBeVisible(expect_message){
        cy.contains('.alert-error', expect_message).should('be.visible')
    }

}

export default new SignupPage;