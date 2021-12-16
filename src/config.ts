require('dotenv').config();

export default {
  port: parseInt(process.env.PORT, 10) || 8010,
};
