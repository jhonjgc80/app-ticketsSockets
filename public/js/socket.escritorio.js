let socket = io();

//obtenemos el escritorio, parametro que viene por el url
let searchParams = new URLSearchParams(window.location.search);

console.log(searchParams);

//preguntamos si viene o no el escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Se debe proporcionar el escritorio');
}

//obtenemos el escritorio
let escritorio = searchParams.get('escritorio');
let label = $('small');

console.log(escritorio);

$('h1').text('Escritorio: ' + escritorio);

//creamos el listener del boton
$('button').on('click', ()=>{
    socket.emit('atenderTicket', {escritorio}, (resp)=>{
        console.log(resp);
        if (resp === 'No hay tickets pendientes de atención') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket numero: ' + resp.numeroTicket);
    });
});