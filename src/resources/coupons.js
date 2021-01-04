class Coupons {
  constructor(axios) {
    this.axios = axios
  }

  async getPossibilities(courseId) {
    try {
      const response = await this.axios.get(`courses/${courseId}/coupons-v2/meta`)

      if (!response.error) {
        return response.data
      }
      return false
    } catch (e) {
      return false
    }
  }
  
  async check(courseId, couponCode, value, discountStrategy) {
    try {
      const response = await this.axios.post(`discounts/validate-coupon`, {
        course_id: courseId,
        coupon_code: couponCode,
        value,
        discount_strategy: discountStrategy,
      })
      console.log(response.error)

      if (!response.error) {
        return 'good'
      }
      return 'not_good'
    } catch (e) {
      console.log(e)

      return 'not_good'
    }
  }


  async create(courseId, couponCode, value, discountStrategy) {
    try {
      const response = await this.axios.post(`courses/${courseId}/coupons-v2/`, {
        code: couponCode,
        discount_value: value,
        discount_strategy: discountStrategy,
      })

      return response
    } catch (e) {
      return false
    }
  }
}

module.exports = (axios) => {
  return new Coupons(axios)
}