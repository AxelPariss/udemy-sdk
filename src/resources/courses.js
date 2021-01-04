let Coupons

class Courses {
  constructor(axios) {
    Coupons = require('./coupons')(axios)
    this.axios = axios
  }

  async get(courseId = null) {
    const response = await this.axios.get(
      `users/26683816/taught-profile-courses/?fields[course]=id,title,url,image_200_H`
    )

    const courses = response.data.results.map((course) => {
      if (course._class === 'course') {
        return {
          ...course,
          url: `https://udemy.com${course.url}`,
        }
      }
    })

    const couponsPossibilities = []
    for (let i = 0; i < courses.length; i += 1) {
      couponsPossibilities.push(Coupons.getCouponsPossibilities(courses[i].id))
    }

    const allCouponsPossibilities = await Promise.all(couponsPossibilities)
    for (let i = 0; i < courses.length; i += 1) {
      courses[i].couponsPossibilities = allCouponsPossibilities[i]
    }


    return courses
  }
}

module.exports = (axios) => {
  return new Courses(axios)
}