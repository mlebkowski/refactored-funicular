# Task challenge

Hello. The task is fairly simple, and adding any kind of advanced architecture would be an overkill. 
Nevertheless, some concepts have been extracted for readability:

 * Task & Task Repository. This is the domain of our app. In a more advanced application it would
   be split into between multiple layers -- the HTTP implementation should live in the infra layer
 * Http -- only relates to the external API, but the idea is to map it to our domain tasks ASAP
 * Filter -- each criteria was split into a separate matcher

All in all, the `status` field is used to create a task collection based on the data from the
external API, which is then filtered using a `Criteria` object. Simple.

## Design choices

* I decided to fetch the first page and inspect the total pages field. Based on that I
fill out the rest of the pages and convert them all to requests/promises which are then
handled by `Promise.all()` in parallel. 
There might be additional requirements to consider given broader context.

* Instead of deriving start and end of month from `dateStr` I decided to convert task’s
timestamps to dates, and then to `MM-YYYY` strings. Seemed easier this way, and again,
since there was no broader context to consider, I went with it.

* The `Task` entity was stripped to only the `date` and `priority` fields, as they are 
the only ones used. I skipped hydrating other fields: they would be easy to add whenever
they become required.

* I did not pay much attention to error handling, but some basic concepts are in place.

* Code style is forced by prettier. That has nothing to do with my personal preferences.
I agree with its philosophy: https://prettier.io/docs/en/why-prettier

* There is no linter nor strict ts settings -- I didn’t have any boilerplates at hand.

## Tests

The e2e tests were prepared (mostly, there were no error conditions checked there), but 
to complete the test pyramid, I added unit tests at the lowest level. This way I could 
have certainty that each piece of code worked correctly as I wrote it, even before the 
whole application was functional.

## OOP vs functional

I think these styles mix very well together. I mostly use OOP, but I like to add some functional
parts as a code style preference at lower levels. Here I implemented some simple parts of a 
functional toolbox as I didn’t want to fetch any external dependencies such as Ramda. 
