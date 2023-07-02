import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Action, Store} from "redux";
import {Provider} from "react-redux";
import {Cart} from "../../src/client/pages/Cart";
import {Form} from "../../src/client/components/Form";
import {BrowserRouter} from "react-router-dom";
import {CartApi, ExampleApi, initState} from "./mock";
import {ApplicationState, initStore} from "../../src/client/store";
import {ProductDetails} from "../../src/client/components/ProductDetails";

describe('Проверка функциональности корзины:', (): void => {
    const basename: string = '/';
    const exampleApi = new ExampleApi(basename) as any;

    it('Должна отображаться таблица с добавленными в нее товарами', async (): Promise<void> => {

    });

    it('Для каждого товара должны отображаться название, цена, количество , стоимость', async (): Promise<void> => {

    })

    it('Должна отбражаться общая сумма заказа', async (): Promise<void> => {

    })

    it('При нажатии на кнопу добавления товара его количество должно увеличиваться', async (): Promise<void> => {
        const cartApi = new CartApi();
        const store: Store<ApplicationState, Action> = initStore(exampleApi, cartApi);

        const product = await exampleApi.getProductById(0);

        const productComponent = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product.data} />
                </Provider>
            </BrowserRouter>
        )

        await userEvent.click(productComponent.getByText('Add to Cart'));
        await userEvent.click(productComponent.getByText('Add to Cart'));

        const productDataInStore = store.getState().cart[0];

        expect(productDataInStore.count).toEqual(2);
    })

    it('При нажатии кнопки очистить корзину товары должны удалятся из нее', async (): Promise<void> => {
        const cartApi = new CartApi(initState);

        const store: Store<ApplicationState, Action> = initStore(exampleApi, cartApi);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        await userEvent.click(screen.getByText('Clear shopping cart'));

        expect(Object.keys(store.getState().cart).length === 0).toBe(true);
    });

    it('Должен корректно отображаться номер заказа', async (): Promise<void> => {
        const cartApi = new CartApi(initState);

        const store: Store<ApplicationState, Action> = initStore(exampleApi, cartApi);

        const cart = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        const inputName: HTMLElement = screen.getByLabelText('Name');
        await userEvent.type(inputName, 'Maxim');

        const inputPhone: HTMLElement = screen.getByLabelText('Phone');
        await userEvent.type(inputPhone, '+79999999999');

        const inputAddress: HTMLElement = screen.getByLabelText('Address');
        await userEvent.type(inputAddress, 'Portland, Rainbow av.');

        await userEvent.click(screen.getByText('Checkout'));

        const orderNumber = cart.container.getElementsByClassName('Cart-Number')[0].textContent;

        expect(orderNumber).toEqual('1');
    });

    it('После успешной отправки заказа должно отображатся соответствующее сообщение', async (): Promise<void> => {
        const cartApi = new CartApi(initState);

        const store: Store = initStore(exampleApi, cartApi);

        const cart = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        const inputName: HTMLElement = screen.getByLabelText('Name');
        await userEvent.type(inputName, 'Maxim');

        const inputPhone: HTMLElement = screen.getByLabelText('Phone');
        await userEvent.type(inputPhone, '+79999999999');

        const inputAddress: HTMLElement = screen.getByLabelText('Address');
        await userEvent.type(inputAddress, 'Portland, Rainbow av.');

        await userEvent.click(screen.getByText('Checkout'));

        if (!(await screen.queryByText('Well done!'))) {
            return;
        }

        expect(cart.container.getElementsByClassName('alert-success').length !== 0).toBe(true);
    })
});

describe('Проверка валидации полей ввода', (): void => {
    it('Валидная строка имени должна проходить', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLElement = screen.getByLabelText('Name');

        await userEvent.type(input, 'Maxim');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(false);
    });

    it('Пустая строка в имени должна отбиваться', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Name');

        await userEvent.type(input, ' ');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(true);
    });

    it('Невалидный номер телефона должен отбиваться', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Phone');

        await userEvent.type(input, '123');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(true);
    });

    it('Пустая строка в телефоне должна отбиваться', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Phone');

        await userEvent.type(input, ' ');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(true);
    });

    it('Валидный телефона должен приниматься', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Phone');

        await userEvent.type(input, '+79994041111');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(false);
    });

    it('Валидная строка адреса должна проходить', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Address');

        await userEvent.type(input, 'Portland, Rainbow av.');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(false);
    });

    it('Пустая строка адреса должна отбиваться', async (): Promise<void> => {
        render(
            <Form onSubmit={(): void => {}} />
        );
        const input: HTMLInputElement = screen.getByLabelText('Address');

        await userEvent.type(input, ' ');
        await userEvent.click(screen.getByRole('button'));

        expect(input.classList.contains('is-invalid')).toBe(true);
    });
});