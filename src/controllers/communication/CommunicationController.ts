import {NextFunction, Request, Response, Router} from "express";
import HttpStatus from "../../helpers/HttpStatus";
import Communication, {CommunicationStatusEnum} from "../../entity/communication/Communication";

export default class CommunicationController {
    private readonly router: Router

    constructor() {
        this.router = Router()

        this.createPostRouter()
        this.createGetOneRouter()
        this.createCancelRouter()
    }

    public getRouter(): Router{
        return this.router
    }

    private createPostRouter(): void{
        this.router.post('/', async (req: Request, res: Response, next: Function) => {
            /*
                #swagger.tags = ['Communication']
                #swagger.description = 'Endpoint para adicionar um agendamento de envio de comunicação'
                #swagger.parameters['Communication'] = {
                   in: 'body',
                   required: 'true',
                   description: 'Data e Hora para o envio(MM/dd/YYYY hh:mm:ss), \nDestinatário, \nMensagem a ser entregue, \nformatos: email, sms, push e whatsapp',
                   type: 'object',
                    schema: {date: '12/31/2022 23:59:59', recipient: 'João Paulo josé', message: 'Mensagem qualquer', format: 'email'}
               }
            */
            let {date, recipient, message, format} = req.body
            let communication = new Communication();
            communication.date = new Date(date)
            communication.recipient = recipient
            communication.message = message
            communication.format = format
            communication.status = CommunicationStatusEnum.SCHEDULED
            await communication.save()

            return res.status(HttpStatus.ok).json(communication)
        })
    }

    private createGetOneRouter() : void {
        this.router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
            /*
               #swagger.tags = ['Communication']
               #swagger.description = 'Endpoint para consultar o status de um agendamento pelo id'
            */
            const communication = await Communication.findOne(req.params.id);

            console.log(communication);

            if(!communication){
                return res.status(HttpStatus.notFound).json({message: 'Communication Not Found'})
            }

            return res.status(HttpStatus.ok).json(communication)
        })
    }

    private createCancelRouter(): void{
        this.router.put('/:id', async (req: Request, res: Response, next: Function) => {
            /*
                #swagger.tags = ['Communication']
                #swagger.description = 'Endpoint para cacnelar um um agendamento pelo id'
            */
            const communication = await Communication.findOne(req.params.id);

            console.log(communication);

            if(!communication){
                return res.status(HttpStatus.notFound).json({message: 'Communication Not Found'})
            }

            if(communication.status !== CommunicationStatusEnum.SCHEDULED){
                return res.status(HttpStatus.conflict).json({message: "Communication can't altered, because status is not as scheduled"})
            }

            communication.status = CommunicationStatusEnum.CANCELED
            await communication.save()

            return res.status(HttpStatus.ok).json(communication)
        })
    }
}