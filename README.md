1. Encountered bugs:
  -> generateLastModifiedDateFilter => Filters were incorrect
  -> Save of the domain does not keep account of mongo document version
      I did a small fix for it but I would rather lock it somehow or implement a transaction - I briefly looked and mongo has some transactions
      but I would need to read through it to implement it properly.
To Improve.
2. Code is too interconnected and hard to follow. Create proper abstractions for the code.
3. Queue => Totally separated concept it can be moves away from the worker
4. Abstract away hubspot reusable functions
    => All methods fetch in the same way the results from hubspot and have
       the same retry policy we could abstract that away and reuse it
    => Also handle different errors from hubspot differently for example I got 4XX error which should not retry cause it will get again a 4XX
       we should differentiate between errors when we retry
5. To many callbacks => try to abstract away all the callbacks to use Promises and to make code read top to bottom most of the time
6. I see we do not drain the queue on process exit or if an unexpected error happens
7. Maybe more a question rather then a improvement. I'm not a mongo expert but why we queue saves to mongo ? Why we do not write directly I always tought mongo is very fast.
8. The whole polling is run sequentially why we don't run it in parallel ? I see no reason to not run it in parallel
9. Why we do not split the worker in multiple workers specialized each in fetching on type of entity ?
10. There is a redundancy when we fetch contacts and then in meetings we need contacts again maybe we can reuse what we store in actions for contacts
  in meetings as well - this would mean that meetings pool and contacts pool cannot be run in parallel
