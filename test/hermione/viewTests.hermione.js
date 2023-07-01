const React = require("react");

const BUG_ID = process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : "";

describe('Проверка странцы товара:', async () => {
    it('Соответствие отображения кнопки', async ({browser}) => {
        await browser.setWindowSize(1920, 1080);
        await browser.url(`http://localhost:3000/hw/store/catalog/0${BUG_ID}`);
        await browser.setTimeout({ 'script': 1000 });

        const elem = await browser.$('.ProductDetails-AddToCart');

        await elem.isDisplayed();
        await elem.assertView('button');
    });
});

describe('Проверка адаптива:', async () => {
    it('Отображается бургер меню', async ({browser}) => {
        await browser.setWindowSize(575, 1000);

        await browser.url(`http://localhost:3000/hw/store${BUG_ID}`);
        await browser.setTimeout({ 'script': 2000 });

        const burgerMenu = await browser.$('.Application-Toggler');
        const header = await browser.$('.container');

        await burgerMenu.isDisplayed();
        await header.assertView('header-adapt');
    });

    it('Бургер меню скрывается при выборе пункта', async ({browser}) => {
        await browser.setWindowSize(575, 1000);

        await browser.url(`http://localhost:3000/hw/store${BUG_ID}`);
        await browser.setTimeout({ 'script': 1000 });

        await browser.$('.Application-Toggler').click();
        await browser.$('a[href=\'/hw/store/delivery\']').click();

        await browser.assertView('delivery-berger-hidden', 'body');
    });
});