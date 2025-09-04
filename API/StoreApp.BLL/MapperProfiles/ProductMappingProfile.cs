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
                    src.ProductImages != null && src.ProductImages.ImagesUrls.Any()
                        ? src.ProductImages.ImagesUrls : new List<string>()));

        CreateMap<ProductEntity, ProductModel>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.MainImageUrl))
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.AverageRating));

        CreateMap<CreateProduct, ProductEntity>();
        CreateMap<UpdateProduct, ProductEntity>();

        CreateMap<ProductEntity, FullProductModel>()
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.MainImageUrl))
            .ForMember(p => p.Details, opt => opt.MapFrom(src => src.ProductDetails))
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.AverageRating));

        CreateMap<UpdateCartItem, CartItemEntity>();
        CreateMap<CartItemEntity, CartItemModel>()
            .ForMember(dest => dest.ProductModel, opt => opt.MapFrom(src => src.ProductDetail.Product));
        
        CreateMap<ProductFilter, DAL.Filtering.ProductFilter>();
    }
}
