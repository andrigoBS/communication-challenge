import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * Os possíveis estados do envio de comunicação:
 * agendado, enviado, cancelado
 */
export enum CommunicationStatusEnum {
    SCHEDULED = "Agendado",
    SENT = "Enviado",
    CANCELED = "Cancelado",
}

/**
 * Os possíveis formatos de comunicação que podem ser enviados são:
 * email, sms, push e whatsapp
 */
export enum CommunicationFormatEnum {
    EMAIL = "Email",
    SMS = "Sms",
    PUSH = "Push",
    WHATSAPP = "Whatsapp",
}

/**
 * Tabela onde sera salvo os dados da comunicação no banco
 */
@Entity("communication")
export default class Communication extends BaseEntity {
    @PrimaryGeneratedColumn({name: "id_communication",
        comment: "Chave primária da comunicação"
    })
    id: number;

    @Column({name: "date", type: "datetime",
        comment: "Data/Hora para o envio"
    })
    date: Date;

    @Column({name: "recipient", type: "varchar", length: "255"})
    recipient: string;

    @Column({name: "message", type: "text"})
    message: string;

    @Column({name: "format", type: "enum", enum: CommunicationFormatEnum,
        comment: "Mensagem a ser entregue"
    })
    format: CommunicationFormatEnum;

    @Column({name: "status", type: "enum", enum: CommunicationStatusEnum,
        comment: "Estado do envio"
    })
    status: CommunicationStatusEnum;
}