describe('E2E prueba para el flujo de compra en Demoblaze', () => {



it('El usuario deberia agregar dos productos al carrito', () => {

    //visitar la pagina
    cy.visit('https://www.demoblaze.com/');


    //agregar el primer producto al carrito 

    cy.contains('Iphone 6 32gb').click();
    cy.get('.btn-success').click();
    cy.on('window:alert', (text) => {

        expect(text).to.contains('Product added');


    });



   cy.get('.nav-link').contains('Home').click();

   //agregar segundo producto al carrito
   cy.contains('Sony vaio i5').click();
   cy.get('.btn-success').click();
   cy.on('window:alert', (text) => {

       expect(text).to.contains('Product added');


   });


   //visualizar el carrito de compra

   cy.get('#cartur').click();
   
   //validar que contenga los productos antes agregados
   cy.contains('Iphone 6 32gb');

   cy.contains('Sony vaio i5');

   //completar el formulario de compra

   cy.contains('Place Order').click();

   cy.get('#name').type('Alison Cunalema');
   cy.get('#country').type('Ecuador');
   cy.get('#city').type('Guayaquil');
   cy.get('#card').type('095614200853215432');
   cy.get('#month').type('07');
   cy.get('#year').type('2024');


   //Finalizar la compra

   //Se ejecuta el click en el boton de compra

   cy.contains('Purchase').click();

   //usuario verifica que la compra sea exitosa

   cy.contains('Thank you for your purchase!');

})



})