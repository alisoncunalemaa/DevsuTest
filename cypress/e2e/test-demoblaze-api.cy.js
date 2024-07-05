describe('pruebas de API de signup y login', () => {

    const apiUrl = 'https://api.demoblaze.com';

    const testUser = {

        username: 'cunalemaa',
        password: 'cunalema123'
    };


    const encodeBase64 = (input) => {

        return btoa(input);
    };
    //crear un nuevo usuario

    it('El usuario deberia crear un nuvo user', () => {

        cy.request({


            method: 'POST',
            url: `${apiUrl}/signup`,
            body: {
                username: testUser.username,
                password: encodeBase64(testUser.password)
            },

            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(200);
            //expect(response.body).to.include('');
        });
    });

    //crear un nuevo usuario ya existente

    it('Crear un usuario ya existente', () => {

        cy.request({

            method: 'POST',
            url: `${apiUrl}/signup`,
            body: {
                username: testUser.username,
                password: encodeBase64(testUser.password)
            },

            failOnStatusCode: false
        }).then ((response) => {

            cy.log(response.body);
            expect(response.status).to.eq(200);

            //se captura el mensaje que muestra cuando el usuario ya existe

            expect(response.body).to.have.property('errorMessage', 'This user already exist.');
        });
    });

    // usuario y contraseña correcto
    it('Ingresar con el usuario y contraseña correcto', () => {

        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                username: testUser.username,
                password: encodeBase64(testUser.password)
            },

            failOnStatusCode: false

        }).then((response) => {

            cy.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body).to.include('Auth_token');
        })
    });


    // usuario y contraseña inválidos 

    it('Podría fallar el login con usuario y contraseña incorrectos',() => {

        cy.request({
            method: 'POST',
            url: `${apiUrl}/login`,
            body: {
                username: 'cunalemaErrorUser',
                password: 'cunalemaErrorPass'
            },

            failOnStatusCode: false
    }).then((response) => {

        cy.log(response.body);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('errorMessage', 'User does not exist.');
    });
    });
});