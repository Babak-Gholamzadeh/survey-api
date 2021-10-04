const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');

dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
