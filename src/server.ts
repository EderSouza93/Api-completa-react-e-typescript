import Fastify from "fastify";
import cors from '@fastify/cors';
import { routes } from "./routes";
import { request } from "http";

const app = Fastify({ logger: true})

app.setErrorHandler((error, request, reply) =>{
    reply.code(400).send({ message: error.message})
})

const start = async () => {
    try{
        await app.register(cors);
        await app.register(routes);   

        const portString = process.env.PORT || 3333;
        const port = Number(portString)
        
        await app.listen({ port, host: '0.0.0.0'});
        app.log.info(`Server listening on port ${port}`);
    }catch(err){
        app.log.error
        process.exit(1)
    }
}

start();