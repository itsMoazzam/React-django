from rest_framework import serializers
from .models import Product, Category, Review, ProductImage, CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_picture']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at']


class ProductListSerializer(serializers.ModelSerializer):
    """
    Serializer for product listings (main page, search, category pages)
    """
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'main_image', 'price',
            'discounted_price', 'categories'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for full product details
    """
    categories = CategorySerializer(many=True, read_only=True)
    additional_images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'description', 'features',
            'main_image', 'additional_images', 'price', 'discounted_price',
            'categories', 'reviews', 'average_rating'
        ]

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / reviews.count()
        return 0