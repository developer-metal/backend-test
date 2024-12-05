import request from 'supertest';
import express from 'express';
import mainRouter from '../src/routes/main-route';
import { configuration } from '../src/config';
const app = express();
app.use('/', mainRouter);
describe('GET /', () => {
    test('retorna un mensaje de saludo al usuario', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe(`Hola mundo al usuario ${configuration.username}`);
    });
    test('retorna un mensaje de la apikey', async () => {
        configuration.apikey = 'dfgfdfddfsjdflksjflskjslkfjsfksdjflsdkjfsdklfjslkfsjfjd';
        const response = await request(app).get('/api-key');
        expect(response.status).toBe(200);
        expect(response.text).toBe(`la apikey de mi aplicacion es: ${configuration.apikey}`);

        const responseValid = await request(app).get('/api-key');
        expect(responseValid.status).toBe(200);
        expect(responseValid.text).toEqual(expect.stringContaining(configuration.apikey));
    });
    test('retorna un mensaje de validacion de rut', async () => {
        const validRUT = '3403231-9';
        const invalidRUT = 'invalid-rut';
        let response = await request(app).get(`/validar-rut?rut=${validRUT}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe(`El rut suministrado (${validRUT}) es : valido`);
        response = await request(app).get(`/validar-rut?rut=${invalidRUT}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe(`El rut suministrado (${invalidRUT}) es : invalido`);
    });
    test('retorna un mensaje de cantidad de repeticiones de subcadena', async () => {
        const cadena = 'abcabcabc';
        const subcadena = 'abc';
        const cantidadRepeticiones = 3;
        const response = await request(app).get(`/buscar-subcadena?cadena=${cadena}&subcadena=${subcadena}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe(`La cadena "${cadena}" tiene ${cantidadRepeticiones} repeticiones de la subcadena "${subcadena}"`);
    });
});