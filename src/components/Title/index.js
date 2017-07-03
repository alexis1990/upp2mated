import React, { PureComponent } from 'react';
import { PageHeader } from 'react-bootstrap';
import './styles/title.css';

class Title extends PureComponent {
	render(){
		return(
			<div className="title">
				<PageHeader pullLeft>
					Nouvelle consultation RFI 
					<p>
						<small><a href="#">Changer en RFQ ?</a></small>
					</p>
				</PageHeader>
			</div>
		);
	}
}

export default Title;