import server from "./server";

(() => {
  // server.use("/contact")

  server.use("/", ((req,res) => {
    return res.status(200).send({
      message: 'oks'
    });
  }))

  server.listen(3333, () => console.log("[server]: Server is running at http://localhost:3333/"));
})();