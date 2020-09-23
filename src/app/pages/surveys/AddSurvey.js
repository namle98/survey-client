import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Input } from 'antd'
import React from 'react'
import { AUTH_TOKEN_KEY } from '../../config/auth';
import PickerExamplePage from "../home/google-material/inputs/PickersExamplesPage"
import { withRouter } from 'react-router-dom';
import { showErrorMessage, showSuccessMessageIcon } from '../../actions/notification';
import makeRequest from "../../libs/request";
import DateTimePicker from "./DateTimePicker";
import moment from 'moment'
class AddSurvey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            idSurvey: "",
            startDate: "",
            endDate: "",
            user: {},
        }
    }
    componentDidMount() {
        let storeData = localStorage.getItem(AUTH_TOKEN_KEY);
        storeData = JSON.parse(storeData)
        let token = storeData.authToken
        let user = storeData.user
        token = token.slice(1, token.length - 1);
        this.setState({
            ...this.state,
            user: user,
        })
    }
    fetchAPI() {

        let formdata = {
            start_date: this.state.startDate,
            del: 0,
            end_date: this.state.endDate,
            title: this.state.title,
        }
        makeRequest("post", `surveyrounds/createSurRounds`, formdata)
            .then(({ data }) => {
                if (data.message === "SUCCESS" && data.code === 200) {
                    console.log(JSON.stringify(data))
                    showSuccessMessageIcon("Tạo thành công")
                }
                return this.props.history.push(`/survey/list`);

            })
            .catch((err) => {
                return showErrorMessage(" thất bại, " + err);
            });


    }
    onChangeValue = (key, value) => {
        this.setState({
            ... this.state,
            [key]: value,

        })
    };
    _submit = () => {
        console.log(this.state.title + "  " + this.state.idSurvey);
        this.fetchAPI()
    }

    setStartDate(date) {
        this.setState({
            startDate: date
        })
    }

    render() {
        return (
            <div  >
                <div className="row">
                    <   div className="col">
                        Tên khảo sát
                        <Input placeholder="Tên khảo sát"
                            name="title"
                            value={this.state.title}
                            onChange={(e) => {
                                this.onChangeValue(e.target.name, e.target.value)
                            }}
                        >
                        </Input>
                    </div>

                    <div style={{ width: "10px", height: '100%' }}></div>
                    <div className="row">
                        <div className="col">
                            Ngày bắt đầu khảo sát
                    <DateTimePicker changeDate={
                                (data) => {
                                    this.setState({
                                        startDate: data
                                    })
                                }
                            }>
                            </DateTimePicker >
                        </div>
                        <div className="col">
                            Ngày kết thúc khảo sát
                        <DateTimePicker changeDate={
                                (data) => {
                                    this.setState({
                                        endDate: data
                                    })
                                }
                            }></DateTimePicker>
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this._submit}
                >Submit</button>
            </div>
        )
    }
}

export default withRouter(AddSurvey);