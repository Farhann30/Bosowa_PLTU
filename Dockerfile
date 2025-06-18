# Gunakan image PHP resmi dengan ekstensi yang dibutuhkan
FROM php:8.1-apache

# Install ekstensi yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Copy source code ke dalam container
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

# Install dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Copy konfigurasi Apache
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# Set permission storage & bootstrap
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Enable mod_rewrite
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80

# Jalankan Apache di foreground
CMD ["apache2-foreground"] 