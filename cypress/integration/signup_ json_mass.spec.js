import SignupPage from '../pages/SignupPage'
import signup from '../pages/SignupPage'

describe('Signup', () => {

    // Carrega o arquivo de massa do arquivo deliver.json
    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('User should be deliver', function () { // Para usar massa do arquivo json, usar function() no lugar de ()=>
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectMessage)
    });

    it('Incorrect CPF', function () {
        signup.go()
        signup.fillForm(this.deliver.cpf_inv)
        signup.submit()

        signup.alertMessageShouldBe("Oops! CPF inválido")
    });

    it('Incorrect Email', function () {
        signup.go()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()

        signup.alertMessageShouldBe("Oops! Email com formato inválido.")
    });

    // Valida campo a campo, se falhar para o teste
    it('Required fields', function () {
        signup.go()
        signup.submit()

        signup.alertMessageShouldBeVisible("É necessário informar o nome")
        signup.alertMessageShouldBeVisible("É necessário informar o CPF")
        signup.alertMessageShouldBeVisible("É necessário informar o email")
        signup.alertMessageShouldBeVisible("É necessário informar o CEP")
        signup.alertMessageShouldBeVisible("É necessário informar o número do endereço")
        signup.alertMessageShouldBeVisible("Selecione o método de entrega")
        signup.alertMessageShouldBeVisible("Adicione uma foto da sua CNH")
    })

    // Valida campo a campo, se continua o teste
    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CPF' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signup.go()
            signup.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signup.alertMessageShouldBeVisible(msg.output)
            })
        })
    })

})