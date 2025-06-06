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

    /* #을 이용해 은닉화 시키고 메서드로 전달 */
    static getUsers(...fields) {
        // const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        return fs.readFile('./app/src/DB/User.json', 'utf-8')
         .then((data) => {
            console.log(this.#getUserInfo(data, id));
            return this.#getUserInfo(data, id);
         })
         .catch(console.error);
    }

    static save(userInfo) {
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        return { success : true };
    }
}

module.exports = UserStorage;