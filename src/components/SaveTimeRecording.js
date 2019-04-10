import React, { Component } from "react";
import { saveTime } from "../modules/saveTimeSheet";
import TimeInputForm from "./TimeInputForm";
import { Form, Button, Grid } from "semantic-ui-react";
import ViewTimeRecording from './ViewTimeRecording'

class SaveTimeRecording extends Component {
	constructor(props) {
		super(props)
		this.postTimesheets = this.postTimesheets.bind(this)
	}

	state = {
		begin: "",
		end: "",
		timeSaved: false,
		errorMessage: '',
	};

	async postTimesheets() {
		const response = await saveTime(this.state.begin, this.state.end);

		if (response.status === 200) {
			this.setState({
				timeSaved: true,
			});
		} else {
			this.setState({
				errorMessage: 'Your time was not saved, make sure that you use the correct format'
			})
		}
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			timeSaved: false
		});
	}

	render() {
		let saveButton;

		if (!this.state.timeSaved) {
			saveButton = (
				<>
					<Button
						style={{ background: "#5cb695", marginLeft: "10px"}}
						name="create"
						onClick={this.postTimesheets.bind(this)}
					>
						Create
					</Button>
					<p>
						{this.state.errorMessage}
					</p>
				</>
			);
		} else {
			saveButton = <p>Your time was saved</p>;
		}
		return (
			<div id="time-block">
				<Grid textAlign="center" columns={4}>
					<Grid>
						<Form.Group
							width="full"
							style={{
								background: "#DDDD",
								paddingTop: "10%",
								paddingBottom: "10%",
								width: "1740px",
								position: "absolute",
								marginTop: "50%",
							}}
						>
							<TimeInputForm
								style={{
									aligncontent: "left",
								}}
								changeValue={this.onChange.bind(this)}
								begin={this.state.begin}
								end={this.state.end}
							/>
							{saveButton}
						</Form.Group>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default SaveTimeRecording;
