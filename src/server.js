import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { autheticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request })
});
server.express.use(logger("dev"));
server.express.use(autheticateJwt);

server.start({ port: PORT }, () =>
    console.log(`✅ Sever running on http://localhost:${PORT}`)
);
