export const configuration = {
    username: process.env.USERNAME ?? 'default',  // se obtiene de variable de entorno o por defecto 'default'
    apikey: process.env.APIKEY ?? 'default-key', // se obtiene de variable de entorno o por defecto 'default-key'
    port: process.env.PORT ?? 4000            // se obtiene de variable de entorno o por defecto 4000
}