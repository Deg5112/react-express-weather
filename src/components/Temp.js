import React from 'react'
import {Grid, withStyles} from "@material-ui/core";

const Temp = ({temp, big, classes}) => {
  return (
    <Grid container alignItems={"center"} justify={"center"}>
      <Grid item>
        <span style={{fontSize: big ? '2.5em': '1em'}}>
          {Math.round(temp)}
        </span>
      </Grid>
      <Grid item>
        <span style={{fontSize: big ? '2em': '1em'}}>&#176;</span>
      </Grid>
    </Grid>
  )
}

export default withStyles(theme => ({}))(Temp)
