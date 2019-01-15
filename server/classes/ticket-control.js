const fs = require('fs');

class Ticket{
    constructor(numeroTicket, escritorio){
        this.numeroTicket = numeroTicket;
        this.escritorio = escritorio;
    }
}

class TicketControl{

    constructor(){

        this.ultimoTicket = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //este arreglo va a contener todos los tickets pendientes de revision
        this.ultimos4Tickets = []; //ultimos 4 tickets que corresponden a la pantalla publica

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimoTicket = data.ultimoTicket;
            this.tickets = data.tickets;
            this.ultimos4Tickets = data.ultimos4Tickets;
        }else{
            this.reiniciarConteo();
        }
       
    }

    siguienteTicket(){
        this.ultimoTicket += 1;
        let ticket = new Ticket(this.ultimoTicket, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimoTicket}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimoTicket}`;
    }

    getUltimos4Tickets(){
        return this.ultimos4Tickets;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes de atención'
        }

        //obtenemos el primer ticket del arreglo
        let numeroTicket =  this.tickets[0].numeroTicket;
        this.tickets.shift(); //elimina el primer elemento del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4Tickets.unshift(atenderTicket); //colocamos el ticket al inicio del arreglo

        //evaluamos si los tickets son mas de 4
        if (this.ultimos4Tickets.length > 4) {
            //borramos el ultimo elemento del arreglo
            this.ultimos4Tickets.splice(-1,1);
        }

        console.log('ultimos 4 tickets:', this.ultimos4Tickets);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo(){
       this.ultimoTicket = 0;
       this.tickets = []; 
       this.ultimos4Tickets = [];
       console.log('se ha reiniciado el sistema');
       this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.tickets, //grabamos el arreglo de todos los tickets pendientes de atender
            ultimos4Tickets: this.ultimos4Tickets
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
    }

}


module.exports = {
    TicketControl
}