import { callbackify } from "node:util";

export const natsWrapper = {
    client: {
        // the arrow function is the publish function
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: () => void) => {
                callback();
            }
        )
    }
};