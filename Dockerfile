# ==========================================
# Stage 1: Build the frontend assets
# ==========================================
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files (filtered by .dockerignore)
COPY . .

# Build assets with Vite
RUN npm run build

# ==========================================
# Stage 2: Production PHP runtime
# ==========================================
FROM php:8.3-fpm-alpine

# Set environment variables
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APP_ENV=production
ENV APP_DEBUG=false

# Install system dependencies and Nginx
RUN apk add --no-cache \
    nginx \
    git \
    unzip \
    curl \
    sed

# Install PHP extensions utility
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install PHP extensions required by Laravel
RUN install-php-extensions \
    bcmath \
    gd \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    pdo_sqlite \
    zip \
    opcache \
    intl \
    pcntl \
    sqlite3

# Configure Nginx
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Use the default production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Configure PHP settings for production (optional, but good practice)
RUN echo "memory_limit=256M" >> "$PHP_INI_DIR/conf.d/docker-php-ram.ini" \
    && echo "upload_max_filesize=64M" >> "$PHP_INI_DIR/conf.d/docker-php-upload.ini" \
    && echo "post_max_size=64M" >> "$PHP_INI_DIR/conf.d/docker-php-upload.ini" \
    && echo "opcache.enable_cli=1" >> "$PHP_INI_DIR/conf.d/opcache-recommended.ini"

# Copy Composer binary from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files (filtered by .dockerignore)
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy compiled frontend assets from frontend stage
COPY --from=frontend /app/public/build /var/www/html/public/build

# Create storage structure and set correct permissions
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Generate storage symlink
RUN php artisan storage:link

# Set up the entrypoint script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

# Expose port 80 (Render overrides this with $PORT anyway)
EXPOSE 80

# Execute entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
