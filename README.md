# Udemy SDK

Unofficial Udemy Node.js SDK for the internal API (for instructors).

Created by [@AxelPariss](https://axelparis.fr/twitter)

## Installation

```
npm install udemy-sdk
```

## Resources

- Coupons
- Announcements
- Courses
- Statements

## Usage

```js
const UdemySDK = require('udemy-sdk')

const debug = true

const Udemy = new UdemySDK(YOUR_UDEMY_TOKEN, debug)

// My Courses
const allCourses = await Udemy.courses.get()
console.log(allCourses)
```

## Discount strategies

```
scarcity_free (Gratuit pendant 31 jours, 10 utilisations)
urgency_free (Gratuit pendant 3 jours, illimité)
discount_urgency (Prix entre MIN et MAX pendant 31 jours)
urgency_discount (Prix MIN pendant 5 jours)
```

## Information

This package is not under current development but you can DM me ou open pull request if you want to participate.
