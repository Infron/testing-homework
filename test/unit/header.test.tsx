import {render, screen} from "@testing-library/react";
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";

const basename = '/hw/store';
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

describe('Проверка хедера:', (): void => {
    it('В хедере должны содержаться ссылки на страницы', async ():Promise<void> => {
        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.getByText('Catalog').getAttribute('href')).toEqual('/hw/store/catalog');
        expect(screen.getByText('Delivery').getAttribute('href')).toEqual('/hw/store/delivery');
        expect(screen.getByText('Contacts').getAttribute('href')).toEqual('/hw/store/contacts');
        expect(screen.getByText('Cart').getAttribute('href')).toEqual('/hw/store/cart');
    });

    it('Название магазина в шапке должно быть ссылкой на главную страницу', async ():Promise<void> => {
        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.getByText('Example store').getAttribute('href')).toEqual('/hw/store/');
    });
})