import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import User from './user';

describe('User', () => {
	let container = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	it('should render user data', async () => {
		//Arrange
		const fakeUser = {
			name: 'Bombasto',
			age: '31',
			address: 'Roc Boronat 35'
		};

        // Puede servir para testear action creators
		jest.spyOn(global, 'fetch').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeUser)
			})
		);

		//Act
		await act( async () => {
			render(<User id="13" />, container);
		});

		//Assert
		expect(container.querySelector('[data-testid=name]').textContent).toBe(fakeUser.name);
    
        
        global.fetch.mockRestore();
	});
});
