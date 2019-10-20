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

## Title

This presentation is available at the url on this QR code. The QR code 
is also in the slide at the end of this presentation.

## Who am I?

I am a developer, and I like to create.

Currently I am a fullstack developer working for metronom.

## About metronom

Metronom is the company providing IT solutions for Metro.

METRO is Food Wholesale Company, we are offering our goods 
in stores and online for business customers. So owners 
of restaurants, hotels and such can order goods and receive
other services from metro.

Inside Metronom we have a big microservices ecossystem.
We have the main website were the customers can shop online, 
we have the companion app, support for the clients websites
and among all of those we have DriverApp, the team I am 
currently allocated to.

## Slide with depot image

The DriverApp is the app used by the truck drivers to manage
the deliveries.

Driverapp is a ReactApp packaged with Cordova.
On the backend we are using Spring Boot, Java, Scala and for 
persistence Cassandra.



The day of the truck driver starts on the depot. There they
get a list of all the goods that they need to load on the truck.

As they load the goods they scan these codebars using the app.

After everything is loaded they can start the tour.

## Slide with truck unloading goods

When the driver gets to each client they need to mark the article
as delivered and get the signature from the client, and the payment 
if aplicable.

We try to sync the state of the tour as much as possible, but it is 
expected that the driver will be offline for big amounts of time.

Every time the driver finishes a delivery the system generates a summary
and sends it to the client and to the stores email.

At the end of the day the driver needs to go back to the depot to
leave returns and deposits and then they finish the tour.

At this point a new day summary is sent to the store.

But lets tal about bugs.

## Everything is fine when everything is fine

At metronom we follow the common practice of our industry.
We have unit tests, we have functional tests, we do QA, 
smoke tests and all of those thing that makes us sleep better at night.

We also have a pre-production environment, where we can run manual tests.

If a bug that would bring down the system is introduced, usually we
realise it sooner.

## The Evil bug

Bt there is also a different kind of bug. It is the one that don't set things on
fire, but hides in plain sight while it is corrupting your data.

The clients start to see weird things and it is hard to understand what is going on.

Time to keep calm and put your superhero cape.

## When you are in a bad situation, what can help you

When this happens, it is good to have all the help you can get. 

Access to the db, logs (especially logs) , remote debugging, directly 
connecting to your server.

All those are really usefull, but I want to show you a tool that is 
usually not used, but can be a source of great insights and even, 
who knows, even save the day.

## Things are in order

One good first step is to check that everything is in order. 
While doing a sanity check can give you the first hints of
what is going on.

After investigating more and more issues you can start to learn
a what things you need to check first.

And even though every issue is diferent, a pattern starts to emerge. 

## As you fail you learn

Then investigating issues becomes easier because you already know 
those basic things that you need to check by heart.

## Obvious is powerful

After some time these things becomes obvious, and it is easy to
forget that when you started they weren't.

So it would be nice if all of these knowledge don't exist only inside your head.

## Small gains → big gain

If you bring all these knowledge into a single place you can transform this collection
of small patterns in a great tool. 
I want to show one of the ways you can do it using chrome and extensions.

## A familiar tool that is more powerful than you thought

...

## Surprise, this is the demo


introduce the dev tools, the console tab, the network tab,
the source tab

show the code for the slides, the toy system and the extension

explain each one

Point out that there is also an extension that is injecting code and adding extra 
elements to our slides.

## Let's give ourselves superpowers


## Super-speed

The first thing we want is speed. We want to go directly to the heart 
of the issue and not waste our time on things that may make sense 
for the client, but not for debugging our app.

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

Then we can have this button here. This is also injected by the 
extension.

If we have a stuck device the last sync and the app version for a 
tour can give us a starting point on where to start looking.

We could look at the logs, database, but it is really 
convenient to already have this information in the context of the app.

For this, you will need to create some endpoints, obviously with 
 authentication

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

Put the extension on some version control. This way the knowledge 
can be shared and collectivelly improved.
