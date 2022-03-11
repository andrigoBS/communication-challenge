import "reflect-metadata"
import Express, {Application} from 'express'
import {createConnection} from "typeorm"
import Dotenv from 'dotenv'
import BodyParser from "body-parser"
import Cors from 'cors'
import Routes from './controllers/Routes'
import SwaggerUI from "swagger-ui-express"

class Server {
    public readonly express: Application

    constructor() {
        /* Setup dot env */
        Dotenv.config()
        this.express = Express()

        this.database()
        this.middlewares()
        this.routes()
    }

    public start(): void {
        this.express.set('port', process.env.SERVER_PORT)
        this.express.listen(process.env.SERVER_PORT, () => {
            console.clear()
            console.log(`${process.env.SERVER_NAME} running on port ${process.env.SERVER_PORT}.`)
        })
    }

    private middlewares(): void {
        /* Preparing middleware to parse different data formats */
        this.express.use(BodyParser.json())
        this.express.use(BodyParser.urlencoded({ extended: true, }))
        /* Setup CORS, adding this options to all response headers. */
        this.express.use(Cors())
    }

    /* connect db. see .env for typeorm config */
    private database(): void {
        createConnection().then(() => console.log("DB Connect"))
    }

    private routes(): void {
        this.express.use(new Routes().getRouter())
        const swaggerFile: any = require('../public/swaggerOutput.json')
        this.express.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerFile))
    }
}

new Server().start();
