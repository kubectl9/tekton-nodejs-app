![image](https://github.com/kubectl9/tekton-nodejs-app/assets/162479110/5c4d99ca-75ea-4896-8e21-af1d4c77a390)

Install Kubernetes Dashboard:

kubectl get nodes
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/about?namespace=default

Dashboard service account:

kubectl apply -f ksrvcrole.yaml
kubectl -n kubernetes-dashboard create token admin-user


Skip Kubernetes Dasshboard login command:
kubectl patch deployment kubernetes-dashboard -n kubernetes-dashboard --type 'json' -p '[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--enable-skip-login"}]'


Install Tekton Pipeline & Dashboard:

kubectl get crd
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/latest/release-full.yaml
http://localhost:8001/api/v1/namespaces/tekton-pipelines/services/tekton-dashboard:http/proxy/#/about


Commands to run the Tekton Tasks/Pipelines:

kubectl get crd
kubectl apply -f task-ex.yaml
kubectl apply -f taskrun-ex.yaml
tkn task start example-task --showlog
kubectl logs --selector=tekton.dev/taskRun=example-task-run
kubectl apply -f task-ex-param.yaml
kubectl apply -f taskrun-ex-param.yaml
kubectl logs --selector=tekton.dev/taskRun=example-task-run-param
tkn taskrun ls


kubectl get pods

kubectl get pods --all-namespaces -o jsonpath="{.items[*].spec.containers[*].name}" | tr -s ' ' '\n' |sort |uniq -c

Workspace (PVC) Example:

kubectl apply -f task-ws.yaml
kubectl apply -f task-ws-post.yaml
kubectl apply -f pipeline-ws.yaml
kubectl apply -f pipelinerun-ws.yaml
kubectl logs --selector=tekton.dev/pipelineRun=pipeline-run
kubectl get pvc
kubectl describe pvc



Git clone, build & push the image and deploy commands:

tkn hub install task git-clone --version 0.6
tkn hub install task buildah --version 0.3
tkn hub install task kubernetes-actions --version 0.2


kubectl apply --filename docker-secret.yaml
kubectl apply --filename role.yaml
kubectl get rolebinding
kubectl apply --filename pipeline.yaml
kubectl apply --filename pipeline-run.yaml
tkn pipeline ls
tkn pipeline logs -f
kubectl logs --selector=tekton.dev/pipelineRun=nodejs-pipeline
kubectl get pods
kubectl get deployment
kubectl get service --all-namespaces



Delete Taskrun/PipelineRun:

kubectl -n default delete pipelinerun $(kubectl -n default get pipelinerun -o jsonpath='{range .items[?(@.status.conditions[*].status=="True")]}{.metadata.name}{"\n"}{end}')

kubectl -n default delete pipelinerun $(kubectl -n default get pipelinerun -o jsonpath='{range .items[?(@.status.conditions[*].status=="False")]}{.metadata.name}{"\n"}{end}')

