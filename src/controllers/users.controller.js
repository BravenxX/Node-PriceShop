const mysqlConnection = require("../database/database");

const usersCtrl = {};

usersCtrl.getUsers = (req, res) => {
  mysqlConnection.query(
    `SELECT 
          users.id,
          users.email,
          users.name,
          users.password,
          job_title,
          user_types_id,
          user_types.name
      FROM users 
          INNER JOIN operators ON 
          users.id = operators.users_id 
              INNER JOIN user_types ON
              operators.user_types_id = user_types.id`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

usersCtrl.getUser = (req, res) => {
  const { id } = req.params;

  mysqlConnection.query(
    `SELECT 
          users.id,
          users.email,
          users.name,
          users.password,
          job_title,
          user_types_id,
          user_types.name
      FROM users 
          INNER JOIN operators ON 
          users.id = operators.users_id 
              INNER JOIN user_types ON
              operators.user_types_id = user_types.id
                WHERE users.id = ?
              `,
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
};

usersCtrl.postUser = (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "INSERT FROM users WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Product Deleted" });
      } else {
        console.log(err);
      }
    }
  );
};

usersCtrl.deleteUser = (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Product Deleted" });
      } else {
        console.log(err);
      }
    }
  );
};

usersCtrl.validateUser = (req, res) => {
  const { email, password } = req.body;

  mysqlConnection.query(
    `SELECT 
            users.id,
            users.email,
            users.name,
            users.password,
            job_title,
            user_types_id,
            user_types.name
        FROM users 
            INNER JOIN operators ON 
            users.id = operators.users_id 
                INNER JOIN user_types ON
                operators.user_types_id = user_types.id
                  WHERE users.email = ? AND users.password = ?
                `,
    [email, password],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length != 0) {
          res.json({
            validated: true,
            message: "Usuario validado"
          });
        } else {
          res.json({
            validated: false,
            message: "Usuario no validado"
          });
        }
      } else {
        res.json({
          validated: false,
          message: "Ha ocurrido un error"
        });
        console.log(err);
      }
    }
  );
};

module.exports = usersCtrl;
