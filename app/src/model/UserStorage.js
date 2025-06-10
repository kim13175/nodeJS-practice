'use strict';

const db = require('../config/db');

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
        
    }

    static getUserInfo(id) {
        const query = "SELECT * FROM users WHERE id = ?;";
        /* mysql은 프로미스를 직접 생성해야 함 */
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                /* data 패킷만 보내줘야 함 */
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        const query = "INSERT INTO users(id, name, password) VALUES(?, ?, ?);";
        /* mysql은 프로미스를 직접 생성해야 함 */
        return new Promise((resolve, reject) => {
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {
                if(err) reject(`${err}`);
                /* msg만 던짐 */
                resolve({ success : true });
            });
        });
    }
}

module.exports = UserStorage;