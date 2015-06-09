# ZenDesk integration with [Activity Stream](http://www.activitystream.com)

A ZenDesk app that sends ticket info to Activity Stream. The `app` folder contains the actual ZenDesk app while `json_gen` is a helper tool that generates json-like templates we can use in the `app`

To build the json_gen app:

```
$ cd json_gen
$ npm install
$ node json_gen.js
```

To build the ZenDesk app:

```
$ cd app
$ zat clean && zat package
```