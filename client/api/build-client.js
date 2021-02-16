import axios from 'axios';

const buildClient = ({ req }) => {

    if (typeof window === 'undefined') {
        // we are on the server


        return axios.create({
            //'http://SERVICENAME.NAMESPACE.svc.cluster.local kubectl get namespace'
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            //             // because the ingress-srv.yaml is set only for the ticketing.dev domain
            //             /*headers: {
            //                 Host: 'ticketing.dev'
            //             }*/
            //             // when the request is sent from the browser we will also send the cookie via the next js request when SSR is done
            headers: req.headers
        });
    } else {

        return axios.create({
            baseURL: '/'
        });
    }

};

export default buildClient;