import React from 'react'
import { Button, Result } from 'antd'
import { history } from 'utils'

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/home')}>
        Go Back Home
      </Button>
    }
  />
)
export default NoFoundPage

