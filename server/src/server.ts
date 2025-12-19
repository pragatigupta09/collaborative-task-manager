import { server } from "./app";
import { env } from "./config/env";

server.listen(env.PORT, () => {
  console.log(` Server running on port ${env.PORT}`);
});
