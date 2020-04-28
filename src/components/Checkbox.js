import React from 'react';
import PropTypes from 'prop-types';
import css from './Checkbox.module.scss';

const Checkbox = ({text, name, ...props}) => {
	return (
        <label className={css.checkbox}>
            <input type="checkbox" name={name} {...props} />
            <span className={css.check}></span>
            <span className={css.text}>{text}</span>
        </label>
	);
}

Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Checkbox;
