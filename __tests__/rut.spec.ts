import { validarRUT } from '../src/app/rut';
describe('Success - validarRUT', () => {
    test('retorna verdadero para RUT valido digito de control numerico', () => {
        expect(validarRUT('34032319')).toBe(true);
    });
    test('retorna verdadero para rut valido con digito de control (K)', () => {
        expect(validarRUT('13571187K')).toBe(true);
    });
    test('retorna verdadero para rut valido con digito (0)', () => {
        expect(validarRUT('17850866-0')).toBe(true);
    });
    test('retorna verdadero para rut valido con puntos', () => {
        expect(validarRUT('17.850.866-0')).toBe(true);
    });
});
describe('Error - validarRUT', () => {
    test('retorna false para una cadena vacia', () => {
        expect(validarRUT('')).toBe(false);
    });
    test('retorna false para rut con menos de 2 caracteres', () => {
        expect(validarRUT('1')).toBe(false);
    });
    test('retorna false para rut con caracteres no validos', () => {
        expect(validarRUT('12.345.678-A')).toBe(false);
    });
    test('retorna false para rut con digito de control incorrecto', () => {
        expect(validarRUT('12.345.678-9')).toBe(false);
    });
    test('retorna false para rut con caracteres no validos', () => {
        expect(validarRUT('xx.xx.xx-x')).toBe(false);
    });
});
