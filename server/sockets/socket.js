const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) =>{
        let siguienteTicket = ticketControl.siguienteTicket();
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });

    //emitir un evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4Tickets: ticketControl.getUltimos4Tickets()
    });

    client.on('atenderTicket', (data, callback)=>{
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4Tickets', {
            ultimos4Tickets: ticketControl.getUltimos4Tickets()

        });

    })
});