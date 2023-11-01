
const app = require('./app');

const PORT =   process.env.PORT || 8233;

app.listen(PORT, function () {
    console.log(`Backend listening on port ${PORT}`);
});
