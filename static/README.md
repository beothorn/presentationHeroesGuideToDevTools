# A hero's guide to developing with Chrome Dev Tools

## Abstract

Production issues on your webapp most definitely calls for a hero.

And for those brave souls who answer the call, a sidekick can be the 
difference between saving everyone or letting the bad guys win!

Chrome dev tools can be a powerful ally for testing, experimenting and 
debugging. They can help you to uncover what is really going on in 
production.

Listen to my story and discover how you can add special debugging 
features for your web application using extensions, call your 
REST API, inject special components and much more.

## Goal time
30 minutes

## Title

This presentation is available at the url on this QR code. The QR code 
is also in the slide at the end of this presentation.

## Who am I?

I am a developer, and I like to create.

I am currently a fullstack developer in the app used by drivers 
delivering goods for the Metro Cash and Carry.

The DriverApp lives inside the ecossystem of microservices inside 
Metronom and Metro, and is the bridge between deliveries and the 
rest of our system.

The actual app is a ReactApp packaged with Cordova, with a backend 
using Spring Boot, Java, Scala and Cassandra.

The app is used by the drivers to load the articles to be delivered 
in the truck, controlling the deposits and returns, getting the 
signature from the clients, generating delivery summaries among 
other stuff.

## Everything is fine when everything is fine

And we follow the common practice of our industry.
We have unit tests to protect us, we have functional tests, we do QA, 
smoke tests and all of those let us sleep at night.

We have a pre-production environment, where we can run manual tests.

We have our docker image repository and our infrastructure on 
kubernetes, so if we realize something went wrong with our deploy 
we can revert to our last image with ease.

And all this setup give us peace of mind. When everything is fine, 
everything is fine.

## The Evil bug

But sometimes everything looks fine, until it isn't. 

Sometimes things goes weird and it is hard to understand what is 
going on.

And where you start looking to solve these issues? 

Time to keep calm and put your superhero cape.

## When you are in a bad situation, what can help you

When this happens, it is good to have all the help you can get. 

Access to the db, logs (especially logs) , remote debugging, directly 
connecting to your server.

All those are really usefull, but I want to show you a tool that is 
usually not used, but can be a source of great insights and even, 
who knows, even save the day.

## Things are in order

I want to talk about how to investigate issues on production code.

Every issue is diferent, but the starting point is doing a sanity check.

You start small, is the basic stuff in order?

You can reach a big chunck of the errors just doing basic checks.

You can learn things to check by investigating new errors.

## As you fail you learn

For example, on driver app the first thing to check is what 
deliveries where already synced and at what time. Seems simple but 
this eliminates a lot of problems that we would not be able to see 
if we went in another direction.

Usually the starting point is calling the rest interface.

I used to use rest clients to look at this information. 
But they are not powerful enough. It is complicated to filter 
information,
no mechanism to do complex stuff as reusing data from one query to 
the other.

No output but raw jsons.

A lot of copying, pasting and text searching

You need to fail a lot. Learn what are the starting points
to investigate issues and then create the tools for you to easily 
access them.

## Obvious is powerful

As you investigate new bugs and you use your own system you end up 
learning all those patterns.

Then those patterns become obvious. And they usually are, but we 
forget all the things that we eliminated while learning those patterns.

But what is obvous for you is not always obvious for others, and 
you need a way to give form to those patterns, make them more 
discoverable and aproachable.

One way to do this is documentation. Another way is code.

## Small gains → big gain

Each of those obvious patterns don't add so much value by themselves, 
but when combined they end up giving a huge boost on speed.


## A familiar tool that is more powerful than you thought

But I want to show you an unlikely help.
I has the advantage of being a powerfull REPL, with lots of powerful 
features,
flexible and being the very thing your users have to use your system.

## Surprise, this is the demo

explain driverapp, the flow and the reports

introduce the dev tools, the console tab, the network tab,


For example, here we are, right now inside a browser. And I'll 
demonstrate to you that with some preparation, it can give you an 
edge when you need to investigate that nasty bug.

There is a toy system running in the background with a persisted state. 

The forms on the slides are really calling the server and making 
changes.

There is also an extension that is injecting code and adding extra 
elements to our slides.

## Let's give ourselves superpowers


## Super-speed

The first thing we want is speed. We want to go directly to the heart 
of the issue and not waste our time on procedures that may make sense 
on real use cases, but not for debugging our app.

For this we need shortcuts and autocompletions that gets everything 
that is not interesting out of the way.

## Super-speed demo

This is a general idea of one thing that our app does, give a list of 
all articles that need to be loaded to be delivered by a driver.

We usually don't do this on production, but one common strategy that 
we have is to duplicate the state of a tour from production to 
our testing environment.

To start a tour the driver needs to scan all articles as they are 
loaded. On this example we have only a few articles, but on a real 
tour
we can have a lot more. So just we don't waste time here if this is 
not related to our bug, we can load all articles at once.

Notice that this button is not present on the actual app. It was 
injected by our extension.

Let's click on it and see what happens.

## Super-vision

When we are investigating an issue we need to see more than what is 
usually shown to the client. We need to be able to see tecnical 
information, we need to see historical information and we need to 
see things that a regular user has no authorization to see.

## Super-vision

Here on this form you see something similar to what a driver sees 
when they finish loading and is ready to start a tour. 

The driver have a list of tours to take. After they deliver the 
articles and get the client signature the tour is done.

After each tour we generate a delivery summary and send it by email 
to the customer and to the store.

After all tours are finished we send a summary of all tours to the 
store.

We try to sync the state of the tour as much as possible, but it is 
expected that the driver will be offline for big amounts of time.

Then we can have this button here. This is also injected by the 
extension.

If we have a stuck device the last sync and the app version for a 
tour can give us a starting point on where to start looking.

Again, we could look at the logs, database, but it is really 
convenient to already have this information in the context of the app.

Also, for this, you will need to create the endpoints obvously with 
some kind of authentication

Also there is another way for us to have this supervision.

## Super-vision

With javascript it is easy to map reduce basic json responses.

The extension is injecting a global object called HERO with useful 
functions.

We can take advantage of this using Devtools. 
[Explain example]

We also get a log of all network calls on the network tab.
Devtools can also output more than text

## Super-vision

So here we can output all deliveris from tour with id 1 as a table.

We can also draw stuff on devtools using css and base64 encoded images.

We actually used this when debugging some issues we were having with 
client signatures on our app.

## Super-strength

Sometimes, you need to be able to change stuff on production, even 
if it is dangerous.
Make yourself able to do this without burocracy.

The extension injects here a button to finish all tours.

## Super-strength


## Just another tool on your toolbelt

## Share your power

The core idea is to collect all the knowledge acquired about all 
those patterns, encode them as code and make them available on the UI.

And put the extension on some version control. This way the knowledge 
can be shared and collectivelly improved.
