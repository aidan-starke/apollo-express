import type { DocumentNode } from "graphql";
import type { IResolvers } from "@graphql-tools/utils";

import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

export const startApolloServer = async (
	typeDefs: DocumentNode,
	resolvers: IResolvers
) => {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
