import { typeDefs, resolvers } from "@/libs/schema";
import { startApolloServer } from "@/libs/startApolloServer";

startApolloServer(typeDefs, resolvers);
