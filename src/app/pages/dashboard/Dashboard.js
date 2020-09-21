import React from "react";
import { connect } from 'react-redux';

const Dashboard = (props) => {
  
  return <div>
    Dashboard
  </div>
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, null)(Dashboard);
