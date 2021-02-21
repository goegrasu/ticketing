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

#### NPM Organization
Created a public organization, goegrasutickets. \
Created the organization so we can publish 
an NPM module to this organization \
before you can publish you need to create a git repo from the folder you want to publish \
npm publish --access public (so publish will be public I didn't pay any money)