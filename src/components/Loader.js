import React from 'react'
import {CircularProgress} from "@material-ui/core";
import CustomConnect from '@store/connect/CustomConnect'
import {useSelector} from 'react-redux'

const Loader = () => {
  const showLoader = useSelector(state => state.loader.showLoader);
  console.log({showLoader})
  return (
    <div id='circular-progress'>
      {showLoader && <CircularProgress />}
    </div>
  )
}

export default CustomConnect({
  component: Loader,
});
