import AltContainer from 'alt/AltContainer';
import React from "react";
import Notes from "./Notes.jsx";
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import Lanes from './Lanes.jsx';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.addItem}>+</button>
				<AltContainer
					stores={[LaneStore]}
					inject={ {
            items: () => LaneStore.getState().lanes || []
          } }
					>
					<Lanes />
				</AltContainer>
			</div>
		);
	}
	addItem() {
		LaneActions.create({name: 'New lane'});
	}
}