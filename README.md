# 💙 Blueheart Interview

This is an interview to test your full stack development skills.
It's *loosely* inspired by the actual stack we use in production, with some pretty major simplifications for the sake of making this doable in a couple of hours.

## About this codebase
It contains a very basic web and server application that talk to each other over GraphQL.
* `packages/fsi-client` is the web client
* `packages/fsi-server` is the server
* `packages/fsi-api-spec` contains the GraphQL schema used by both

The application is a very basic Blog authoring tool, where you can view all the Posts you've created, or author new ones.

There's some element of figuring the codebase out for yourself, which is part of the test and part of any "real" project, but at a high level the path of a request through the system is as follows.
1) The Posts page defines what query to run when the component mounts (`packages/fsi-client/src/Posts.tsx`)
2) The Apollo client makes the actual request (setup in `packages/fsi-client/src/App.tsx`)
3) The Apollo server receives the actual request (setup in `packages/fsi-server/src/index.ts` and  `packages/fsi-server/src/server.ts`)
4) Apollo hands the request over to the Resolvers (defined in `packages/fsi-server/src/server.ts`)
5) The resolver uses the database functions to fetch or modify data (defined in `packages/fsi-server/src/db.ts`)
6) The request then goes back up the stack: resolver, apollo server, apollo client, Posts page

## Your tasks
1) Implement a way to add new posts, there's a comment on `packages/fsi-client/src/Posts.tsx` hinting where you can hook in.
   * Requirements:
     * Styling doesn't matter as long as a dev could use it. Feel free to throw out `react-bootstrap` if you like.
     * It's up to you how to handle entry for the new post. Could be an inline form, a modal, a new page, or something else.
   * Hints:
     * There's already a Mutation in the schema for you to use.
     * You'll need to figure out how to make the table update with the new post
   * Questions:
     * What tests would you write? How? What tools would you need?
     
2) Implement pagination for the table
   * Requirements:
     * Styling doesn't matter, same as before
     * It's up to you what pagination looks like, as long as it's recognisable as pagination
     * I consider infinite scroll as a form of pagination, if you're into that
     * It's fine for your `db.ts` code to be inefficient, obviously we'd use a more sensible db if this wasn't a test
   * Hints:
     * You'll need to write your own mutation for this one. `yarn gen` in `packages/fsi-api-spec` will re-generate the TS definitions
   * Questions:
     * What tests would you write? How? What tools would you need?

3) Answer the questions:
   * Looking at the server set-up in `packages/fsi-server/src/server.ts`, and the codebase more generally, what would need to be added to make this production ready, and something you'd be happy to expose to the wild internet?
   * Forget `lowdb`, let's say we threw it away and switched to something more appropriate. What are the trade-offs between a traditional Relational DB (eg `PostgreSQL`), a traditional NoSQL Document store (eg `MongoDB`), and a newer "cloud native" db of your choice (eg `Cloud Firestore` (Firebase), `Google Spanner`, `Apache Cassandra`, `AWS DynamoDB`)
   
## That's it!
Thanks a lot for doing that! Please send your code / answers over, and we'll get back to you ASAP.

It's fine to have your answers publicly visible for future interviewers to look at, but please don't do it in a way where future people doing this interview can see. This especially means please don't do a github fork, as it's very easy to find forks from this page. Thanks a lot!