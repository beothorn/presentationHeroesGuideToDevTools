# A hero's guide to developing with Chrome Dev Tools

## Abstract

Production issues on your webapp most definitely calls for a hero.

And for those brave souls who answer the call, a sidekick can be the difference between saving everyone or letting the bad guys win!

Chrome dev tools can be a powerful ally for testing, experimenting and debugging. They can help you to uncover what is really going on in production.

Listen to my story and discover how you can add special debugging features for your web application using extensions, call your REST API, inject special components and much more.

## Goal time
30 minutes

## Who am I?

I am a developer, and I like to code. The feeling of telling a computer to calculate something that you could not possibly do yourself and having a response is awesome.

I am currently a fullstack developer in the app used by drivers delivering goods for the Metro Cash and Carry.

The DriverApp lives inside the ecossystem of microservices inside Metronom and Metro, and is the bridge between deliveries and the rest of our system.

It is a ReactApp packaged with Cordova, with a backend using Spring Boot, Java, Scala and Cassandra.

## Everything is fine when everything is fine

And we follow the common practice of our industry.
We have unit tests to protect us, we have functional tests, we do QA, smoke tests and all of those let us sleep at night.

We have a pre-production environment, where we can run manual tests.

We have our docker image repository and our infrastructure on kubernetes, so if we realize something went wrong with our deploy we can revert to our last image with ease.

And all this setup give us peace of mind. When everything is fine, everything is fine.

## The Evil bug

But sometimes everything looks fine, until it isn't. 

Sometimes things goes weird and it is hard to understand what is going on.

And where you start looking to solve these issues? 

Time to keep calm and put your superhero cape.

## When you are in a bad situation, what can help you

When this happens, it is good to have all the help you can get. 

Access to the db, logs (especially logs) , remote debugging, directly connecting to your server.

All those are really usefull, but I want to show you a tool that is usually not used, but can be a source of great insights and even, who knows, even save the day.

## As you fail you learn

But first, I want to talk about how to investigate issues on production code.

Every issue is diferent, but the starting point is doing a sanity check.

You start small, is the basic stuff in order?

You can reach a big chunck of the errors just doing basic checks.

You can learn things to check by investigating new errors.

For example, on driver app the first thing to check is what deliveries where already synced and at what time. Seems simple but this eliminates a lot of problems that we would not be able to see if we went in another direction.

Usually the starting point is calling the rest interface.

I used to use rest clients to look at this information. 
But they are not powerful enough. It is complicated to filter information,
no mechanism to do complex stuff as reusing data from one query to the other.

No output but jsons.

A lot of copying, pasting and text searching

You need to fail a lot. Learn what are the starting points
to investigate issues and then create the tools for you to easily access them.


## A familiar tool that is more powerful than you thought

But I want to show you an unlikely help.
I has the advantage of being a powerfull REPL, with lots of powerful features,
flexible and being the very thing your users have to use your system.

## Surprise, this is the demo

For example, here we are, right now inside a browser. And I'll demonstrate to you
that with some preparation, it can give you an edge when you need to investigate that nasty bug.

There is a toy system running in the background with a persisted state. 

The forms on the slides are really calling the server and making changes.

There is also an extension that is injecting code and adding extra elements to our slides.

## Let's give ourselves superpowers


## Super-speed

You need to be able to just start calling endpoints.

Learn the fetch api.

Use the mutation observer to inject buttons that fills boilerplate.

Jump from screen to screen.

## Super-speed demo

## Super-vision

You need to be able to see what is happening on production.

Add endpoints that allow you to query basic stuff.

Add views that are not present on the regular version of the app using extensions.

Browse information integrated with the very ui user uses to input it.

## Super-strength

Sometimes, you need to be able to change stuff on production, even if it is dangerous.
Make yourself able to do this without burocracy.

## Just another tool on your toolbelt

## Share your power

Extensions are code. Use version control, make them available in your internal repo.
