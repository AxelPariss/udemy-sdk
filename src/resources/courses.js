class Courses {
  constructor(axios) {
    this.CouponModel = require('./coupons')(axios)
    this.axios = axios
  }

  async get() {
    const response = await this.axios.get(`https://www.udemy.com/api-2.0/users/me/taught-courses/?page=1&page_size=200&ordering=-created&skip_caching=true&fields[course]=title,image_100x100,image_200_H,status_label,is_paid,is_private,original_price_text,privacy_label,quality_status,can_edit,can_use_course_manage,url,creation_progress_ratio,is_published,num_subscribers,num_subscribers_recent,features,rating,quality_feedback_counts,quality_review_process,can_use_revenue_report,can_use_qa,can_use_reviews,is_owner,is_organization_eligible,show_organization_eligible_reminder,is_in_any_ufb_content_collection,content_length_video&fields[feature]=reviews_view&fields[quality_review_process]=last_submitted_date`)

    return response.data.results.map((course) => {
      if (course._class === 'course') {
        return {
          ...course,
          url: `https://udemy.com${course.url}`,
        }
      }
    })
  }

  async getOne(courseId) {
    const response = await this.axios.get(`https://www.udemy.com/api-2.0/courses/${courseId}/?fields[course]=title,image_100x100,image_200_H,status_label,is_paid,is_private,original_price_text,privacy_label,quality_status,can_edit,can_use_course_manage,url,creation_progress_ratio,is_published,num_subscribers,num_subscribers_recent,features,rating,quality_feedback_counts,quality_review_process,can_use_revenue_report,can_use_qa,can_use_reviews,is_owner,is_organization_eligible,show_organization_eligible_reminder,is_in_any_ufb_content_collection,content_length_video&fields[feature]=reviews_view&fields[quality_review_process]=last_submitted_date`)

    return {
      ...response.data,
      url: `https://udemy.com${response.data.url}`,
    }
  }
}

module.exports = (axios) => {
  return new Courses(axios)
}