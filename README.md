# kubernetes-demo

## basic information
```
kubectl get nodes
kubectl get pods
kubectl get services

kubectl get --all-namespaces all
```

## running a basic pod

```
watch -n1 kubectl get pod

kubectl create -f pod.yaml
kubectl get pods
kubectl describe pod app
kubectl logs -f app
kubectl delete -f pod.yaml
```

## rolling-updates with deployments

```
kubectl proxy
watch -n0.5 curl --silent -i http://localhost:8001/api/v1/namespaces/default/services/app:8080/proxy/

kubectl apply -f service.yaml
kubectl apply -f deployment.yaml

kubectl scale deployment app --replicas=10
kubectl scale deployment app --replicas=4

# update version in deployment.yaml to 2.0
kubectl apply -f deployment.yaml

kubectl delete -f deployment.yaml
kubectl delete -f service.yaml
```
