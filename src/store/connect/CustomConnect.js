import { connect } from "react-redux";
import { toggleLoader } from "@store/actions/loader"
import { withStyles } from "@material-ui/core/styles";

const globalActions = {
  toggleLoader,
};

function customConnect({
 component: component = () => ({}),
 mapState: mapState = (state) => ({}),
 mapActions: mapActions = {},
 styles: styles = (theme) => ({}),
}){
  return connect(
    (state) => ({
      ...mapState(state),
    }),
    {
      ...mapActions,
      ...globalActions},
  )(withStyles(styles)(component));
}

export default customConnect

