"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstname, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                firstname,
                lastname,
                email: username,
                password,
            },
            select: {
                id: true,
                password: true,
                firstname: true,
            },
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstname, lastname }) {
        const res = yield prisma.user.update({
            where: {
                email: username,
            },
            data: {
                firstname,
                lastname,
            },
        });
        console.log(res);
    });
}
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findUnique({
            where: {
                email: username,
            },
        });
        console.log(res);
    });
}
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.delete({
            where: {
                email: username,
            },
        });
        console.log(res);
    });
}
// insertUser("ebu10@email.com", "123456", "Ebu10", "Don");
// updateUser("ebu10@email.com", { firstname: "Ebu10", lastname: "Don10" })
//   .then(() => console.log("User updated!"))
//   .catch((err) => console.error(err));
// getUser("ebu10@email.com");
deleteUser("ebu1@email.com");
