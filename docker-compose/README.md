# docker-compose-scale-example

Example of Docker Compose scale and simple DNS-based load balancing
features. See `docker-compose.yaml` for more info.

## Services
- Nginx
- flask

## Demo

1. Run `docker-compose up -d`
2. Navigate to [localhost:8000](http://localhost:8000)
3. Refresh the page
3. Run `docker-compose up -d --scale flask=3` to scale flask app to 3 instances
4. Refresh the page