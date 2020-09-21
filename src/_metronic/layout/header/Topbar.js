import React from "react";
import makeRequest from '../../../app/libs/request';

export default class Topbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listNotify: [],
      showModal: false,
      totalUnRead: 0,
      conditionUp: 0,
      totalPoints: 0,
      user: {}
    };
  }

  componentDidMount = () => {
    this.getUserInfo();
  }

  getUserInfo = () => {
    makeRequest('get', `auth/getInfo`)
      .then(({ data }) => {
        this.setState({
          user: data.data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  setStatus = (id) => {
    let objTemp = [...this.state.listNotify];
    objTemp.find(x => x.id === id).status = 1;
    this.setState({
      listNotify: objTemp
    })
  }

  render() {

    return (
      <div className="kt-header__topbar">
      </div>
    );
  }
}
