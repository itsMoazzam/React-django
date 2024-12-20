from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
    path('products/<int:product_pk>/reviews/',
         ReviewViewSet.as_view({'get': 'list', 'post': 'create'}),
         name='product-reviews-list'),
    path('products/<int:product_pk>/reviews/<int:pk>/',
         ReviewViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}),
         name='product-reviews-detail'),
]