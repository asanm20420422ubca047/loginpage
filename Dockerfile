# Lightweight web server image
FROM nginx:alpine

# Remove the default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy our static login page into nginx's web root
COPY index.html style.css script.js /usr/share/nginx/html/

# nginx listens on port 80 inside the container
EXPOSE 80

# Lets Docker / Jenkins know if the container is healthy
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

# nginx:alpine already starts nginx, but we keep it explicit
CMD ["nginx", "-g", "daemon off;"]
