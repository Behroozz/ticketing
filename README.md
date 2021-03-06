# ticketing

# Kubernetee

Delete all deployments
kubectl delete --all deploymen

# debug

k describe pod name_pod

# Create Secret

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
// secret/jwt-secret created
k get secrets

# Prepare

Command Palette via (⇧⌘P) and type shell command
Install Code command in path

code /etc/host and add 127.0.0.1 ticketing.dev

Go to https://ticketing.dev/api/users/currentuser on browser and type thisisunsafe

# Google Cloud

sign in https://cloud.google.com/free
Create Kubernetee Cluster

https://cloud.google.com/sdk/docs/quickstarts
Install google cloud SDK

gcloud auth login
gcloud init

gcloud container clusters get-credentials ticketing-dev --> New Context for Kubernetee will get generated
gcloud auth application-default login
https://console.developers.google.com/apis/api/cloudbuild.googleapis.com/overview?project=802421788103

# Skaffold

Enable Google Cloud Build
switch between local and google cloud

1.  Set the host to correct IP
2.  enable the correct skaffold
3.  update the service image name
4.  switch the docker context

# Testing

npmjs.com/package/supertest

# namespace

- k get namespace

NAME STATUS AGE
default Active 19d
ingress-nginx Active 18d
kube-node-lease Active 19d
kube-public Active 19d
kube-system Active 19d

Cross namespace communication
http://nameofservice.namespace.svc.cluster.local

http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

The above URL can be point to ExternalName for easier access

- k get service -n ingress-nginx

NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
ingress-nginx-controller LoadBalancer 10.107.41.64 localhost 80:30113/TCP,443:30029/TCP 18d
ingress-nginx-controller-admission

# Publish Package

git init -y
git add .
git commit -m "initial commit"
npm login
npm publish --access public
