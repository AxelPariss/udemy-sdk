class Courses {
  constructor(axios) {
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

    return courses
  }
}

module.exports = (axios) => {
  return new Courses(axios)
}