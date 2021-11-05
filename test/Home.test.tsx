import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import {IAppContext, AppContext} from "../src/contexts/AppContext";
import Home from "../src/views/Home";

let initialPropsAppMock: IAppContext = {
    isMobile: false,
    hasErrors: false,
    setTitle: jest.fn(),
    title: '',
    width: 500,
    setIsLoading: jest.fn(),
    setHasErrors: jest.fn(),
    isLoading: false
};

const renderApp = () =>
    render(
        <MemoryRouter>
            <AppContext.Provider value={initialPropsAppMock}>
               <Home/>
            </AppContext.Provider>
        </MemoryRouter>
    );

test('Render cards in desktop', async () => {
    renderApp();
    expect(screen.queryByTestId('pub-shipping').textContent).toBe('Envíos');
    expect(screen.queryByTestId('pub-debt').textContent).toBe('Deuda publicada');
    expect(screen.queryByTestId('pub-card').textContent).toBe('Tarjeta de recaudación');
    expect(screen.queryByTestId('title-dashboard')).toHaveStyle('font-size: 1.5rem')
});

test('Render cards in mobile', async () => {
    initialPropsAppMock = {...initialPropsAppMock, isMobile: true};
    renderApp();
    expect(screen.queryByTestId('pub-shipping').textContent).toBe('Envíos');
    expect(screen.queryByTestId('pub-debt').textContent).toBe('Deuda publicada');
    expect(screen.queryByTestId('pub-card').textContent).toBe('Tarjeta de recaudación');
    expect(screen.queryByTestId('title-dashboard')).toHaveStyle('font-size: 1.25rem')
});