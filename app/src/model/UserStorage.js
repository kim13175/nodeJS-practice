'use strict';

const fs = require('fs');

class UserStorage {
    /* 클래스 자체에서 접근하려 할 때는 정적 변수로 만들어줘야 함 */
    /* 인스턴스 생성하지 않고 클래스에 접근 : static */
    /* private 변수로 만들려면 변수명 앞에 #을 붙이면 됨 */

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
        fs.readFileSync('./src/DB/User.json', (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            console.log(users);
            const index = users.id.indexOf(id);
            const usersKeys = Object.keys(users); // [id, pwd, name]
            
            const userInfo = usersKeys.reduce((newUser, info) => {
                newUser[info] = users[info][index];
                return newUser;
            }, {});

            return userInfo;
        });
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