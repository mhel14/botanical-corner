import React from 'react';
import { Link } from 'react-router-dom';
import { getAccessRole } from '../auth';
import './ListData.css';

interface PropsInterface {
	data: Array<any>,
	path: string,
	getActiveData: Function,
	setActiveModal: Function,
	handleDelete: Function,
	isAdmin: boolean
}

const renderListItem = ({ name, id }: {id: string, name: string}, path: string, getActiveData: Function, setActiveModal: Function, handleDelete: Function, isAdmin: boolean) => {
	let actionButtons;
	if (
		(path === 'fruit' && getAccessRole() === 'FruitJohn') ||
		(path === 'vegetable' && getAccessRole() === 'VegetarianMary') ||
		isAdmin
	) {
		actionButtons = (
			<div className="actions">
				<span
					onClick={() => {
						setActiveModal('update');
						getActiveData(id, name);
					}}
				>
					Edit
				</span>
				<span onClick={() => handleDelete(id, name)}>Delete</span>
			</div>
		);
	}

	return (
		<li className="media" key={id}>
			<div className="media-content row-content">
				<Link to={`/${path}/${id}`}>{name}</Link>
				{actionButtons}
			</div>
		</li>
	);
};

const ListData = ({ data, path, getActiveData, setActiveModal, handleDelete, isAdmin }: PropsInterface) => {
	return (
		<div>
			<ul className="box">
				{data &&
					data.map((data) => {
						return renderListItem(data, path, getActiveData, setActiveModal, handleDelete, isAdmin);
					})}
			</ul>
		</div>
	);
};

export default ListData;
