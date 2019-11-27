# Working on a solution to question posed during office hours 11/26/2019

Nothing much to see here.

## Setting up and adding fake data

1. Make sure you're running mongodb locally -or- adjust the mongodb uri string in config/config.js
2. npm install #install all dependencies
3. node fake-clusstre.js -c 100 # this will create 100 fake documents
4. node example-find.js # this will enable you to search for strings using the suggested $or operator.

```
? What userdefined, or pre-defined clusstreType tag would you like to find? [quit] rilwul
Answer: rilwul
{
  "_id": "5dde9c4b80594f9aec445747",
  "clusstreBasic": {
    "genders": [
      "Male"
    ],
    "clusstreName": "voluptatem",
    "memberDOBFrom": 1915,
    "memberDOBTo": 1977
  },
  "clusstreTypes": {
    "predefine": [
      "id",
      "gitej"
    ],
    "userdefine": [
      "tapef",
      "rilwul"
    ]
  },
  "tags": [
    "gew"
    ...
    ```