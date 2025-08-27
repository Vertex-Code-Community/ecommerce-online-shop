using AutoMapper;
using StoreApp.DAL.Entities;
using StoreApp.Models;

namespace StoreApp.BLL.MapperProfiles;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<ProductDetailEntity, ProductDetailModel>()
            .ForMember(dest => dest.ImageUrls,
                opt => opt.MapFrom(src => 
                    src.ProductImages != null || !src.ProductImages.ImagesUrls.Any()
                        ? new List<string>() : src.ProductImages.ImagesUrls));
        
        CreateMap<ProductEntity, ProductModel>();
        CreateMap<CreateProduct, ProductEntity>();
        CreateMap<UpdateProduct, ProductEntity>();

        CreateMap<ProductEntity, FullProductModel>()
            .ForMember(p => p.Details, opt => opt.MapFrom(src => src.ProductDetails))
            .ForMember(p => p.Rating, opt => opt.MapFrom(src => src.Reviews.Any() ? src.Reviews.Average(r => r.Rating) : 0));

        CreateMap<UpdateCartItem, CartItemEntity>();
        CreateMap<CartItemEntity, CartItemModel>()
            .ForMember(dest => dest.ProductModel, opt => opt.MapFrom(src => src.ProductDetail.Product));
        
        CreateMap<ProductFilter, DAL.Filtering.ProductFilter>();
    }
}
