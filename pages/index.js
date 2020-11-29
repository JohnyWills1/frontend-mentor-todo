import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
	const [todoItem, setTodoItem] = useState('');

	const [todoList, setTodoList] = useState([]);
	const [activeList, setActiveList] = useState([]);
	const [compList, setCompList] = useState([]);

	const [theme, setTheme] = useState(false);

	const onSubmit = (e) => {
		// Stop the page from refreshing on enter press
		e.preventDefault();
		// Clear the current input
		e.target[0].value = '';

		const newTodoItem = {
			name: todoItem,
			done: false,
		};

		setActiveList((prevState) => {
			const newTodoList = [...prevState, newTodoItem];
			return newTodoList;
		});

		setTodoList((prevState) => {
			const newTodoList = [...prevState, newTodoItem];
			return newTodoList;
		});
	};

	const swapTheme = () => {
		setTheme(!theme);
	};

	const changeToDo = (todo, bool) => {
		const index = todoList.indexOf(todo);

		let newTodoList = todoList.slice();

		newTodoList[index].done = bool;

		if (bool === true) {
			setActiveList((prevState) => {
				const newData = prevState.filter((todoEl) => todoEl.done === false);
				return newData;
			});

			const newCompList = newTodoList.filter((todoEl) => todoEl.done === true);
			setCompList(newCompList);
		} else {
			setActiveList((prevState) => {
				const newTodoList = [...prevState, todo];
				return newTodoList;
			});
			setCompList((prevState) => {
				const newCompList = prevState.filter((todoEl) => todoEl.done === true);
				return newCompList;
			});
		}

		setTodoList(newTodoList);
	};

	const clearCompList = () => {
		setTodoList((prevState) => {
			const newTodoList = prevState.filter((todoEl) => todoEl.done === false);
			return newTodoList;
		});
		setCompList([]);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>To Do App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<div className={styles.banner}>
					<div className={styles.nameButton}>
						<div className={styles.name}>TODO</div>
						{theme ? (
							<div className={styles.lightButton} onClick={(e) => swapTheme()} />
						) : (
							<div className={styles.darkButton} onClick={(e) => swapTheme()} />
						)}
					</div>
					<div className={styles.todoForm}>
						<form onSubmit={(e) => onSubmit(e)}>
							<input
								type='text'
								className={styles.todoInput}
								placeholder='Create a new todo...'
								onChange={(e) => setTodoItem(e.target.value)}
							/>
						</form>
					</div>
					<div className={styles.listContainer}>
						{todoList.length ? (
							<>
								{todoList.map((todo) => (
									<div
										style={{ padding: '20px', display: 'flex', alignItems: 'center' }}
									>
										<div className={styles.inputCheckbox}>
											{todo.done ? (
												<div
													className={styles.inputCheck}
													onClick={() => changeToDo(todo, false)}
												/>
											) : (
												<div
													className={styles.inputNoCheck}
													onClick={() => changeToDo(todo, true)}
												/>
											)}
										</div>

										<label className={todo.done ? styles.strike : styles.noStrike}>
											{todo.name}
										</label>
									</div>
								))}
							</>
						) : (
							<div style={{ padding: '10px 20px', color: 'red' }}>
								No To Do's added yet!
							</div>
						)}
						<div className={styles.bottomInfo}>
							<div style={{ margin: '10px 0' }}>{activeList.length} items left</div>
							<div>
								All - {todoList.length} | Active - {activeList.length} | Completed -
								{compList.length}
							</div>
							<div>
								<button className={styles.clearButton} onClick={() => clearCompList()}>
									Clear Completed
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.belowBanner}></div>
			</main>
		</div>
	);
}
