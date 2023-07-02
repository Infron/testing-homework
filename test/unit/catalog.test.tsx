import {ExampleApi} from "./mock";
import {CartApi} from "./mock";
import React from "react";
import {ApplicationState, initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Catalog} from "../../src/client/pages/Catalog";
import {Action, Store} from "redux";

const basename = '/';
const exampleApi = new ExampleApi(basename) as any;

describe('Проверка каталога:', () => {
    it('Должны отображаться товары, список которых приходит с сервера', async (): Promise<void> => {
        const cartApi: CartApi = new CartApi();

        const store: Store<ApplicationState, Action> = initStore(exampleApi, cartApi)

        const catalog = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );

        const productNames:HTMLCollection = catalog.container.getElementsByClassName('ProductItem-Name');
        const productPrices:HTMLCollection = catalog.container.getElementsByClassName('ProductItem-Name');

         const apiProducts = exampleApi.getProducts().data;

        for (let i = 0; i < apiProducts; i++) {
            expect(productNames[i].textContent).toEqual(apiProducts[i].name);
            expect(productPrices[i].textContent).toEqual('$' + apiProducts[i].price);
        }
    });
});
