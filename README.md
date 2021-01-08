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

## Functions

### udemy.coupons.create(courseId, couponCode, value, discountStrategy)

| Paramètre          | Description                 | Valeur                                                                                   |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| `courseId`         | Udemy course ID             | Ex: `2393094`                                                                            |
| `couponCode`       | Coupon                      | Ex: `NOUVELAN2020`                                                                       |
| `value`            | Price (between 9.99 et 199) | Ex: `13.99`                                                                              |
| `discountStrategy` | Type de promotion           | - `scarcity_free`<br/>- `urgency_free`<br/>- `discount_urgency`<br/>- `urgency_discount` |

### udem.announcements.send(title, content, includes = [], excludes = [], completionRatio = [0, 49, 99, 100], fromDate = '', toDate = '', is_promotional = true, isPreview = true)

| Paramètre         | Description                              | Valeur                         |
| ----------------- | ---------------------------------------- | ------------------------------ |
| `title`           | Title                                    | Ex: `Nouveau cours : Adobe XD` |
| `content`         | HTML content                             | Ex: `<p>Inscris-toi !</p>`     |
| `includes`        | Tableau des ID des cours Udemy à cibler  | Ex: `[2393094, 2872087]`       |
| `excludes`        | Tableau des ID des cours Udemy à exclure | Ex: `[2393094, 2872087]`       |
| `completionRatio` | Filtre de progression des participants   | -                              |
| `fromDate`        | Filtre de date de début d'inscription    | -                              |
| `toDate`          | Filtre de date de fin d'inscription      | -                              |
| `is_promotional`  | Is promotional                           | `true` or `false`              |
| `isPreview`       | Is preview email                         | `true` or `false`              |

## Information

This package is not under current development but you can DM me ou open pull request if you want to participate.
