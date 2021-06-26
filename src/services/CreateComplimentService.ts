import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        if(user_sender === user_receiver) {
            throw new Error("Incorret User receiver")
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver)

        if(!userReceiverExists) {
            throw new Error("User receiver does not exists!")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        complimentsRepositories.save(compliment)

        return compliment;
    }
}

export { CreateComplimentService }