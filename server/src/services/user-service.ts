import IResult from "../interfaces/iresult";
import IUser from "../interfaces/iuser";
import { User } from "../models/user";
import CryptoJS from "crypto-js";

export default class UserService {
    async create(data: IUser): Promise<IResult<IUser>> {
        let result: IResult<IUser> = { errors: [] };
        try {
            if ((await this.exists(data.nickname)).data) {
                result.errors?.push("[nickname]: O apelido já existe");
                result.status = 400;
                return result;
            }

            data.password = CryptoJS.SHA256(data.password).toString();
            const user = await User.create(data);
            result.data = user;
            //#swagger.responses[201]
            result.status = 201;
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }

        return result;
    }

    async getById(id: string): Promise<IResult<IUser>> {
        let result: IResult<IUser> = { errors: [] };
        try {
            const user = await User.findById(id);
            if (!user) {
                result.errors?.push("Usuário não encontrado");
                result.status = 404;
            } else {
                result.data = user;
                result.status = 200;
            }
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }
        return result;
    }

    async exists(nickname: string): Promise<IResult<boolean>> {
        let result: IResult<boolean> = { errors: [] };
        try {
            const _id = await User.exists({ nickname });
            result.data = _id ? true : false;
            result.status = 200;
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }
        return result;
    }

    async list(name: string): Promise<IResult<IUser[]>> {
        let result: IResult<IUser[]> = { errors: [] };
        try {
            let users: IUser[];
            if (!name) {
                users = await User.find().sort({ name: 1, nickname: 1 });
            } else {
                users = await User.find({ $or: [{ nickname: new RegExp(name, "i") }, { name: new RegExp(name, "i") }] }).sort({
                    name: 1,
                    nickname: 1,
                });
            }
            result.data = users;
            result.status = 200;
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }
        return result;
    }

    async update(id: string, data: IUser): Promise<IResult<IUser>> {
        let result: IResult<IUser> = { errors: [] };
        try {
            console.log(data);
            const user = await User.findByIdAndUpdate(id, data, { new: true }); //o new é para trazer ja o objeto atualizado
            if (!user) {
                result.errors?.push("Usuário não encontrado");
                result.status = 404;
            } else {
                result.data = user;
                result.status = 200;
            }
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }

        return result;
    }

    async remove(id: string): Promise<IResult<IUser>> {
        let result: IResult<IUser> = { errors: [] };
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                result.errors?.push("Usuário não encontrado");
                result.status = 404;
            } else {
                result.data = user;
                result.status = 200;
            }
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }
        return result;
    }

    async authenticate(nickname: string, password: string): Promise<IResult<IUser>> {
        let result: IResult<IUser> = { errors: [] };
        try {
            password = CryptoJS.SHA256(password).toString();
            let user = await User.findOne({ nickname, password });
            if (!user) {
                result.errors?.push("usuário ou senha inválidos");
                result.status = 404;
            } else {
                result.data = user;
                result.status = 200;
            }
        } catch (error: any) {
            result.errors?.push(error.message);
            result.status = 500;
        }

        return result;
    }
}
