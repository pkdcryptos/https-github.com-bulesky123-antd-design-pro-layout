
import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Notification from './notification'
import IconSvg from '../icon-svg'
import styles from './index.less'

let messageInstance

const getMessageInstance = (props = {}, callback, isLoading) => {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
  Notification.newInstance(props, (notification) => {
    callback && callback(notification)      // eslint-disable-line
  }, isLoading)
}

const notice = (content, duration, mask = true, onClose, isLoading) => {
  getMessageInstance({ isLoading }, (notification) => {
    messageInstance = notification
    notification.notice({
      duration,
      mask,
      content,
      onClose: () => {
        if (onClose) onClose()
        notification.destroy()
        messageInstance = null
      },
    })
  })
}

const WithIcon = ({ name, content, isLoading }) => (
  <div className={styles.notice}>
    <IconSvg
      className={cls([styles.icon, { [styles.loading]: isLoading }])}
      name={name}
    />
    <p className={styles.desc}>{content}</p>
  </div>
)

const LoadingIcon = () => (
  <div className={styles['loading-icon']}>
    <div className={styles.img} />
  </div>
)

WithIcon.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  content: PropTypes.string,
}

WithIcon.defaultProps = {
  isLoading: false,
  name: '',
  content: '',
}

export default {
  info: (content, duration, mask = true, onClose) => (notice(content, duration, mask, onClose)),
  success: (content, duration, mask = true, onClose) => (notice(<WithIcon content={content} name="#success" />, duration, mask, onClose)),
  fail: (content, duration, mask = true, onClose) => (notice(<WithIcon content={content} name="#cry" />, duration, mask, onClose)),
  loading: (content, duration, mask = true, onClose) => (notice(<LoadingIcon />, duration, mask, onClose, true)),
  hide: () => {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  },
}
