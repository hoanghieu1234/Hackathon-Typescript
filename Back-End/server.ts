import app from "./src/app";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port at http://localhost:${PORT}`);
});
