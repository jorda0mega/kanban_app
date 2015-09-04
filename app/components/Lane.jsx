import React from 'react';
import AltContainer from 'alt/AltContainer';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
	render() {
		const {id, name, notes, ...props} = this.props;

		return (
			<div {...props}>
				<div className="lane-header">
					<Editable className="lane-name" value={name}
					          onEdit={this.editName.bind(null, id)}>
						<div className="lane-name">{name}</div>
						<div className="lane-add-note">
							<button onClick={this.addNote}>+</button>
						</div>
					</Editable>
				</div>
				<AltContainer
					stores={[NoteStore]}
					inject={ { items: () => NoteStore.getState().notes || []}}
					>
					<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		);
	}
	addNote() {
		NoteActions.create({task: "New task"});
	}
	editNote({id, task}) {
		NoteActions.update({id, task});
	}
	deleteNote(id) {
		NoteActions.delete(id);
	}
	editName(id, name) {
		if(name) {
			LaneActions.update({id, name});
		} else {
			LaneActions.delete(id);
		}
	}
}