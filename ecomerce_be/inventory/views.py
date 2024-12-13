from rest_framework import viewsets, permissions
from .models import Product, Category, Review
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    CategorySerializer,
    ReviewSerializer
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductDetailSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        # Filtering options
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(categories__slug=category)

        return queryset


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        product_pk = self.kwargs.get('product_pk')
        return Review.objects.filter(product_id=product_pk)

    def perform_create(self, serializer):
        product_pk = self.kwargs.get('product_pk')

        # Check if the user has already reviewed this product
        existing_review = Review.objects.filter(
            user=self.request.user,
            product_id=product_pk
        ).exists()

        if existing_review:
            raise ValidationError("You have already reviewed this product.")

        product = Product.objects.get(pk=product_pk)
        serializer.save(user=self.request.user, product=product)