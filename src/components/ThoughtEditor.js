import React, { Component } from 'react'
import axios from 'axios'

export default class ThoughtEditor extends Component {
	constructor(props) {
		super(props)

		this.state = {

		}
		this.colors = ['black', 'yellow', 'red', 'purple']
		this.colors2 = ['lightblue', 'teal', 'tan', 'gray']
	}

	stopPropagation = (e) => {
		this.props.stopPropagation(e)
	}

	deleteThought = () => {
		axios.delete(`/api/deletethought/${this.props.match.params.id}`)
		//todo: set up deleting thought from home view
		this.props.history.push('/home')
	}

	render() {
		const {isBelief, toggleBelief, toggleQuestion, changeColor, quote, toggleQuote, is_private, togglePrivate, categoryInput, inputCategory, submitCategory, categories, deleteCategory} = this.props 
		let mappedColors = this.colors.map((color, i) =>
			<div className='selectColor' style={{ background: color }} onClick={() => changeColor(color)} key={i}></div>
		)
		let mappedColors2 = this.colors2.map((color, i) =>
			<div className='selectColor' style={{ background: color }} onClick={() => changeColor(color)} key={i}></div>
		)
		let mappedCategories = categories.map((category, i) => 
			<div className='row' key={i}>
				<span>{category.category}</span>
				<span onClick={() => deleteCategory(category.category)}>X</span>
			</div>
		)
		return (
			<div className='ThoughtEditor column align' onClick={this.stopPropagation}>
				<div className='row'>
					<button className={isBelief ? 'thoughtTypeSelected' : ''} onClick={toggleBelief}>Belief</button>
					<button className={isBelief === false ? 'thoughtTypeSelected' : ''} onClick={toggleQuestion}>Question</button>
				</div>
				<h2>Color</h2>
				<div className='row'>
					{mappedColors}
				</div>
				<div className='row'>
					{mappedColors2}
				</div>
				<br/><br/>
				<button onClick={toggleQuote} className={quote ? 'privateButton' : 'notPrivateButton'}>{quote ? 'Is Quote' : 'Not Quote'}</button>
				<br/><br/>
				<button onClick={togglePrivate} className={is_private ? 'privateButton' : 'notPrivateButton'}>{is_private ? 'Private' : 'Public'}</button>
				<br/><br/>
				<input value={categoryInput} onChange={inputCategory} onKeyDown={submitCategory}/>
				{mappedCategories}
				{
					this.props.match.params.id !== 'new'
						?
						<button onClick={this.deleteThought}>Delete</button>
						:
						null
				}
			</div>
		)
	}
}