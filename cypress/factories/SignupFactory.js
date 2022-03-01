// Importa as bibliotecas
var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    // Cria uma função aonde a massa de teste é em javascript
    deviver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = { // Objeto javascript
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "11999999999",
            address: {
                postalcode: "04534011",
                street: "Rua Joaquim Floriano",
                number: "1000",
                details: "Ap 142",
                district: "Itaim Bibi",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Moto",
            cnh: "/images/cnh-digital.jpg"
        }
        return data
    }
}