const connection = require("./connection");

function createQmarks(num){
    let arr = [];
    for(let i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
} 


function translateSql(obj) {
    let arr = [];
    for (let key in ob) {
        let value =obj[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = " ' " + " ' ";
            }
            arr.push(key + " = " + value)
        }
    }
    return arr.toString();
}
let orm = {
    selectAll: function (table, cb) {
        let queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO" + table
            + " (" + cols.toString() + ") " + "VALUES ("
            + createQmarks(vals.length)
            + ") ";

        console.log(queryString);
        connection.query(queryString, vals, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        let queryString =
            "UPDATE " +
            table +
            " SET " +
            TRANSLATESQL(objColVals) +
            " WHERE " +
            condition;

        console.log(queryString);

        connection.query(queryString, vals, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    deleteOne: function (table, condition, cb) {
        let queryString = "DELETE FROM " + table + "WHERE " + condition;
        console.log(queryString);

        connection.query(queryString, vals, function (err, res) {
            if (err) throw err;
            cb(res);
        });

    }
};

module.exports = orm;
