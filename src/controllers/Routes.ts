import {Router} from 'express'

export default class Routes {
    private readonly router: Router

    constructor() {
        this.router = Router()

    }

    public getRouter(): Router{
        return this.router
    }
}
