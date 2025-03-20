export const loadHomePage = () => {
	return `
       <div class="container">
			<div class="content">
				<div class="friends-list">
					<div class="friend">
						<div class="username">Jake</div>
						<div class="status"></div>
					</div>
				</div>
				<div class="add-friend">Add friend</div>
			</div>
		</div>

		<style>
			.container {
				border: 1px solid black;
				height: 100vh;
				width: 100%;
				display: grid;
				place-items: center;
			}

			.content {
				width: 500px;
				display: flex;
				flex-direction: column;
				border: 1px solid red;
				border-radius: 0.3rem;
				padding: 2px;
				gap: 1px;
			}

			.friend {
				border: 1px solid blue;
				display: flex;
				justify-content: baseline;
				align-items: center;
				gap: 1rem;
				padding: 0.5rem 0.2rem;
				cursor: pointer;
			}

			.friend:hover {
				background-color: rgb(195, 195, 195);
			}

			.add-friend {
				border: 1px solid gray;
				text-align: center;
				padding: 0.5rem 0.2rem;
				cursor: pointer;
			}

			.add-friend:hover {
				background-color: rgb(195, 195, 195);
			}

			.status {
				border: 1px solid green;
				border-radius: 50%;
				padding: 6px;
				background-color: green;
				cursor: pointer;
				margin-left: auto;
			}
		</style>
    `;
};
