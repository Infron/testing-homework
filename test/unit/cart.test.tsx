import React from 'react';

import { render } from '@testing-library/react';
import {Form} from "../../src/client/components/Form";
import {createStore} from "redux";

describe('Simple Test Case', () => {
    it('Should return 4', () => {
        const app = <div>example</div>;

        const { container } = render(app);

        console.log(container.outerHTML);

        expect(container.textContent).toBe('example');
    });
});

describe('Проверка валидации полей ввода', () => {
    beforeEach(() => {
        const initState = {
            cart: [
                { id: 1, name: "order_1", price: 100, count: 1 },
                { id: 2, name: "order_2", price: 20, count: 2 },
            ],
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);
    })

    it('Валидная строка имени должна проходить', () => {

        render(
            <Form onSubmit={() => {}}/>
        )


    });

    it('Валидная строка в имени должна отбиваться', () => {

    });

    it('Пустая строка в телефоне должна отбиваться', () => {

    });

    it('Невалидный номер телефона должен отбиваться', () => {

    });

    it('Валидный телефона должен приниматься', () => {

    });

    it('Валидная строка адреса должна проходить', () => {

    });

    it('Пустая строка адреса должна отбиваться', () => {

    });
});