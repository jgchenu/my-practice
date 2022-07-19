docker run -p 9100:9100  -v "/proc:/host/proc:ro" -v "/sys:/host/sys:ro" -v "/:/rootfs:ro" --net="host" prom/node-exporter

# node-exporter 192.168.31.27:9100
docker run -p 9100:9100  prom/node-exporter

# prom 
docker run -p 9090:9090 -v /Users/jgchen/Desktop/my-practice/prom/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
# prom
docker run -p 9090:9090 -v `pwd`/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus


# container localhost not another localhost
docker run -d -p 4000:3000 grafana/grafana


# get docker virtual ip
 docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id

 # unix mac 
 docker inspect <container id> | grep "IPAddress"

 # window 
 docker inspect <container id> | findstr "IPAddress"