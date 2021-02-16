import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    
    return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
}

LandingPage.getInitialProps = async (context) => {

    const { data } = await buildClient(context).get('/api/users/currentuser');

    return data;

    // if (typeof window === 'undefined') {
    //     // we are on the server, window exists only on the browser

    //     const { data } = await axios.get(
    //         //'http://SERVICENAME.NAMESPACE.svc.cluster.local kubectl get namespace'
    //         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
    //             // because the ingress-srv.yaml is set only for the ticketing.dev domain
    //             /*headers: {
    //                 Host: 'ticketing.dev'
    //             }*/
    //             // when the request is sent from the browser we will also send the cookie via the next js request when SSR is done
    //             headers: req.headers
    //         }
    //     );

    //     return data;
    // } else {
    //     // we are on the browser
    //     const { data } = await axios.get('/api/users/currentuser');        
        
    //     return data;
    // }

    // return {};
}

export default LandingPage;