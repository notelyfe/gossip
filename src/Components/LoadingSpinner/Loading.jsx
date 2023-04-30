import React, { useEffect } from 'react'
import loadStyle from '../../Style/loading.module.css'

const Loading = () => {

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  })

  return (
    <div className={loadStyle.loadingWrapper}>
      <div className={loadStyle.backgroundCover}></div>
      <div className={loadStyle.content}>
        <div className={loadStyle.loader}></div>
      </div>
    </div>
  )
}

export default Loading
