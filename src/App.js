import React, { useState, useRef } from 'react';
import css from './App.module.scss';
import Checkbox from './components/Checkbox';
import { post } from './helpers'

const App = () => {

	const resultRef = useRef(null);

	const [ formData, setFormData ] = useState({ numberOfTimes: 999, changeDoor: false });
	const [ result, setResult ] = useState(null);

	const _submitHandler = (e) => {
		e.preventDefault();
		post('/play', formData).then(x => { 
			setResult(x);
			window.scrollTo(0, resultRef.current.offsetTop);
		}).catch(err => {
			//TODO: Handle error in some fancy manner 
		});
	}
	const _numberOfTimesChangeHandler = (e) => {
		setFormData(
			{...formData, numberOfTimes: parseInt(e.target.value) }
		);
	};
	const _changeDoorChangeHandler = (e) => {
		setFormData(
			{...formData, changeDoor: e.target.checked }
		);
	};
	const _buttonClearClickHandler = () => {
		setResult(null);
	}

	return (
		<div className={css.app}>
			<div className={css.page}>
				<div className={css.shadowWrapper}>
					<form onSubmit={_submitHandler}>

						<section className={css.box1}>
							<div className={css.inputWrapper}>
								<label>How many iterations?</label>
								<input value={formData.numberOfTimes} min={0} max={999} name="numberOfTimes" type="number" onChange={_numberOfTimesChangeHandler} />
							</div>
						</section>

						<section className={css.box2}>
							<Checkbox name="changeDoor" text="Change the door?" onChange={_changeDoorChangeHandler} />	
						</section>

						<button className={css.buttonSubmit}>play</button>

					</form>
				</div>
			</div>

			{ result !== null && 
				<div className={css.page} ref={resultRef}>
					<div className={css.shadowWrapper}>

						<section className={css.box3}>
							<h1>The results are in!</h1>

							<dl>
								<dt>Iterations</dt>
								<dd>{result.numberOfTimes}</dd>

								<dt>Changed door</dt>
								<dd>{result.changeDoor ? 'yes' : 'no'}</dd>

								<dt>Wins <i>(if you consider getting the car is a win)</i></dt>
								<dd>{result.wins}</dd>

								<dt>Losses</dt>
								<dd>{result.losses}</dd>
							</dl>
						</section>

						<button className={css.buttonClear} onClick={_buttonClearClickHandler}>clear the results</button>

					</div>
				</div>
			}
		</div>
	);
}

export default App;
