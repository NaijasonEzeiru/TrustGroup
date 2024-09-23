import React from 'react';
import styles from '@/styles/Dashboard.module.css';

const Modal = ({ children, openModal }: any) => {
	if (!openModal) {
		return null;
	}
	return (
		<div>
			{' '}
			<div className={styles.overlay}></div>
			{children}
		</div>
	);
};

export default Modal;
