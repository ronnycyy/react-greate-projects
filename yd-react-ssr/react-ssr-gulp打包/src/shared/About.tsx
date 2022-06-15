import React from "react";
import {Dispatch} from 'redux';
import axios from "axios";
import { connect } from "react-redux";
interface IProps {
  data: string;
  dispatch:Dispatch
}
class About extends React.Component<IProps> {
  // @babel/plugin-proposal-class-properties
  static loadData = (store) => {
    return new Promise((resolve) => {
      axios.get("http://localhost:3000/getData").then((res) => {
        // this.setState({
        //     data:res.data.data
        // })
        store.dispatch({
          type: "CHANGE_STATE",
          payload: {
            data: res.data.data,
          },
        });
        resolve(res.data.data);
      });
    });
  };
  // state = {
  //     data:''
  // }
  componentDidMount(){
      if(!this.props.data){
        axios.get('http://localhost:3000/getData').then(res => {
            // this.setState({
            //     data:res.data.data
            // })
            this.props.dispatch({
                type: "CHANGE_STATE",
                payload: {
                  data: res.data.data,
                },
              });
        })
      }
     
  }
  render() {
    return <div>{this.props.data}</div>;
  }
}
function mapStateToProps(state) {
  return {
    data: state.data,
  };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(About);
