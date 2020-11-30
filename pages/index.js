import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
	const [todoItem, setTodoItem] = useState('');

	const [todoList, setTodoList] = useState([]);
	const [activeList, setActiveList] = useState([]);
	const [compList, setCompList] = useState([]);

	const [listView, setListView] = useState('All');

	// False = Light, True = Dark
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
				const newActiveList = [...prevState, todo];
				return newActiveList;
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

	const changeListView = (listType) => {
		setListView(listType);
	};

	const delTodo = (todo) => {
		const newTodoList = todoList.filter((todoEl) => todoEl != todo);
		const newActiveList = newTodoList.filter((todoEl) => todoEl.done === false);

		setActiveList(newActiveList);
		setTodoList(newTodoList);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>To Do App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<div className={theme ? styles.bannerD : styles.banner}>
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
								className={theme ? styles.todoInputD : styles.todoInput}
								placeholder='Create a new todo...'
								onChange={(e) => setTodoItem(e.target.value)}
							/>
						</form>
					</div>
					<div className={theme ? styles.listContainerD : styles.listContainer}>
						{todoList.length ? (
							<>
								{listView === 'Completed' ? (
									<>
										{compList.length ? (
											compList.map((todo) => (
												<div
													style={{ padding: '20px', display: 'flex', alignItems: 'center' }}
													className={theme ? styles.todoItemD : styles.todoItem}
												>
													<div style={{ alignItems: 'center', display: 'inherit' }}>
														<div className={styles.inputCheckbox}>
															{todo.done ? (
																<div
																	className={styles.inputCheck}
																	onClick={() => changeToDo(todo, false)}
																/>
															) : (
																<div
																	className={theme ? styles.inputNoCheckD : styles.inputNoCheck}
																	onClick={() => changeToDo(todo, true)}
																/>
															)}
														</div>
														<label className={todo.done ? styles.strike : styles.noStrike}>
															{todo.name}
														</label>
													</div>

													<div></div>
												</div>
											))
										) : (
											<div style={{ padding: '20px', color: 'red' }}>
												No To Do's Completed Yet!
											</div>
										)}
									</>
								) : listView === 'Active' ? (
									<>
										{activeList.length ? (
											activeList.map((todo) => (
												<div
													style={{ padding: '20px', display: 'flex', alignItems: 'center' }}
													className={theme ? styles.todoItemD : styles.todoItem}
												>
													<div style={{ alignItems: 'center', display: 'inherit' }}>
														<div className={styles.inputCheckbox}>
															{todo.done ? (
																<div
																	className={styles.inputCheck}
																	onClick={() => changeToDo(todo, false)}
																/>
															) : (
																<div
																	className={theme ? styles.inputNoCheckD : styles.inputNoCheck}
																	onClick={() => changeToDo(todo, true)}
																/>
															)}
														</div>

														<label className={todo.done ? styles.strike : styles.noStrike}>
															{todo.name}
														</label>
													</div>

													<div className={styles.todoCross} onClick={() => delTodo(todo)} />
												</div>
											))
										) : (
											<div style={{ padding: '20px', color: 'red' }}>
												No Active To Do's!
											</div>
										)}
									</>
								) : (
									<>
										{todoList.map((todo) => (
											<div
												style={{ padding: '20px', display: 'flex', alignItems: 'center' }}
												className={theme ? styles.todoItemD : styles.todoItem}
											>
												<div style={{ alignItems: 'center', display: 'inherit' }}>
													<div className={styles.inputCheckbox}>
														{todo.done ? (
															<div
																className={styles.inputCheck}
																onClick={() => changeToDo(todo, false)}
															/>
														) : (
															<div
																className={theme ? styles.inputNoCheckD : styles.inputNoCheck}
																onClick={() => changeToDo(todo, true)}
															/>
														)}
													</div>

													<label className={todo.done ? styles.strike : styles.noStrike}>
														{todo.name}
													</label>
												</div>

												<div className={styles.todoCross} onClick={() => delTodo(todo)} />
											</div>
										))}
									</>
								)}
							</>
						) : (
							<div style={{ padding: '20px', color: 'red' }}>
								No To Do's added yet!
							</div>
						)}
						<div className={styles.bottomInfo}>
							{/* If listView === Completed {...} elseif {...} else {All} */}

							<div style={{ margin: '10px 0' }} className={styles.itemsLeft}>
								{activeList.length} items left
							</div>
							<div className={styles.listOptions}>
								<div
									className={
										listView === 'All'
											? styles.activeOption
											: theme
											? styles.listOptionD
											: styles.listOption
									}
									style={{ paddingRight: '10px' }}
									onClick={() => changeListView('All')}
								>
									All - {todoList.length}
								</div>
								<div
									className={
										listView === 'Active'
											? styles.activeOption
											: theme
											? styles.listOptionD
											: styles.listOption
									}
									style={{ paddingRight: '10px' }}
									onClick={() => changeListView('Active')}
								>
									Active - {activeList.length}
								</div>
								<div
									className={
										listView === 'Completed'
											? styles.activeOption
											: theme
											? styles.listOptionD
											: styles.listOption
									}
									onClick={() => changeListView('Completed')}
								>
									Completed - {compList.length}
								</div>
							</div>
							<div>
								<button
									className={theme ? styles.clearButtonD : styles.clearButton}
									onClick={() => clearCompList()}
								>
									Clear Completed
								</button>
							</div>
						</div>
						<div
							className={
								theme ? styles.mobileListOptionListD : styles.mobileListOptionList
							}
						>
							<div
								className={
									listView === 'All'
										? styles.activeOption
										: theme
										? styles.listOptionD
										: styles.listOption
								}
								onClick={() => changeListView('All')}
							>
								All - {todoList.length}
							</div>
							<div
								className={
									listView === 'Active'
										? styles.activeOption
										: theme
										? styles.listOptionD
										: styles.listOption
								}
								onClick={() => changeListView('Active')}
							>
								Active - {activeList.length}
							</div>
							<div
								className={
									listView === 'Completed'
										? styles.activeOption
										: theme
										? styles.listOptionD
										: styles.listOption
								}
								onClick={() => changeListView('Completed')}
							>
								Completed - {compList.length}
							</div>
						</div>
					</div>
				</div>
				<div className={theme ? styles.belowBannerD : styles.belowBanner}></div>
			</main>
		</div>
	);
}
