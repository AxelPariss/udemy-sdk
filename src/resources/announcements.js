class Annoucements {
  constructor(axios) {
    this.axios = axios
  }

  async get(courseId) {
    try {
      const response = await this.axios.get(
        `courses/${courseId}/announcements/?is_promotional=true&page=1&page_size=500&fields[course_announcement]=@default,course,open_rate,click_rate,unsub_rate,num_viewed`
      )

      const courses = response.data.results.map((course_announcement) => {
        if (course_announcement._class === 'course_announcement') {
          return {
            ...course_announcement,
            url: `https://www.udemy.com/announcement/${course_announcement.id}/?course=${courseId}`,
          }
        }
      })

      return courses
    } catch (e) { 

    }
  }

  async getRevenues(courses = []) {
    try {
      let coupons = []

      for (course of courses) {
        const response = await this.axios.get(
          `courses/${course.id}/coupons-v2/?page=1&search=&invalid=true&page_size=50`
        )
        coupons = [...coupons, ...response.data.results]
      }

      const distinctCoupons = coupons
        .map((item) => item.code)
        .filter((value, index, self) => self.indexOf(value) === index)

      let final_coupons = []
      for (const distinctCoupon of distinctCoupons) {
        total = 0
        for (const coupon of coupons) {
          if (coupon.code === distinctCoupon) {
            total += coupon.discount_value * coupon.number_of_uses
          }
        }

        final_coupons = [
          ...final_coupons,
          {
            revenues: total,
            // number_of_uses: coupon.number_of_uses,
            code: distinctCoupon,
            // id: coupon.id
          },
        ]
      }

      return final_coupons
    } catch (e) { }
  }

  async send(
    title,
    content,
    includes = [],
    excludes = [],
    completionRatio = [0, 49, 99, 100],
    fromDate = '',
    toDate = '',
    is_promotional = true,
    isPreview = true
  ) {
    const url = `announcement-groups${isPreview ? '?is_preview=1' : ''}`

    try {
      const response = await this.axios.post(url, {
        title,
        content,
        is_promotional,
        data: {
          includes,
          excludes,
          completionRatio,
          fromDate,
          toDate,
        },
        ignore_warnings: 1,
      })

      if (!response.error) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }
}

module.exports = (axios) => {
  return new Annoucements(axios)
}