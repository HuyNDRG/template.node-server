import httpStatus from 'http-status'

class RespData {
  constructor() {
    this.code = httpStatus.OK
    this.success = false
  }
}

const apiResp = (res, data) => res.status(data.code).json(data)

export { RespData }
export default apiResp
