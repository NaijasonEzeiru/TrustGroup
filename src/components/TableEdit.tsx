import { useState } from 'react';

const TableEdit = ({ transaction }: any) => {
	const [edit, setEdit] = useState(false);

	return (
		<div>
			<tr>
				<td>
					{transaction.created_at.substring(0, 10)}
					<input type='text' />
				</td>

				<td>{transaction.currency}</td>
				<td>
					{transaction.amount?.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}
				</td>
				<td>-{transaction.currency}0.00</td>
				<td>
					{transaction.cr_or_dr == 'CR' ? (
						<p style={{ color: '#08e308' }}>
							+
							{transaction.amount?.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</p>
					) : (
						<p style={{ color: 'red' }}>
							-
							{transaction.amount?.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</p>
					)}
				</td>
				<td>{transaction.cr_or_dr}</td>
				<td>{transaction.type}</td>
				<td>Manual</td>
				<td>{transaction.condition}</td>
				<td>
					<button onClick={() => setEdit(!edit)}>Edit</button>
				</td>
			</tr>
		</div>
	);
};

export default TableEdit;
