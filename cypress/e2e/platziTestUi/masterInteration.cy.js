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
    it('interation Datepickers',() =>{
        cy.visit('https://material.angular.io/components/datepicker/overview')
        cy.get('#mat-mdc-form-field-label-0').type('11/30/1987')
        cy.get('datepicker-overview-example')
        .find('svg').click({force:true})
        cy.get('#mat-datepicker-0').should('be.visible')
    })
    it('Interactuando con popups', () => {
        cy.visit('https://demoqa.com/alerts')
        //Cypress automaticamente la acepta

        // Primer forma de hacerlo
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        // })
        // cy.contains('You selected Ok').should('exist')

        // Segundo forma de hacerlo
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        })
        cy.contains('You selected Ok').should('exist')


        // rechazar la alerta
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        //     return false
        // })
        // cy.contains('You selected Cancel').should('exist')

    })

    it('Interactuando con tooltips', () => {
        cy.visit('https://demoqa.com/tool-tips')
        cy.get('#toolTipButton').trigger('mouseover')
        cy.contains('You hovered over the Button').should('exist')
        cy.get('#toolTipButton').trigger('mouseout')
        cy.contains('You hovered over the Button').should('not.exist')

    })

    it.only('Interactuando con drag a drops', () => {
        cy.visit('https://demoqa.com/dragabble')
        cy.get('#dragBox')
        .trigger('mousedown', {
            which: 1,
            pageX: 600,
            pageY: 100,
        }).trigger('mousemove', {
            which : 1,
            pageX : 900,
            pageY : 800,
        }).trigger('mouseup')
        

    })
})