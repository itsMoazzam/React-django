from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
import os


def user_profile_picture_path(instance, filename):
    # Generate a unique filename for the profile picture
    ext = filename.split('.')[-1]
    filename = f"{instance.username}_profile.{ext}"
    return os.path.join('profile_pictures', filename)


class CustomUser(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    ]

    phone_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    profile_picture = models.ImageField(
        upload_to=user_profile_picture_path,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])],
        blank=True,
        null=True
    )
    bio = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        # If no profile picture, generate an initial avatar
        if not self.profile_picture:
            # Generate avatar using first letter of name
            from PIL import Image, ImageDraw, ImageFont
            import io
            from django.core.files.uploadedfile import InMemoryUploadedFile

            # Create a blank image
            img = Image.new('RGB', (100, 100), color=(random.randint(0, 255),
                                                      random.randint(0, 255),
                                                      random.randint(0, 255)))
            d = ImageDraw.Draw(img)
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 60)

            # Draw the first letter of the username
            d.text((30, 20), self.first_name[0].upper() if self.first_name else self.username[0].upper(),
                   font=font, fill=(255, 255, 255))

            # Save the image to a bytes buffer
            buffer = io.BytesIO()
            img.save(buffer, format='PNG')
            buffer.seek(0)

            # Create an InMemoryUploadedFile
            self.profile_picture = InMemoryUploadedFile(
                buffer, None, f'{self.username}_avatar.png', 'image/png',
                buffer.getbuffer().nbytes, None
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


def product_image_path(instance, filename):
    # Generate a unique filename for product images
    ext = filename.split('.')[-1]
    return os.path.join('products', f"{instance.slug}", filename)


class Product(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)

    # Other fields as discussed earlier
    main_image = models.ImageField(upload_to='products/', null=True, blank=True)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    categories = models.ManyToManyField('Category', related_name='products', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Automatically generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)

        # Ensure unique slug
        original_slug = self.slug
        counter = 1
        while Product.objects.filter(slug=self.slug).exists():
            self.slug = f"{original_slug}-{counter}"
            counter += 1

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    image = models.ImageField(
        upload_to=product_image_path,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])]
    )
    alt_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Image for product"


class Review(models.Model):
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'product']  # Prevent multiple reviews by same user

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.title}"

