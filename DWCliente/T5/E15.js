class Notificacion {
    constructor(destinatario, mensaje) {
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }
    enviar() {
        return `Notificación enviada`;
    }
}
class Correo extends Notificacion {
    constructor(destinatario, mensaje) {
        super(destinatario, mensaje);
    }
    enviar() {
        return `Correo enviado`;
    }
}

class SMS extends Notificacion {
    constructor(destinatario, mensaje) {
        super(destinatario, mensaje);
    }
    enviar() {
        return `SMS enviado`;
    }
}
const correo1 = new Correo("Ekaitz", "Hola");
const correo2 = new Correo("Pateo", "Hola");
const correo3 = new Correo("Waldo", "Hola");
const correo4 = new Correo("HH", "Hola");

const sms1 = new SMS("Julieta", "hola");
const sms2 = new SMS("Brandon", "hola");
const sms3 = new SMS("Gaizka", "hola");

const notis = [correo1, sms1,correo2, sms2, correo3, sms3, correo4];

notis.forEach(element => {
    console.log(element.enviar());
});