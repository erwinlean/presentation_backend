"use strict";

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');

describe('Enviar correo electrónico', () => {
    it('debería enviar un correo electrónico exitosamente', (done) => {
        const emailData = {
            email: 'emarte@criteria.online',
            nombre: 'Test Email',
            mensaje: 'Prueba Mail sender'
        };

        request(app)
            .post('/api/mailer')
            .send(emailData)
            .expect(200)
            .end((err, res) => {
                expect(res.body.message).to.equal('Correo electrónico enviado exitosamente');
                done();
            });
    });

    it('debería devolver un error al enviar el correo electrónico', (done) => {
        const emailData = {
            email: 'emarte@criteria.online',
            nombre: 'Test Email',
            mensaje: 'Prueba Mail sender'
        };

        // Mockear la función sendMail para que arroje un error
        const sgMail = require('@sendgrid/mail');
        sgMail.send = (msg) => {
            throw new Error('Error al enviar el correo electrónico');
        };

        request(app)
            .post('/api/mailer')
            .send(emailData)
            .expect(500)
            .end((err, res) => {
                expect(res.body.message).to.equal('Error al enviar el correo electrónico');
                done();
            });
    });
});