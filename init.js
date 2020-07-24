import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);