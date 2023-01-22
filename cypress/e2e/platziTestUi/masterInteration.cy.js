describe('',() =>{
    /* beforeEach('',() =>{
        cy.visit('https://itera-qa.azurewebsites.net/home/automation')
    }) */
    it('Dropdowns interation (select)',() =>{
        cy.visit('https://itera-qa.azurewebsites.net/home/automation')
        cy.get('.custom-select').select(10)
        cy.get('.custom-select').select('Greece').should('have.value','4')
    })
    
    it('Dropdowns interation (select) dinamico',() =>{
        cy.visit('https://react-select.com/home')
        cy.get('#react-select-6-input').type(' ')
        cy.get('#react-select-6-listbox').children().children().each(($el, index, $list) =>{

            if($el.text() == 'Red'){
                $el.click()
            }

        })
    })
    it('Interactuando con tablas',() =>{
        cy.visit('https://www.w3schools.com/html/html_tables.asp')
        cy.get('#customers').find('th')
        .each(($el)=>{
            cy.log($el.text())

        })
        cy.get('#customers').find('tr').should('have.length',7)

        /* cy.get('#customers').find('tr').eq(1).find('td').eq(1).invoke('text')
        .should('equal','Maria Anders') */

        //una manera mas practica para hacerlo.
        cy.get('#customers')
        .find('tr').eq(1)
        .find('td').eq(1)
        .then($el =>{
            const texto = $el.text()
            expect(texto).to.equal('Maria Anders')
        })
    })
    it.only('interation Datepickers',() =>{
        cy.visit('https://material.angular.io/components/datepicker/overview')
        cy.get('#mat-mdc-form-field-label-0').type('11/30/1987')
        cy.get('datepicker-overview-example')
        .find('svg').click({force:true})
        cy.get('#mat-datepicker-0').should('be.visible')
    })
})