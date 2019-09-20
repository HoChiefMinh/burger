// Import MySQL connection.
const connection = require("../config/connection");

// Helper function for SQL syntax
//loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  // Loop through the keys and push the key/value as a string int array
  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
   // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {
  selectAll: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;
    
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;
     
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  deleteOne: function(table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;