import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {


    it('User should be deliver', function() {

        var deliver = signupFactory.deviver() // Chama a função deliver

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectMessage)
    });

    it('Incorrect CPF', function() {
        var deliver = signupFactory.deviver()
        deliver.cpf = '000000141aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        signup.alertMessageShouldBe("Oops! CPF inválido")
    });

    it('Incorrect Email', function() {
        var deliver = signupFactory.deviver()
        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        signup.alertMessageShouldBe("Oops! Email com formato inválido.")
    });
})