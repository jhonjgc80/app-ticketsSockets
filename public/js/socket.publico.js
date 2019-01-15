
let socket = io();

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

let lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
let lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];


socket.on('estadoActual', (data)=>{
    //console.log(data);
    actualizaHtml(data.ultimos4Tickets);
});

socket.on('ultimos4Tickets', (data)=>{
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4Tickets);
})

function actualizaHtml(ultimos4Tickets) {
    for (let i = 0; i <= ultimos4Tickets.length -1; i++) {
        lblTickets[i].text('Ticket' + ultimos4Tickets[i].numeroTicket);
        lblEscritorios[i].text('Escritorio' + ultimos4Tickets[i].escritorio);
        
    }
}