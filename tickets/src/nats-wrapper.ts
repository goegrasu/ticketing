import nats, { Stan } from 'node-nats-streaming';

// typescript implementation of a singleton
class NatsWrapper {
    // tells typescript that _client property may be undefined for a period of time
    private _client?: Stan;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string): Promise<void> {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {

            this.client.on('connect', () => {
                console.log('Connected to Nats');
                resolve();
            });

            this.client.on('error', (err: any) => {
                console.log('Failed to connect');
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();