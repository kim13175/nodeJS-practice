'use strict';

const fs = require('fs').promises;

class UserStorage {
    /* 클래스 자체에서 접근하려 할 때는 정적 변수로 만들어줘야 함 */
    /* 인스턴스 생성하지 않고 클래스에 접근 : static */
    /* private 변수로 만들려면 변수명 앞에 #을 붙이면 됨 */
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const index = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][index];
            return newUser;
        }, {});

        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers
        }, {});
        return newUsers;
    }

    /* #을 이용해 은닉화 시키고 메서드로 전달 */
    static getUsers(isAll, ...fields) {
        return fs.readFile('./app/src/DB/User.json', 'utf-8')
         .then((data) => {
            return this.#getUsers(data, isAll, fields);
         })
         .catch(console.error);
    }

    static getUserInfo(id) {
        return fs.readFile('./app/src/DB/User.json', 'utf-8')
         .then((data) => {
            return this.#getUserInfo(data, id);
         })
         .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true); // 모든 파라미터의 데이터를 가져오도록 함
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        if (users.name.includes(userInfo.name)) {
            throw "이미 존재하는 이름입니다.";
        }
        users.id.push(userInfo.id);
        users.password.push(userInfo.password);
        users.name.push(userInfo.name);
        fs.writeFile('./app/src/DB/User.json', JSON.stringify(users));
        return { success: true };
    }
}

module.exports = UserStorage;