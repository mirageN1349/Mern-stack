import React from 'react'

export const useMassage = () => {
  return React.useCallback(text => {
    if (window.M && text) {
      window.M.toast({ html: text })
    }
  }, [])
}
