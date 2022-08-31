const client = require("./database");
const Level = require("./models/level");

const dataMapper = {
  getAllLevels(callback) {
    client.query("SELECT * FROM level", (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (!results.rowCount) {
        return callback(null, []);
      } else {
        
        const levels = [];
        for (const obj of results.rows) {
          levels.push(new Level(obj));
        }
        callback(null, levels);
      }
    });
  },
  async getOneLevel(id, callback) {
    const query = {
      text: `SELECT * FROM "level" WHERE id=$1`,
      values: [id],
    };
    try {
      const results = await client.query(query);
      if (!results.rowCount) {
        return callback(null, null);
      } else {
        const level = new Level(results.rows[0]);
        callback(null, level);
      }
    } catch (error) {
      return callback(error, null);
    }
  },
};

module.exports = dataMapper;