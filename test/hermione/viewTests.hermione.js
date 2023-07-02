const React = require("react");

const BUG_ID = process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : "";

describe('Проверка отображения каталога', async ()=> {
    it('Должны корректно отображаться карточки товаров', async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);

        await browser.assertView('product-grid', 'body', {
            ignoreElements: [
                '.ProductItem-Name',
                '.ProductItem-Price'
            ],
        });
    });

    it('Карточка товара должна содержать имя товара', async ({ browser } ) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);

        const name = await browser.$('.ProductItem-Name');

        await expect(name).toHaveTextContaining(/\w/);
    });

    it('Карточка товара должна содержать цену', async ({ browser } ) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);

        const name = await browser.$('.ProductItem-Price');

        await expect(name).toHaveTextContaining(/\w/);
    });
});

describe('Проверка странцы товара:', async () => {
    it('Данные на странице товара должны соответствовать данным в карточке', async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);

        const itemCard = await browser.$('div[data-testid=\'1\']').$('.ProductItem');

        const name = await itemCard.$('.card-body').$('.ProductItem-Name').getText();
        const price = await itemCard.$('.card-body').$('.ProductItem-Price').getText();

        if (!name || !price) {
            return;
        }

        await browser.url(`http://localhost:3000/hw/store/catalog/1${BUG_ID}`);

        await expect(await browser.$('.ProductDetails-Name')).toExist();
        await expect(await browser.$('.ProductDetails-Price')).toExist();
        await expect(await browser.$('.ProductDetails-Name')).toHaveText(name);
        await expect(await browser.$('.ProductDetails-Price')).toHaveText(price);
    });

    it('Соответствие отображения кнопки', async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog/0${BUG_ID}`);

        const elem = await browser.$('.ProductDetails-AddToCart');

        await elem.isDisplayed();
        await elem.assertView('button');
    });
});

describe('Проверка корзины:', async () => {
    it('Должно сохранятся состояние корзины при перезагрузке', async ({ browser }) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog/0${BUG_ID}`);
        await browser.$('button=Add to Cart').click();

        await browser.url(`http://localhost:3000/hw/store/cart${BUG_ID}`);
        await browser.refresh();

        await browser.assertView('cart-with-item', 'body', {
            ignoreElements: [
                'table',
            ],
        });
    });
});

describe('Проверка адаптива:', async () => {
    it('Отображается бургер меню', async ({ browser }) => {
        await browser.setWindowSize(575, 1000);
        await browser.url(`http://localhost:3000/hw/store${BUG_ID}`);

        const burgerMenu = await browser.$('.Application-Toggler');
        const header = await browser.$('.container');

        await expect(burgerMenu).toBeDisplayed();
        await header.assertView('header-adapt');
    });

    it('Бургер меню скрывается при выборе пункта', async ({ browser }) => {
        await browser.setWindowSize(575, 1000);
        await browser.url(`http://localhost:3000/hw/store${BUG_ID}`);

        await browser.$('.Application-Toggler').click();
        await browser.$('a[href=\'/hw/store/delivery\']').click();

        await browser.assertView('delivery-berger-hidden', 'body');
    });
});
