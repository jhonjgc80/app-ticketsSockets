//comando para establecer la conexion con el server

let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('usuario conectado al server');
});

socket.on('disconnect', () =>{
    console.log('Perdimos conexion con el servidor');
});

socket.on('estadoActual', (resp)=>{
    console.log('Estado actual emitido por el server: ', resp);
    label.text(resp.actual);
});



$('button').on('click', function () {
    console.log('click');
    socket.emit('siguienteTicket', null, (siguienteTicket)=>{
        label.text(siguienteTicket);
    });
});
