'use strict';

class UserStorage {
    /* 클래스 자체에서 접근하려 할 때는 정적 변수로 만들어줘야 함 */
    /* 인스턴스 생성하지 않고 클래스에 접근 : static */
    /* private 변수로 만들려면 변수명 앞에 #을 붙이면 됨 */
    static #users = {
        id: ["김보민", "김주경", "김인직"],
        password: ["1234", "12345", "123456"],
        name: ["김보민", "김주경", "김인직"],
    };

    /* #을 이용해 은닉화 시키고 메서드로 전달 */
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const index = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // [id, pwd, name]
        
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][index];
            return newUser;
        }, {});

        return userInfo;
    }

    static save(userInfo) {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        return { success : true };
    }
}

module.exports = UserStorage;