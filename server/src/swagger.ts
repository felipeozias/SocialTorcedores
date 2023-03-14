import swaggerAutogen from "swagger-autogen";

const outputFile = "./config/swagger.json";
const endpointsFiles = ["./src/server.ts", "./src/validators/handle-validation.ts"];

const swagger = swaggerAutogen({ language: "pt-BR" });

const doc = {
    info: {
        version: "1.0.0",
        title: "Social Torcedor API",
        language: "pt-BR",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module.",
    },
    host: "api.socialtorcedor.shop",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description: "Endpoints to manage users",
        },
    ],
    definitions: {
        User: {
            _id: "640f6af6ad964b6d45a13c35",
            nickname: "zoro_oliveira",
            name: "Zoro Oliveira",
            team: "são paulo",
            createdAt: "2023-03-13T18:27:02.427Z",
            updatedAt: "2023-03-13T18:27:02.427Z",
            __v: 0,
        },
        AddUser: {
            $nickname: "zoro_oliveira",
            $name: "Zoro Oliveira",
            $password: "123456",
            $team: "São Paulo",
        },
        UpdateUser: {
            $nickname: "zoro_oliveira",
            $name: "Zoro Oliveira",
            $team: "São Paulo",
        },
        IResult: {
            errors: ["aconteceu um erro"],
            data: {},
            status: 200,
        },
        Error500: {
            errors: ["aconteceu um erro interno"],
        },
        UserAddValidator: {
            errors: [
                "[nickname]: O apelido deve ter entre 5 e 25 caracteres",
                "[nickname]: O apelido deve começar com letra pode conter números e não pode terminar com caracteres especiais.",
                "[name]: O nome deve ter entre 5 e 30 caracteres.",
                "[name]: O nome deve conter apenas letras.",
                "[password]: A senha deve ter entre 3 e 15 caracteres.",
                "[team]: O time é obrigatório.",
            ],
        },
        UserUpdateValidator: {
            errors: [
                "[id]: O id deve ser um ObjectId válido.",
                "[nickname]: O apelido deve ter entre 5 e 25 caracteres",
                "[nickname]: O apelido deve começar com letra pode conter números e não pode terminar com caracteres especiais.",
                "[name]: O nome deve ter entre 5 e 30 caracteres.",
                "[name]: O nome deve conter apenas letras.",
                "[team]: O time é obrigatório.",
            ],
        },
        IdValidator: {
            errors: ["[id]: O id deve ser um ObjectId válido."],
        },
    },
};

swagger(outputFile, endpointsFiles, doc);
