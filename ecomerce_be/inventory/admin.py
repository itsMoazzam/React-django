from django.contrib import admin
from .models import Product, Category, Review, ProductImage, CustomUser

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'get_quantity', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('categories', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

    def get_quantity(self, obj):
        return obj.quantity if hasattr(obj, 'quantity') else 'N/A'
    get_quantity.short_description = 'Quantity'

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'alt_text')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    search_fields = ('username', 'email', 'first_name', 'last_name')