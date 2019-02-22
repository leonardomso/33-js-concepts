<h1 align="center">
<br>
  <a href="https://travis-ci.com/leonardomso/33-js-concepts">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png" alt="33 Concepts Every GraphQL Developer Should Know" width=200"></a>
  <br>
    <br>
  33 Concepts Every GraphQL Developer Should Know
  <br><br>
</h1>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
  <a href="https://travis-ci.com/leonardomso/33-js-concepts">
    <img src="https://img.shields.io/travis/leonardomso/33-js-concepts/master.svg?style=flat-square&label=build&logo=travis" alt="Build Status">
  </a>
</p>

## Introduction

This repository was created with the intention of helping developers master their concepts in GraphQL. It is not a requirement, but a guide for future studies.

## Community

Feel free to submit a PR adding a link to your own recaps or reviews. If you want to translate the repo into your native language, please feel free to do so.

All the translations for this repo will be listed below:

---

## Table of Contents
### Specs
1. **[Root Field](#1-root-field)**
2. **[Queries](#2-queries)**
3. **[Mutations](#3-mutations)**
4. **[Subscriptions](#4-subscriptions)**
5. **[Types](#5-types)**
6. **[Field](#6-field)**
7. **[Relationships](#7-relationships)**
8. **[Nested Info](#8-nested-info)**
9. **[Comments and Descriptions](#9-comments-and-descriptions)**
10. **[Arguments](#10-arguments)**
11. **[Union Types](#11-union-types)**
12. **[DefaultValue](#12-defaultvalue)**
13. **[Directives](#13-directives)**
14. **[Type Extensions](#14-type-extension)**
15. **[Schema Extension](#15-schema-extension)**
16. **[Schema Definition Language](#16-schema-definition-language)**

### Server
17. **[Setting up a server](#17-setting-up-a-server)**
18. **[Schema](#18-schema)**
19. **[Resolvers](#19-resolvers)**
20. **[Context](#20-context)**
21. **[Databases](#21-databases)**
22. **[Dataloader](#22-dataloader)**
23. **[Entry Points](#23-entry-points)**
24. **[Endpoints](#24-endpoints)**
25. **[Schema Stitching](#25-schema-stitching)**
26. **[Code First](#26-code-first)**
27. **[Schema First](#27-schema-first)**
28. **[Middleware](#28-middleware)**

### Client
29. **[Fetching](#29-fetching)**
30. **[Fragments](#30-fragments)** 
31. **[Variables](#31-variables)**
32. **[Alias](#32-alias)**
33. **[Polling](#33-polling)**
34. **[Cache](#34-cache)**

### Best Practices
35. **[Schema Design](#35-schema-design)**
36. **[Logging](#36-logging)** 

---
# Specs

## 1. Root Field

### Articles

 * 📜 [Root Fields & Resolvers - Graphql.org ](https://graphql.org/learn/execution/)

 ### Videos

 * 🎥 [GraphQL Tutorial, Root Query — The Net Ninja](https://www.youtube.com/watch?v=ALqNbTik44o)

**[⬆ Back to Top](#table-of-contents)**


## 2. Queries

### Articles

 * 📜 [Queries and Mutations - Graphql.org](https://graphql.org/learn/queries/)
 * 📜 [The Anatomy of a Graphql Query — Sashko Stubailo](https://blog.apollographql.com/the-anatomy-of-a-graphql-query-6dffa9e9e747)
 * 📜 [Fetch data with queries - Apollo Documentation](https://www.apollographql.com/docs/tutorial/queries.html)

 ### Videos

 * 🎥 [GraphQL Tutorial #4 - Making Queries - The Net Ninja](https://www.youtube.com/watch?v=bX2e4FILf78)
 
**[⬆ Back to Top](#table-of-contents)**


## 3. Mutations

### Articles

 * 📜 [Understanding schema concepts - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
 * 📜 [Mutations in GraphQL - Alexander Kondov](https://hackernoon.com/mutations-in-graphql-9ac6a28202a2)

 ### Videos

 * 🎥 [GraphQL Tutorial #18 - Mutations - The Net Ninja](https://www.youtube.com/watch?v=DU77lbBPfBI)
 * 🎥 [GraphQL Tutorial #19 - More on Mutations - The Net Ninja](https://www.youtube.com/watch?v=H8oRezNak2s)

**[⬆ Back to Top](#table-of-contents)**


## 4. Subscriptions

### Articles

 * 📜 [Graphql Subscriptions Example - jedwards1211](https://github.com/apollographql/graphql-subscriptions)
 * 📜 [Make web real-time with GraphQL subscriptions - David Qorashi](https://medium.com/@hpux/make-web-real-time-with-graphql-subscriptions-5a59ac1b010c)
 * 📜 [Subscriptions in Graphql and Relay - Dan Schafer](https://graphql.org/blog/subscriptions-in-graphql-and-relay/)
 * 📜 [From Zero to Graphql Subscriptions - Robert Zhu](https://hackernoon.com/from-zero-to-graphql-subscriptions-416b9e0284f3)

 ### Videos

 * 🎥 [What is a Graphql Subscription - Ben Awad](https://www.youtube.com/watch?v=Tp8UPgmhyTs)

**[⬆ Back to Top](#table-of-contents)**


## 5. Types

### Articles

 * 📜 [Constructing Types — Graphql.org](https://graphql.org/graphql-js/constructing-types/)
 * 📜 [Object Types — Graphql.org](https://graphql.org/graphql-js/object-types/)

  ### Videos

 * 🎥 [Type Relations — The Net Ninja](https://www.youtube.com/watch?v=-aQ_Io9m1GQ)

**[⬆ Back to Top](#table-of-contents)**


## 6. Field

### Articles

 * 📜 [Class: GraphQL::Field - rubydoc.info](https://www.rubydoc.info/gems/graphql/GraphQL/Field)
 * 📜 [Fields: Introduction - graphql-ruby.org](https://graphql-ruby.org/fields/introduction.html)

 ### Videos

 * 🎥 [Your GraphQL field guide - Bojan Tomić](https://www.youtube.com/watch?v=ROwICdehlb0)

**[⬆ Back to Top](#table-of-contents)**


## 7. Relationships

### Articles

 * 📜 [Explaining GraphQL Connections - Caleb Meredith](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976)
 * 📜 [Relations - Graphql Documentation](https://www.howtographql.com/graphql-scala/7-relations/)

 ### Videos

 * 🎥 [Type Relations - The Net Ninja](https://www.youtube.com/watch?v=-aQ_Io9m1GQ)
 * 🎥 [GraphQL Data Relationships - MicroUrb](https://www.youtube.com/watch?v=9EzZJz0QeEI)

**[⬆ Back to Top](#table-of-contents)**


## 8. Nested Info

### Articles

 * 📜 [GraphQL Schema Language Cheat Sheet - Hafiz Ismail](https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6)
 * 📜 [Advanced querying with GraphQL and Express - Alexander Kondov](https://hackernoon.com/advanced-querying-with-graphql-and-express-8cf2fd05f5ea)

 ### Videos

 * 🎥 [Nesting GraphQL - Ben Awad](https://www.youtube.com/watch?v=Ffl1oWjSUF4)

**[⬆ Back to Top](#table-of-contents)**


## 9. Comments and Descriptions

### Articles

 * 📜 [Title - Author]([Paste Link here])

 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 10. Arguments

### Articles

 * 📜 [Title - Author]([Paste Link here])

 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 11. Union Types

### Articles

 * 📜 [How to write add unions and interfaces to a schema - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/features/unions-interfaces.html)
 * 📜 [Graphql Tour Interfaces and Unions — Clay Allsopp](https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d)
 * 📜 [Graphql Interfaces and Unions-How to design a Graphql Schema — David Mraz](https://graphqlmastery.com/blog/graphql-interfaces-and-unions-how-to-design-graphql-schema)
 * 📜 [Interfaces and Unions in GraphQL — AWS Documentation](https://docs.aws.amazon.com/appsync/latest/devguide/interfaces-and-unions.html)

  ### Videos

 * 🎥 [Typescript Union and Intersection Types- Interface vs Type Aliases - Angular University](https://www.youtube.com/watch?v=76io0UBS6fA)

 **[⬆ Back to Top](#table-of-contents)**


## 12. DefaultValue

### Articles

 * 📜 [Title - Author]([Paste Link here])


 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 13. Directives

### Articles

 * 📜 [Title - Author]([Paste Link here])


 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 14. Type Extension

### Articles

 * 📜 [Title - Author]([Paste Link here])

 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 15. Schema Extension

### Articles

 * 📜 [Title - Author]([Paste Link here])

 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**


## 16. Schema Definition Language

### Articles

 * 📜 [GraphQL SDL, Schema Definition Language - Prisma Documentation](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51)
 * 📜 [Three ways to represent your GraphQL schema - Sashko Stubailo](https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d)

**[⬆ Back to Top](#table-of-contents)**

---

# Server
## 17. Setting Up a Server

### Articles

 * 📜 [Building a server with Apollo - Apollo GraphQL](https://www.apollographql.com/docs/apollo-server/essentials/server.html)
 * 📜 [Your First GraphQL Server — Clay Allsopp](https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2)
 * 📜 [Learn to build a GraphQL server with minimal effort — Ian Wilson](https://medium.freecodecamp.org/learn-to-build-a-graphql-server-with-minimal-effort-fc7fcabe8ebd)
 * 📜 [Building a GraphQL Server with Node.js — Angus Croll](https://itnext.io/building-a-graphql-server-with-node-js-and-express-f8ea78e831f9)


### Videos

 * 🎥 [Building a GraphQL Server [Part 1] — Traversy Media](https://www.youtube.com/watch?v=PEcJxkylcRM)
 * 🎥 [Building a GraphQL Server with TypeScript](https://www.youtube.com/watch?v=20zGexpEitc)
 * 🎥 [Learn how to build an API using GraphQL with Apollo Server 2.0 — Fireship](https://www.youtube.com/watch?v=8D9XnnjFGMs)
 * 🎥 [GraphQL server tutorial for Node.js with SQL, MongoDB and REST — Apollo GraphQL](https://www.youtube.com/watch?v=PHabPhgRUuU)

**[⬆ Back to Top](#table-of-contents)**


## 18. Schema

### Articles

 * 📜 [Understanding schema concepts - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
 * 📜 [Graphql Server Basics: Schemas Explained - Prisma Documentation](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)
 

 ### Videos

 * 🎥 [GraphQL Schema - The Net Ninja](https://www.youtube.com/watch?v=A8vtRvz-lK0)

**[⬆ Back to Top](#table-of-contents)**


## 19. Resolvers

### Articles

 * 📜 [GraphQL Resolvers: Best Practices - Mark Stuart](https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55)
 * 📜 [Overview of Resolvers - Graphcool Documentation](https://www.graph.cool/docs/reference/functions/resolvers-su6wu3yoo2)

 ### Videos

 * 🎥 [GraphQL Tutorial #9, The Resolve Function - The Net Ninja](https://www.youtube.com/watch?v=NWod5SFW13s)

**[⬆ Back to Top](#table-of-contents)**


## 20. Context

### Articles

 * 📜 [GraphQL Context and Services - Eric Clemmons](https://medium.com/@ericclemmons/graphql-context-services-6510269ef5a1)
 * 📜 [Learning about Execution and Context - GraphQL](https://graphql.org/learn/execution/)

**[⬆ Back to Top](#table-of-contents)**


## 21. Databases

### Articles

 * 📜 [Selecting database as data source for GraphQL Server — Wojciech Trocki](https://medium.com/@wtr/selecting-database-as-data-source-for-graphql-server-e3281fcefb2)
 * 📜 [Connecting Server and Database with the Prisma Client — Prisma](https://www.howtographql.com/graphql-js/5-connecting-server-and-database/)
 * 📜 [Using a GraphQL API for Database Administration — Michael Hunger](https://medium.freecodecamp.org/using-a-graphql-api-for-database-administration-1a5039b43c8f)
 * 📜 [GraphQL as a database query language - Predrag Gruevski](https://blog.kensho.com/compiled-graphql-as-a-database-query-language-72e106844282)
 * 📜 [Use all the databases — Loren Sands-Ramshaw](https://www.compose.com/articles/use-all-the-databases-part-1/)

 ### Videos

 * 🎥 [Build a GraphQL Server with Node.js and MongoDB - Ben Awad](https://www.youtube.com/watch?v=291i04TfGb0)
 * 🎥 [Build a GraphQL server for Node.js, using PostgreSQL/MySQL - Lee Benson](https://www.youtube.com/watch?v=DNPVqK_woRQ&t=3s)

**[⬆ Back to Top](#table-of-contents)**


## 22. Dataloader

### Articles

 * 📜 [Using dataloader with GraphQL: A Concrete Example — John Tucker](https://codeburst.io/using-dataloader-with-graphql-a-concrete-example-9b21352f1676)


### Videos

 * 🎥 [DataLoader – Source code walkthrough — Lee Byron](https://www.youtube.com/watch?v=OQTnXNCDywA&feature=youtu.be)
 * 🎥 [DataLoader and the Problem it solves in GraphQL — knowthen](https://www.youtube.com/watch?v=ld2_AS4l19g)

**[⬆ Back to Top](#table-of-contents)**


## 23. Entry Points

### Articles

 * 📜 [API Reference: entry points — GraphQL](https://graphql.org/graphql-js/graphql/#entry-point)

### Videos

 * 🎥 [ContentaJS GraphQL 3 - The GraphQL entry points — Mateu](https://www.youtube.com/watch?v=7eLsfIZYuvU)

**[⬆ Back to Top](#table-of-contents)**


## 24. Endpoints

### Articles

 * 📜 [3 Methods to Resolve GraphQL Endpoints - Nicholas Hagen](https://www.contentful.com/blog/2018/09/25/3-methods-resolve-graphql-endpoints/)
 * 📜 [Adding a GraphQL endpoint - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/v1/setup.html)
 * 📜 [FakerQL — The ultimate GraphQL endpoint for fake data - Jamie Barton](https://medium.com/@notrab/fakerql-is-ultimate-graphql-endpoint-for-fake-data-bd83f4cd6ad1)
 * 📜 [Running a scalable & reliable GraphQL endpoint with Serverless - Siddharth Gupta](https://serverless.com/blog/running-scalable-reliable-graphql-endpoint-with-serverless/)

 ### Videos

 * 🎥 [GraphQL with your REST endpoints with RestLink - Leigh Halli](https://www.youtube.com/watch?v=yvoGCY7N_fg)
 
**[⬆ Back to Top](#table-of-contents)**


## 25. Schema Stitching

### Articles

 * 📜 [The ultimate guide to Schema Stitching in GraphQL - Rishichandra Wawhal](https://blog.hasura.io/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/)
  * 📜 [GraphQL Stitching 101 - Artsy] (http://artsy.github.io/blog/2018/12/11/GraphQL-Stitching/)
 * 📜 [Schema Stitching - Apollo Documentation](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html)
 * 📜 [GraphQL Remote Schema Stitching in a Multi-Service Architecture - Suciu Vlad](https://medium.com/provablyfair/graphql-remote-schema-stitching-in-a-multi-service-architecture-ac329037f082)

### Videos

 * 🎥 [API mashup: Combining APIs using GraphQL schema stitching - GitHub](https://www.youtube.com/watch?v=90JWZnuf7xQ)
 * 🎥 [GraphQL Schema Stitching - Ben Awad](https://www.youtube.com/watch?v=4i3W6g_u1Nw)
 * 🎥 [GraphQL Schema Stitching with Prisma and Contentful - Nikolas Burk(Contentful)](https://www.youtube.com/watch?v=w1loiyLD4eY)

**[⬆ Back to Top](#table-of-contents)**


## 26. Code First

### Articles

 * 📜 [Code-first - Hot Chocolate]([https://hotchocolate.io/docs/code-first])


**[⬆ Back to Top](#table-of-contents)**


## 27. Schema First

### Articles

 * 📜 [The Problems of Schema-First GraphQL - Prisma]([https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3])
  * 📜 [Using a Schema-First Design As Your Single Source of Truth - Prisma]([https://nordicapis.com/using-a-schema-first-design-as-your-single-source-of-truth/])

 ### Videos

 * 🎥 [Schema First Development - Prisma]([https://www.youtube.com/watch?v=SdWI7XaAeeY])

**[⬆ Back to Top](#table-of-contents)**


## 28. Middleware

### Articles

 * 📜 [GraphQL Middleware - Prisma]([https://www.prisma.io/blog/graphql-middleware-zie3iphithxy])


 ### Videos

 * 🎥 [GraphQL Middleware - Ben Awad]([https://www.youtube.com/watch?v=0npsaFdrrFw])

**[⬆ Back to Top](#table-of-contents)**

---

# Client

## 29. Fetching

### Articles

 * 📜 [4 simple ways to call a GraphQL API - Sashko Stubailo](https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355)

  ### Videos

 * 🎥 [Fetching data from an API in GraphQL - Ben Awad](https://www.youtube.com/watch?v=RDQyAcvmbpM)
 * 🎥 [Building a GraphQL Server, RootQuery & Fetching Data - Traversy Media](https://www.youtube.com/watch?v=e9Zxzr7sy60)
 
**[⬆ Back to Top](#table-of-contents)**


## 30. Fragments

### Articles

 * 📜 [Using fragments - Apollo](https://www.apollographql.com/docs/react/advanced/fragments.html)
 * 📜 [How to query your schema with GraphQL fragments - David Mráz](https://medium.com/graphql-mastery/graphql-fragments-and-how-to-use-them-8ee30b44f59e)
 * 📜 [GraphQL Fragments are the Best Match for UI Components - Samer Buna](https://www.manifold.co/blog/graphql-fragments-are-the-best-match-for-ui-components-72b8f61c20fe)

 ### Videos

 * 🎥 [How GraphQL Fragments Work - Ben Awad](https://www.youtube.com/watch?v=AAHR7eBKLU8)

**[⬆ Back to Top](#table-of-contents)**


## 31. Variables

### Articles

 * 📜 [GraphQL Tour: Variables - Clay Allsop]([https://medium.com/the-graphqlhub/graphql-tour-variables-58c6abd10f56])
 * 📜 [Introduction to GraphQL: GraphQL Variables - Flavioscopes]([https://flaviocopes.com/graphql/#graphql-variables])
 ### Videos

 * 🎥 [GraphQL Tutorial #32: query variables - The Net Ninja]([https://www.youtube.com/watch?v=Rvx1HLMK1-U])

**[⬆ Back to Top](#table-of-contents)**

## 32. Alias

### Articles

 * 📜 [An Introduction to GraphQL: Aliases - GraphQL Mastery]([https://flaviocopes.com/graphql/#aliases])
 * 📜 [How to use GraphQL aliases - GraphQL Mastery]([https://medium.com/graphql-mastery/graphql-quick-tip-aliases-567303a9ddc5])
 * 📜 [More GraphQL Concepts: Aliases - HowtoGraphQL]([https://www.howtographql.com/advanced/2-more-graphql-concepts/])

**[⬆ Back to Top](#table-of-contents)**

## 33. Polling

### Articles

 * 📜 [Dynamic GraphQL polling with React and Apollo Client - David Glasser](https://blog.apollographql.com/dynamic-graphql-polling-with-react-and-apollo-client-fb36e390d250)
 * 📜 [Introducing Schema Polling - Novvum ](https://www.novvum.io/post/graphql-playground-v1-8-8-introducing-schema-polling)
 
**[⬆ Back to Top](#table-of-contents)**


## 34. Cache

### Articles

 * 📜 [Understanding Caching](https://medium.com/p/58756ff253d8#9388)
 * 📜 [Caching with GraphQL - What are the best options?](https://blog.usejournal.com/caching-with-graphql-what-are-the-best-options-e161b0f20e59)
 * 📜 [GraphQL VS Rest: Caching](https://philsturgeon.uk/api/2017/01/26/graphql-vs-rest-caching/)
 * 📜 [Learn Caching](https://graphql.org/learn/caching/)

### Videos

* 🎥 [GraphQL Caching using DataLoader — Fun Fun Function](https://www.youtube.com/watch?v=--AguZ20lLA)
* 🎥 [Feature: GraphQL Caching with DataLoader — Ben Awad](https://www.youtube.com/watch?v=tSQ7WuAcAbU)

**[⬆ Back to Top](#table-of-contents)**

---
# Best Practices

## 35. Schema Design

### Articles

 * 📜 [GraphQL best practices for GraphQL schema design - David Mraz](https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design)
 * 📜 [GraphQL Schema Design: Building Evolvable Schemas - Marc-André Giroux](https://blog.apollographql.com/graphql-schema-design-building-evolvable-schemas-1501f3c59ed5)
 * 📜 [Writing a Graphql Schema - Eitan Frailich](https://github.com/davidyaha/graphql-workshop/blob/master/manuals/step-2-writing-a-schema.md)

**[⬆ Back to Top](#table-of-contents)**


## 36. Logging

### Articles

 * 📜 [Title - Author]([Paste Link here])

 ### Videos

 * 🎥 [Title - Youtube Name]([Paste Link here])

**[⬆ Back to Top](#table-of-contents)**
