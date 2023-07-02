import {CartState, CheckoutFormData, Product, ProductShortInfo} from "../../src/common/types";

export class ExampleApi {
    constructor(private readonly basename: string) {

    }

    getProducts(): Promise<{ data: ProductShortInfo[] }> {
        return Promise.resolve({
            data: [
                { id: 0, name: 'Product 0', price: 100 },
                { id: 1, name: 'Product 1', price: 200 },
                { id: 2, name: 'Product 2', price: 300 }
            ]
        });
    }

    getProductById(id: number): Promise<{ data: Product }> {
        const products: Product[] = [
            {
                id: 0,
                price: 100,
                name: "Product 0",
                color: "red",
                material: "Metal",
                description: "Some description of very fancy item",
            },
            {
                id: 1,
                price: 200,
                name: "Product 1",
                color: "green",
                material: "Plastic",
                description: "Another description of very cool item",
            },
            {
                id: 2,
                price: 300,
                name: "Product 2",
                color: "blue",
                material: "Rock",
                description: "Я очень устал помогите пожалуйста я больше так немогу",
            },
        ]

        return Promise.resolve({
            data: products[id],
        });
    }

    checkout(form: CheckoutFormData, cart: CartState): Promise<{ data: { id: number } }> {
        return Promise.resolve({
            data: {
                id: 1,
            }
        });
    }
}

export class CartApi {
    state: CartState;

    constructor(initState?: CartState) {
        this.state = initState ? initState : {};
    }

    getState(): CartState {
        return this.state;
    }

    setState(cart: CartState): void {
        this.state = { ...this.state, ...cart };
    }
}

export const initState: CartState = {
    0: {
        name: 'Product in state 0',
        price: 100,
        count: 1,
    },
    1: {
        name: 'Product in state 1',
        price: 200,
        count: 2,
    },
    2: {
        name: 'Product in state 2',
        price: 300,
        count: 3,
    }
}