# ticketing
a ticketing system similar to stubhub but not will all that functionalities

## Used technologies
- nodejs
- express
- typescript
- docker
- kubernets
- skaffold
- ingress-nginx

### Initialize npm
npm init -y
### Initialize typescript
tsc --init 

#### Do not forget
Install ingress-nginx before running skaffold dev --trigger polling

#### Kubectl secrets
kubectl create secret generic "jwt-secret" --from-literal=jwt=asdf \
kubectl get secrets (to get the secrets stored in kubectl)